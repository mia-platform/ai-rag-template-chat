/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */
import '@testing-library/jest-dom'
import {FormattedMessage, IntlProvider} from 'react-intl'
import {waitFor} from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest';


import PromiseComponent from '..'
import { renderComponent } from '../../utilsTests'

const english = {learn: 'Learn React'}

describe('PromiseComponent', () => {
  test('renders children passing data if english data is defined', async () => {
    const promiseFunction = vi.fn().mockResolvedValueOnce(english)
    const element = renderComponent(
      <PromiseComponent promiseFunction={promiseFunction}>
        {data => (
          <IntlProvider locale={'en'} messages={data}>
            <FormattedMessage id='learn' />
          </IntlProvider>
        )}
      </PromiseComponent>
    )
    await waitFor(
      () => expect(element.getByText('Learn React')).toBeInTheDocument()
    )
  })

  test('renders div with error when usePromise returns data undefined and isError true', async () => {
    const promiseFunction = vi.fn().mockRejectedValueOnce({isError: true})
    const children = vi.fn()
    const element = renderComponent(
      <PromiseComponent promiseFunction={promiseFunction}>
        {data => children(data)}
      </PromiseComponent>
    )

    await waitFor(
      () => expect(element.getByText('Error')).toBeInTheDocument()
    )
  })

  test('renders div with loading message when usePromise returns data undefined and isError false', async () => {
    const promiseFunction = vi.fn().mockResolvedValue(undefined)
    const children = vi.fn()
    const element = renderComponent(
      <PromiseComponent promiseFunction={promiseFunction}>
        {data => children(data)}
      </PromiseComponent>
    )

    await waitFor(
      () => expect(element.getByText('Loading...')).toBeInTheDocument()
    )
  })
})