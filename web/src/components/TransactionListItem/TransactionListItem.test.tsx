import { render } from '@redwoodjs/testing/web'

import TransactionListItem from './TransactionListItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TransactionListItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TransactionListItem />)
    }).not.toThrow()
  })
})
