import {configureStore} from '@reduxjs/toolkit'

import reducers from '../reducers'
import {RootState} from '../redux-store'

// Real redux store, made simple for test (to be used with async action)
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function mockStore (mockState?: RootState) {
  const store = configureStore({
    reducer: {...reducers},
    preloadedState: mockState
  })

  return store
}
