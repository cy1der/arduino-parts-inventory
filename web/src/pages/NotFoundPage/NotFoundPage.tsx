import { Link, routes } from '@redwoodjs/router'

export default () => (
  <div className="flex min-h-screen min-w-max items-center justify-center p-3">
    <div className="mockup-phone font-inter">
      <div className="camera"></div>
      <div className="display">
        <div className="artboard phone-1 bg-base-100 p-2">
          <div className="pt-6">{message1('W-what, where am I?')}</div>
          {message2('Leave, now.')}
          {message1('What, why?')}
          {message2("You're being watched, this is the 404 zone.")}
          {message1('I better get going then...')}
          <div className="flex h-56 items-center justify-center">
            <Link to={routes.home()} className="btn">
              Back to safety
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const message1 = (message: string) => (
  <div className="chat chat-end">
    <div className="chat-bubble chat-bubble-info">{message}</div>
  </div>
)

const message2 = (message: string) => (
  <div className="chat chat-start">
    <div className="chat-bubble bg-gray-200 text-base-content">{message}</div>
  </div>
)
