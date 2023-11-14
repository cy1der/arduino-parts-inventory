import { render } from '@redwoodjs/testing/web'

import AdminTransactionsPage from './AdminTransactionsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminTransactionsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminTransactionsPage />)
    }).not.toThrow()
  })
})
