// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import TransactionListItem from './TransactionListItem'

const meta: Meta<typeof TransactionListItem> = {
  component: TransactionListItem,
}

export default meta

type Story = StoryObj<typeof TransactionListItem>

export const Primary: Story = {}
