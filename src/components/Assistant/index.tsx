import {ReactNode} from 'react'

import {AssistantHeader} from './components/AssistantHeader'
import {AssistantContent} from './components/AssistantContent'
import {AssistantFooter} from './components/AssistantFooter'

export function Assistant () : ReactNode {
  return (
    <>
      <AssistantHeader />
      <AssistantContent />
      <AssistantFooter />
    </>
  )
}
