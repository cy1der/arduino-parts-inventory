import { render } from '@redwoodjs/testing/web'

import ToastNotification from './ToastNotification'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ToastNotification', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ToastNotification />)
    }).not.toThrow()
  })
})
