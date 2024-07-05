import { vi, Mock } from 'vitest'

import { mockStore } from '../../../test-utils/store.utils.ts'
import { ASSISTANT_ERRORS_TYPES, ASSISTANT_HISTORY_INITIAL_HISTORY, ASSISTANT_UNRECOVERABLE_ERRORS, HistoryItem, Reference, assistantCompletions, assistantSelectors, resetChatHistory } from '../../assistant'
import axios from '../../../lib/axios'
import { RootState } from '../../../redux-store.ts'

vi.mock('../../../lib/axios')

const mockChatCompletionResponse = ({ message, references }: { message: string, references: Reference[] }) => {
    return (axios.post as Mock).mockImplementationOnce(() => new Promise((resolve) =>
        resolve({
            data: {
                message,
                references,
            },
        }),
    ))
}

const mockChatCompletionErrorResponse = ({ message, status }: { message: string, status: number }) => {
    return (axios.post as Mock).mockImplementationOnce(() => new Promise((resolve, reject) =>
        reject({
            response: {
                status,
                data: {
                    message: message,
                },
            },
        }),
    ))
}

describe('Assistant Slice', () => {
    let store: any
    beforeEach(() => {
        vi.clearAllMocks()
        store = mockStore()
    })

    test('should dispatch assistantCompletions action and update state correctly', async () => {
        mockChatCompletionResponse(
            {
                message: 'hello',
                references: [
                    {
                        url: 'https://docs.mia-platform.eu/',
                        content: 'Create an Item',
                    },
                ],
            },
        )

        const userInput = 'hello'
        await store.dispatch(assistantCompletions(userInput))

        const state = store.getState()
        const chatHistory = assistantSelectors.selectChatHistory(state)
        const isLoading = assistantSelectors.selectIsLoading(state)
        const isInErrorState = assistantSelectors.selectIsInErrorState(state)

        expect(axios.post).toHaveBeenCalledWith('/api/chat/completions', {
            chat_query: 'hello',
            chat_history: [],
        })

        expect(chatHistory).toEqual(
            [
                ...ASSISTANT_HISTORY_INITIAL_HISTORY,
                { type: 'user', content: 'hello', references: undefined },
                {
                    type: 'assistant',
                    content: 'hello',
                    references: [
                        {
                            url: 'https://docs.mia-platform.eu/',
                            content: 'Create an Item',
                        },
                    ],
                },
            ],
        )
        expect(isLoading).toBe(false)
        expect(isInErrorState).toBe(false)
    })

    test('should set isInErrorState to true when assistantCompletions action is rejected', async () => {
        mockChatCompletionErrorResponse({ message: 'error', status: 500 })

        // Dispatch the action
        const userInput = 'hello'
        await store.dispatch(assistantCompletions(userInput))

        const state = store.getState()
        const isInErrorState = assistantSelectors.selectIsInErrorState(state)

        expect(isInErrorState).toBe(true)
    })

    test('should reset chat history', async () => {
        mockChatCompletionResponse(
            {
                message: 'hello',
                references: [],
            },
        )

        const userInput = 'hello'
        await store.dispatch(assistantCompletions(userInput))

        const state = store.getState()
        const chatHistory = assistantSelectors.selectChatHistory(state)
        store.dispatch(resetChatHistory())
        const chatHistoryAfterReset = assistantSelectors.selectChatHistory(store.getState())

        expect(chatHistory).toEqual(
            [
                ...ASSISTANT_HISTORY_INITIAL_HISTORY,
                { type: 'user', content: 'hello', references: undefined },
                { type: 'assistant', content: 'hello', references: [] },
            ],
        )
        expect(chatHistoryAfterReset).toEqual(ASSISTANT_HISTORY_INITIAL_HISTORY)
    })

    test('should set error code to RECOVERABLE when assistantCompletions action is rejected with a recoverable error status code', async () => {
        mockChatCompletionErrorResponse({ message: 'error', status: 500 })

        const userInput = 'hello'
        await store.dispatch(assistantCompletions(userInput))

        const state = store.getState()
        const lastUserMessage = assistantSelectors.selectLastUserMessage(state)
        const errorCode = lastUserMessage?.error

        expect(errorCode).toEqual(ASSISTANT_ERRORS_TYPES.RECOVERABLE)
    })

    test('should set error code to UNRECOVERABLE when assistantCompletions action is rejected with an unrecoverable error status code', async () => {
        mockChatCompletionErrorResponse({ message: 'error', status: ASSISTANT_UNRECOVERABLE_ERRORS[0] })

        const userInput = 'hello'
        await store.dispatch(assistantCompletions(userInput))

        const state = store.getState()
        const lastUserMessage = assistantSelectors.selectLastUserMessage(state)
        const errorCode = lastUserMessage?.error

        expect(errorCode).toEqual(ASSISTANT_ERRORS_TYPES.UNRECOVERABLE)
    })

    test('should not send messages in error state in the chat history', async () => {
        const mockChatHistory: HistoryItem[] = [
            { type: 'user', content: '1' },
            { type: 'assistant', content: '2' },
            { type: 'user', content: '3' },
            { type: 'user', content: '4', error: ASSISTANT_ERRORS_TYPES.RECOVERABLE }, // <-- this message should not be sent
            { type: 'assistant', content: '5' },
        ]

        const mockState: RootState = {
            assistantReducer: {
                chatHistory: mockChatHistory,
                isInErrorState: false,
                isLoading: false
            }
        }
        const store = mockStore(mockState)
        const messageContent = '6'
        const scope = mockChatCompletionResponse({ message: '7', references: [] })

        await store.dispatch(assistantCompletions(messageContent))

        const sentHistory = scope.mock.calls[0][1].chat_history

        const expectedHistory = mockChatHistory
            .filter(chat => !chat.error)
            .map(chat => chat.content)

        expect(sentHistory).toEqual(expectedHistory)
    })
})
