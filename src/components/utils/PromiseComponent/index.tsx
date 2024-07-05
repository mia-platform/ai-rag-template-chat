/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */

import React, {ReactElement, useEffect, useState} from 'react'
import {MessageFormatElement} from 'react-intl'

type DataType = Record<string, MessageFormatElement[]>

type PromiseComponentProps = {
  promiseFunction: () => Promise<DataType>
  children: (data?: DataType) => ReactElement
}

const PromiseComponent: React.FC<PromiseComponentProps> = ({promiseFunction, children}) => {
  const [data, setData] = useState<DataType>()
  const [isError, setError] = useState<boolean>()

  useEffect(() => {
    promiseFunction()
      .then(response => {
        setData(response)
      })
      .catch(() => {
        setError(true)
      })
  }, [promiseFunction])

  if (data) return children(data)
  if (isError) return <div>{'Error'}</div>
  return <div>{'Loading...'}</div>
}

export default PromiseComponent
