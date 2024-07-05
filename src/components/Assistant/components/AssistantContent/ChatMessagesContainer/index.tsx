import {Avatar} from 'antd-5'
import {ReactNode, useEffect, useMemo, useRef} from 'react'
import {UserOutlined} from '@ant-design/icons'

import {ReactComponent as AssistantAvatarSvg} from '../../../../../assets/assistant-avatar.svg'
import {ChatMessage} from './ChatMessage'
import {HistoryItem, isUserMessage} from '../../../../../slices/assistant'
import './index.css'

export function ChatMessagesContainer ({
  chatHistory
} : {
  chatHistory: HistoryItem[]
}) : ReactNode {
  const lastMessageRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (lastMessageRef.current) {
      setTimeout(function () {
        lastMessageRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 0)
    }
  }, [chatHistory, lastMessageRef])

  const userAvatar = useMemo(() => (
    <Avatar
      className='chat-message-user-avatar'
      icon={<UserOutlined />}
      shape={'circle'}
      size={30}
    />
  ), [])

  const assistantAvatar = useMemo(() => (
    <Avatar
      className='chat-message-assistant-avatar'
      icon={<AssistantAvatarSvg data-testid='assistant-avatar-svg' />}
      shape={'circle'}
      size={30}
    />
  ), [])

  const LastMessageRefComponent = useMemo(() => (
    <div ref={lastMessageRef} />
  ), [lastMessageRef])

  return (
    chatHistory?.map((message, index) => {
      const isLastMessage = index === chatHistory.length - 1
      const commonProps = {
        isLastMessage,
        key: index,
        message
      }

      return (
        <>
          {
            isUserMessage(message) ?
              <ChatMessage
                author={'You'}
                avatar={userAvatar}
                {...commonProps}
              /> :
              <ChatMessage
                author={'Assistant'}
                avatar={assistantAvatar}
                {...commonProps}
              />
          }
          {isLastMessage && LastMessageRefComponent}
        </>
      )
    })
  )
}
