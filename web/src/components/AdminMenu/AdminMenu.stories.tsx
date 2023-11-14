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

import AdminMenu from './AdminMenu'

const meta: Meta<typeof AdminMenu> = {
  component: AdminMenu,
}

export default meta

type Story = StoryObj<typeof AdminMenu>

export const Primary: Story = {}
