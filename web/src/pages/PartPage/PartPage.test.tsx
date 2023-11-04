import { render } from '@redwoodjs/testing/web'

import PartPage from './PartPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PartPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PartPage />)
    }).not.toThrow()
  })
})
