import { render } from '@redwoodjs/testing/web'

import PartsGridUnit from './PartsGridUnit'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PartsGridUnit', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PartsGridUnit />)
    }).not.toThrow()
  })
})
