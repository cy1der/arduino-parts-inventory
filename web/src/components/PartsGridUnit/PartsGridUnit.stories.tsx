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

import PartsGridUnit from './PartsGridUnit'

const meta: Meta<typeof PartsGridUnit> = {
  component: PartsGridUnit,
}

export default meta

type Story = StoryObj<typeof PartsGridUnit>

export const Primary: Story = {}
