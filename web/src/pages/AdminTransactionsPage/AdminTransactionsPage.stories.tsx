import type { Meta, StoryObj } from '@storybook/react'

import AdminTransactionsPage from './AdminTransactionsPage'

const meta: Meta<typeof AdminTransactionsPage> = {
  component: AdminTransactionsPage,
}

export default meta

type Story = StoryObj<typeof AdminTransactionsPage>

export const Primary: Story = {}
