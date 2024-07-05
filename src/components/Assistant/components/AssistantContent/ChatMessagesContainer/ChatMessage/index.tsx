import {ReactNode} from 'react'
import ReactMarkdown from 'react-markdown'
import {Alert} from 'antd-5'

import {CopyButton} from './messageActions/CopyButton'
import {HistoryItem} from '../../../../../../slices/assistant'

import './index.css'

export const DATA_TEST_ID_CHAT_MESSAGE = 'assistant-chat-message'

export function ChatMessage ({
  author,
  avatar,
  message,
  isLastMessage
} : {
  author: string
  avatar: ReactNode
  message: HistoryItem
  isLastMessage: boolean
}) : ReactNode {
  const {type} = message

  return (
    <div
      className='chat-message-wrapper'
      data-testid={DATA_TEST_ID_CHAT_MESSAGE}
    >
      <div className={`chat-message-container${type === 'user' ? ' chat-message-container--user' : ''}`}>
        <div className='chat-message-avatar-container'>
          {avatar}
        </div>
        <div className={`chat-message-body${type === 'user' ? ' chat-message-body--user' : ''}`}>
          <div className='chat-message-author'>
            {author}
          </div>
          <div className={`chat-message-content${type === 'user' ? ' chat-message-content--user' : ''}`}>
            <div className={`chat-message-text${message.error ? ' chat-message-text--error' : ''}`}>
              {!isLastMessage && message.error ?
                <Alert
                  message={
                    <ReactMarkdown skipHtml>
                      {message.content}
                    </ReactMarkdown> }
                  showIcon
                  type="error"
                /> :
                <>
                  {message.content ?
                    <ReactMarkdown skipHtml>
                      {message.content}
                    </ReactMarkdown> :
                    null
                  }
                </>
              }
            </div>
            {type === 'assistant' && <CopyButton textContent={message.content} />}
          </div>
        </div>
      </div>
    </div>
  )
}
