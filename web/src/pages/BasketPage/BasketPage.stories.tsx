import type { Meta, StoryObj } from '@storybook/react'

import BasketPage from './BasketPage'

const meta: Meta<typeof BasketPage> = {
  component: BasketPage,
}

export default meta

type Story = StoryObj<typeof BasketPage>

export const Primary: Story = {}
