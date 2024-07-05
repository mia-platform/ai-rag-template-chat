import {Alert, Button} from 'antd-5'
import {ReactNode} from 'react'
import {RedoOutlined} from '@ant-design/icons'

import './index.css'

export const DATA_TEST_ID_CHAT_ERROR = 'assistant-chat-error'

export const ChatError = ({canTryAgain, onRetry} : {
  canTryAgain: boolean
  onRetry: () => void
}) : ReactNode => {
  const description = (
    <div
      className='description-container'
      data-testid={DATA_TEST_ID_CHAT_ERROR}
    >
      <p>
        Something went wrong processing the answer.
        {
          canTryAgain &&
          <><br/>Please try again</>
        }
      </p>
      {canTryAgain && (
        <Button
          className='description-container-button'
          danger
          icon={<RedoOutlined /> }
          onClick={onRetry}
          size='large'
          type='primary'
        >
        Try again
        </Button>
      )}
    </div>
  )

  return (
    <Alert message={description} showIcon type="error"/>
  )
}
