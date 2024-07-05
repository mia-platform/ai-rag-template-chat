import {ChangeEventHandler, KeyboardEventHandler, ReactNode, useCallback, useState} from 'react'
import {Input} from 'antd-5'

import {SubmitButton} from './SubmitButton'
import {assistantCompletions, assistantSelectors} from '../../../../slices/assistant'
import {useAppDispatch, useAppSelector} from '../../../../redux-hooks'
import './index.css'

export function AssistantFooter () : ReactNode {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(assistantSelectors.selectIsLoading)
  const [userMessage, setUserMessage] = useState('')

  const sendUserMessage = useCallback((message: string) => {
    dispatch(assistantCompletions(message.trim()))
    setUserMessage('')
  }, [dispatch])

  const onChangeTextArea : ChangeEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    const clearedValue = event.target.value.replace(/^[ \n]+/g, '')
    setUserMessage(clearedValue)
  }, [])

  const sendShortcut : KeyboardEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    const isEnterPressed = event.key === 'Enter'
    const isShiftPressed = event.shiftKey
    if (!isLoading && userMessage && isEnterPressed && !isShiftPressed) {
      sendUserMessage(userMessage)
    }
  }, [isLoading, sendUserMessage, userMessage])

  return (
    <>
      <div className='assistant-footer' data-testid='assistant-footer'>
        <Input.TextArea
          autoSize={{minRows: 2, maxRows: 6}}
          data-testid='assistant-textarea'
          onChange={onChangeTextArea}
          onKeyDown={sendShortcut}
          placeholder='Type a message...'
          value={userMessage}
        />
        <SubmitButton
          isDisabled={isLoading || !userMessage}
          onClick={() => sendUserMessage(userMessage)}
        />
      </div>
    </>
  )
}
