/*
 * Copyright © 2024-present Mia s.r.l.
 * All rights reserved
 */

import {FC} from 'react'

import './App.css'

import {Assistant} from './components/Assistant'

const App: FC = () => {
  return (
    <main className='app-main'>
      <Assistant />
    </main>
  )
}

export default App
