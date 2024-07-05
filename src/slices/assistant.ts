import {Action, PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

import axios from '../lib/axios'
import {RootState} from '../redux-store'

const USER = 'user'
export const ASSISTANT = 'assistant'
export const CHAT_COMPLETIONS_URL = '/api/chat/completions'

export const ASSISTANT_HISTORY_INITIAL_HISTORY = [] as HistoryItem[]

export const ASSISTANT_UNRECOVERABLE_ERRORS = [422, 413]

export const ASSISTANT_ERRORS_TYPES = {
  RECOVERABLE: 'RECOVERABLE',
  UNRECOVERABLE: 'UNRECOVERABLE'
}

export type Reference = {
  content: string
  url: string
}

export type HistoryItem = {
  type: 'assistant' | 'user'
  content: string
  references?: Reference[]
  error?: string | null
}

type ChatCompletionPayload = {
  chat_query: string,
  chat_history: string[]
}

type ChatCompletionsActionPayload = {
  message: string
  references: Reference[]
}

type ChatCompletionsRejectedPayload = {
  status: number
}

export type AssistantState = {
    chatHistory: HistoryItem[]
    isLoading: boolean
    isInErrorState: boolean
}

const isErrorRecoverable = (errorCode: number) : boolean => !ASSISTANT_UNRECOVERABLE_ERRORS.includes(errorCode)

export const assistantInitialState : AssistantState = {
  chatHistory: ASSISTANT_HISTORY_INITIAL_HISTORY,
  isLoading: false,
  isInErrorState: false
}

const createChatCompletionPayload = (message: string, history: HistoryItem[]) : ChatCompletionPayload => {
  const chatHistory = history.map(chat => chat.content)

  return {
    chat_query: message,
    chat_history: chatHistory
  }
}

const assistantCompletionCallbackFactory =
  (retry = false) =>
    async (message: string, {getState, rejectWithValue} : {getState: any, rejectWithValue: any}) => {
      try {
        const state = getState()
        const history = [...assistantSelectors.selectChatHistory(state)]
        if (retry) {
          message = history.pop()?.content || ''
        }
        const historyWithoutErrors = history.filter(message => !message.error)
        // drop last message from the history because it's the user message
        historyWithoutErrors.pop()
        // create the payload
        const payload = createChatCompletionPayload(message, historyWithoutErrors)
        const response = await axios.post(CHAT_COMPLETIONS_URL, payload)
        return response.data
      } catch (err) {
        const e = err as AxiosError
        return rejectWithValue({
          status: e.response?.status,
          message: e.response?.data
        })
      }
    }

export const ASSISTANT_COMPLETIONS = 'ASSISTANT_COMPLETIONS'
export const assistantCompletions = createAsyncThunk(
  ASSISTANT_COMPLETIONS,
  assistantCompletionCallbackFactory()
)

export const ASSISTANT_COMPLETIONS_RETRY = 'ASSISTANT_COMPLETIONS_RETRY'
export const assistantCompletionsRetry = createAsyncThunk(
  ASSISTANT_COMPLETIONS_RETRY,
  assistantCompletionCallbackFactory(true)
)

function isRejectChatCompletionsAction (action: Action) : boolean {
  return [
    assistantCompletions.rejected.type,
    assistantCompletionsRetry.rejected.type
  ].includes(action.type)
}

function isResolvedChatCompletionsAction (action: Action) : boolean {
  return [
    assistantCompletions.fulfilled.type,
    assistantCompletionsRetry.fulfilled.type
  ].includes(action.type)
}

const assistantSlice = createSlice({
  name: 'assistantReducer',
  initialState: assistantInitialState,
  reducers: {
    resetChatHistory: state => {
      state.chatHistory = ASSISTANT_HISTORY_INITIAL_HISTORY
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        assistantCompletions.pending,
        (state, {meta}) => {
          state.isLoading = true
          const parsedMessage = meta.arg.replace(/\n/g, '\n\n')
          state.chatHistory.push({type: USER, content: parsedMessage})
        })
      .addCase(
        assistantCompletionsRetry.pending,
        (state) => {
          const lastUserMessage = getLastUserMessage(state)
          // we set the error to null to retry the message
          if (lastUserMessage) {
            lastUserMessage.error = null
          }
          state.isLoading = true
        }
      )
      .addMatcher(
        isResolvedChatCompletionsAction,
        (state, action: PayloadAction<ChatCompletionsActionPayload>) => {
          const {payload} = action
          state.chatHistory.push({
            type: ASSISTANT,
            content: payload.message,
            references: payload.references
          })
          state.isLoading = false
        }
      )
      .addMatcher(
        isRejectChatCompletionsAction,
        (state, action: PayloadAction<ChatCompletionsRejectedPayload>) => {
          const {payload} = action
          const errorType = isErrorRecoverable(payload.status) ?
            ASSISTANT_ERRORS_TYPES.RECOVERABLE :
            ASSISTANT_ERRORS_TYPES.UNRECOVERABLE

          state.isInErrorState = true
          // set error on last user message
          const lastUserMessage = getLastUserMessage(state)
          if (lastUserMessage) {
            lastUserMessage.error = errorType
          }

          state.isLoading = false
        }
      )
  }
})

const getLastUserMessage = (state: AssistantState) : HistoryItem | undefined => {
  const chatHistory = state.chatHistory
  const lastUserMessage = chatHistory
    .filter(message => message.type === USER)
    .pop()
  return lastUserMessage
}

const selectIsInErrorState = (state: RootState) : boolean => {
  // if last message is in error state, then the chat is in error state
  const lastUserMessage = getLastUserMessage(state.assistantReducer)
  return Boolean(lastUserMessage?.error)
}

const selectErrorType = (state: RootState) : string | undefined | null => {
  const sliceState = state.assistantReducer
  const lastUserMessage = getLastUserMessage(sliceState)
  return lastUserMessage?.error
}

export const assistantSelectors = {
  selectChatHistory: (state: RootState) => state.assistantReducer.chatHistory,
  selectIsInErrorState,
  selectErrorType,
  selectIsLoading: (state: RootState) => state.assistantReducer.isLoading,
  selectLastUserMessage: (state: RootState) => getLastUserMessage(state.assistantReducer)
}

export function isUserMessage (message: HistoryItem) : boolean {
  return message.type === USER
}

export const {
  resetChatHistory
} = assistantSlice.actions

export default assistantSlice.reducer
