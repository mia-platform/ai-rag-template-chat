/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */

declare module '*.svg' {
    import * as React from 'react'
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>
    const src: string
    export default src
  }
