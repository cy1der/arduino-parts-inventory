import { render } from '@redwoodjs/testing/web'

import AdminMenu from './AdminMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminMenu />)
    }).not.toThrow()
  })
})
