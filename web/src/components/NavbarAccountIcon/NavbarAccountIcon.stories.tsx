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

import NavbarAccountIcon from './NavbarAccountIcon'

const meta: Meta<typeof NavbarAccountIcon> = {
  component: NavbarAccountIcon,
}

export default meta

type Story = StoryObj<typeof NavbarAccountIcon>

export const Primary: Story = {}
