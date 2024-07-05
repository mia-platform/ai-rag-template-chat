import {ReactNode} from 'react'
import {Button} from 'antd-5'
import {ArrowUpOutlined} from '@ant-design/icons'

export const DATA_TEST_ID_SUBMIT_BUTTON = 'assistant-submit-button'

export function SubmitButton (
  {
    isDisabled,
    onClick
  } : {
    isDisabled: boolean
    onClick: () => void
  }
) : ReactNode {
  return (
    <div
      className='assistant-submit-button'
      data-testid={DATA_TEST_ID_SUBMIT_BUTTON}
    >
      <Button
        disabled={isDisabled}
        icon={ <ArrowUpOutlined/> }
        onClick={onClick}
        shape='circle'
        size='large'
        type='primary'
      />
    </div>
  )
}
