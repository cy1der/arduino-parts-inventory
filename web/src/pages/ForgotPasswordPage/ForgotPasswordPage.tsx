import { useEffect, useRef } from 'react'

import { Form, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import ToastNotification from 'src/components/ToastNotification'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef?.current?.focus()
  }, [])

  const onSubmit = async (data: { email: string }) => {
    const response = await forgotPassword(data.email.toLowerCase())

    if (response.error) {
      toast.custom((t) => (
        <ToastNotification toast={t} type="error" message={response.error} />
      ))
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.custom((t) => (
        <ToastNotification
          toast={t}
          type="success"
          message={`A link to reset your password was sent to ${response.email}`}
        />
      ))
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-primary">Forgot Password</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <TextField
                      name="email"
                      placeholder="Email"
                      className="rw-input mb-3 min-w-full"
                      errorClassName="rw-input rw-input-error min-w-full"
                      ref={emailRef}
                      validation={{
                        required: {
                          value: true,
                          message: 'Required',
                        },
                        pattern: {
                          value: new RegExp(
                            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
                          ),
                          message: 'Email is not valid',
                        },
                      }}
                    />

                    <FieldError name="email" className="rw-field-error pb-3" />
                  </div>

                  <div className="rw-button-group">
                    <Submit className="rw-button btn-primary">Submit</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
