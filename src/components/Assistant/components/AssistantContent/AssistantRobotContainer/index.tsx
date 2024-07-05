import {ReactElement} from 'react'

import {ReactComponent as AssistantRobotSvg} from '../../../../../assets/assistant-placeholder.svg'
import './index.css'

export function AssistantRobotContainer (): ReactElement {
  return (
    <div className='robot-container'>
      <AssistantRobotSvg data-testid='assistant-robot-svg' />
    </div>
  )
}
