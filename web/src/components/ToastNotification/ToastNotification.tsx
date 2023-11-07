import { mdiCloseCircle, mdiInformation, mdiCheckCircle } from '@mdi/js'
import { Icon } from '@mdi/react'

import { Toast } from '@redwoodjs/web/toast'

type NotificationType = 'success' | 'error' | 'info'

interface Props {
  type: NotificationType
  message: string
  toast: Toast
}

const ToastNotification = ({ type, message, toast }: Props) => (
  <div
    className={`${
      toast.visible
        ? 'duration-200 animate-in slide-in-from-top'
        : 'duration-200 animate-out slide-out-to-top'
    } pointer-events-auto flex w-full max-w-sm items-center rounded-2xl bg-base-100 shadow-lg`}
  >
    <Icon
      className={`m-3 h-8 w-8 ${
        type == 'success'
          ? 'text-success'
          : type == 'error'
          ? 'text-error'
          : 'text-info'
      }`}
      path={
        type == 'success'
          ? mdiCheckCircle
          : type == 'error'
          ? mdiCloseCircle
          : mdiInformation
      }
    />
    <p className="font-inter">{message}</p>
  </div>
)

export default ToastNotification
