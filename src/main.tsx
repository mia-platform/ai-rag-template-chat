/// <reference types="vite-plugin-svgr/client" />

/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import {IntlProvider} from 'react-intl'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App.tsx'
import './css_reset.css'
import './index.css'
import messages from './strings'
import PromiseComponent from './components/utils/PromiseComponent/index.tsx'
import {store} from './redux-store.ts'

const navigatorLanguage = navigator.language.substring(0, 2)
const language = messages[navigatorLanguage] ? navigatorLanguage : 'en'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PromiseComponent promiseFunction={() => messages[language]}>
        {(strings: any) => (
          <IntlProvider locale={language} messages={strings}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </IntlProvider>
        )}
      </PromiseComponent>
    </Provider>
  </React.StrictMode>
)
