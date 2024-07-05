import {Button} from 'antd-5'
import {ReactNode} from 'react'
import {ClearOutlined} from '@ant-design/icons'

import {useAppDispatch, useAppSelector} from '../../../../redux-hooks'
import {resetChatHistory} from '../../../../slices/assistant'

import './index.css'

export function AssistantHeader () : ReactNode {
  const dispatch = useAppDispatch()
  const chatHistory = useAppSelector(state => state.assistantReducer.chatHistory)

  return (
    <header className='assistant-header'>
      <h2>{'Assistant Playground'}</h2>

      <Button
        disabled={chatHistory.length === 0}
        icon={ <ClearOutlined/> }
        onClick={() => {
          dispatch(resetChatHistory())
        }}
        size='large'
        type='default'
      />
    </header>
  )
}
