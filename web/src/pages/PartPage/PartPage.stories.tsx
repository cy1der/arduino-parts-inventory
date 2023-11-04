import type { Meta, StoryObj } from '@storybook/react'

import PartPage from './PartPage'

const meta: Meta<typeof PartPage> = {
  component: PartPage,
}

export default meta

type Story = StoryObj<typeof PartPage>

export const Primary: Story = {}
