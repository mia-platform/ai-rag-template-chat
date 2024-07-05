import {ReactNode, useEffect, useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

const DISPLAY_COPIED_INTERVAL = 1000

export function CopyContent ({
  children,
  toCopy,
  copiedInterval = DISPLAY_COPIED_INTERVAL
} : {
  children: any
  toCopy: string,
  copiedInterval?: number
}) : ReactNode {
  const [isCopied, setIsCopied] = useState(false)

  const onCopy = () : void => {
    if (!isCopied) setIsCopied(true)
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), copiedInterval)
      return () => clearTimeout(timer)
    }
  }, [copiedInterval, isCopied])

  const copyMessageId = `copyContent.${isCopied ? 'copied' : 'copy'}`

  return (
    <CopyToClipboard onCopy={onCopy} text={toCopy ?? ''}>
      {children({isCopied, copyMessageId, toCopy})}
    </CopyToClipboard>
  )
}
