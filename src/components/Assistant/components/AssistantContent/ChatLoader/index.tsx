import {ReactNode} from 'react'
import './index.css'

export const DATA_TEST_ID_CHAT_LOADER = 'assistant-chat-loader'

export const ChatLoader = () : ReactNode => {
  return (
    <div className='bouncing-loader' data-testid={DATA_TEST_ID_CHAT_LOADER}>
      <div className='dot1' />
      <div className='dot2' />
      <div className='dot3' />
    </div>
  )
}
