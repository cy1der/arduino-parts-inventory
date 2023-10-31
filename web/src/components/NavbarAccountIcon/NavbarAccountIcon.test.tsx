import { render } from '@redwoodjs/testing/web'

import NavbarAccountIcon from './NavbarAccountIcon'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavbarAccountIcon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavbarAccountIcon />)
    }).not.toThrow()
  })
})
