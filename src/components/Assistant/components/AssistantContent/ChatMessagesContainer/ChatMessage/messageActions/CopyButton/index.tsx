import {Button, Tooltip} from 'antd-5'
import {CheckCircleFilled, CopyOutlined} from '@ant-design/icons'
import {ReactNode} from 'react'

import {CopyContent} from './CopyContent'

const CopyContentButton = ({isCopied} : {isCopied: boolean}) : ReactNode => (
  <Button
    icon={ isCopied ? <CheckCircleFilled /> : <CopyOutlined />}
    size='middle'
    type='default'
  />
)

export function CopyButton ({textContent} : {textContent: string}) : ReactNode {
  return (
    <Tooltip
      mouseEnterDelay={0.5}
      title={'Copy answer'}
    >
      <CopyContent toCopy={textContent}>
        {CopyContentButton}
      </CopyContent>
    </Tooltip>
  )
}
