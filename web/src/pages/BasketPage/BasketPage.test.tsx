import { render } from '@redwoodjs/testing/web'

import BasketPage from './BasketPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BasketPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BasketPage />)
    }).not.toThrow()
  })
})
