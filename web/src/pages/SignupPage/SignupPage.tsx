import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on name box on page load
  const nameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <main>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-primary">Sign up</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="mb-3 flex justify-between space-x-3">
                    <div>
                      <TextField
                        placeholder="First Name"
                        name="firstName"
                        className="rw-input"
                        errorClassName="rw-input rw-input-error"
                        ref={nameRef}
                        validation={{
                          required: {
                            value: true,
                            message: 'Required',
                          },
                        }}
                      />
                      <FieldError name="firstName" className="rw-field-error" />
                    </div>

                    <div>
                      <TextField
                        name="lastName"
                        placeholder="Last Name"
                        className="rw-input"
                        errorClassName="rw-input rw-input-error"
                        validation={{
                          required: {
                            value: true,
                            message: 'Required',
                          },
                        }}
                      />
                      <FieldError name="lastName" className="rw-field-error" />
                    </div>
                  </div>

                  <TextField
                    name="email"
                    placeholder="Email"
                    className="rw-input mb-3 min-w-full"
                    errorClassName="rw-input rw-input-error min-w-full"
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

                  <PasswordField
                    name="password"
                    placeholder="Password"
                    className="rw-input min-w-full"
                    errorClassName="rw-input rw-input-error min-w-full"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Required',
                      },
                    }}
                  />
                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button btn-primary">Sign Up</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span className="font-inter">Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
