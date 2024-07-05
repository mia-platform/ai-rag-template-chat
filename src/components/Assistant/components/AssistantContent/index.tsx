import {ReactNode} from 'react'
import {isEqual} from 'lodash'

import {AssistantRobotContainer} from './AssistantRobotContainer'
import {useAppDispatch, useAppSelector} from '../../../../redux-hooks'
import {ASSISTANT_ERRORS_TYPES, assistantCompletionsRetry, assistantSelectors} from '../../../../slices/assistant'
import {ChatMessagesContainer} from './ChatMessagesContainer'
import {ChatError} from './ChatError'
import {ChatLoader} from './ChatLoader'

import './index.css'

export function AssistantContent () : ReactNode {
  const dispatch = useAppDispatch()
  const chatHistory = useAppSelector(assistantSelectors.selectChatHistory, isEqual)
  const isInErrorState = useAppSelector(assistantSelectors.selectIsInErrorState)
  const isLoading = useAppSelector(assistantSelectors.selectIsLoading)
  const errorCode = useAppSelector(assistantSelectors.selectErrorType)

  return (
    <>
      {chatHistory.length === 0 ?
        <AssistantRobotContainer /> :
        <div className='assistant-content-wrapper'>
          {
            chatHistory && chatHistory.length > 0 &&
              <ChatMessagesContainer
                chatHistory={chatHistory}
              />
          }
          {
            isInErrorState &&
          <ChatError
            canTryAgain={errorCode === ASSISTANT_ERRORS_TYPES.RECOVERABLE}
            onRetry={() => dispatch(assistantCompletionsRetry(chatHistory[chatHistory.length - 1].content))}
          />
          }
          {isLoading && <ChatLoader />}
        </div>
      }

    </>
  )
}
