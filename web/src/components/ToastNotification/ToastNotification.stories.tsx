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

import ToastNotification from './ToastNotification'

const meta: Meta<typeof ToastNotification> = {
  component: ToastNotification,
}

export default meta

type Story = StoryObj<typeof ToastNotification>

export const Primary: Story = {}
