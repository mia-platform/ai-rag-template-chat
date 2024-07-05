/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */

import '@testing-library/jest-dom/vitest'
import '@testing-library/jest-dom'

// import strings from './strings'
// import '../../../common-setup-tests'

// Enzyme.configure({adapter: new Adapter()})

// setTestStrings(strings['en'])

window.prompt = () => {}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {}
  })
})

window.HTMLElement.prototype.scrollIntoView = function () {}

// window.ResizeObserver = vi.fn().mockImplementation(() => ({
//   observe: vi.fn(),
//   unobserve: vi.fn(),
//   disconnect: vi.fn(),
// }))

// global.requestAnimationFrame = fn => fn
