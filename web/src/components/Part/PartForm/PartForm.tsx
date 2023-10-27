import { useState } from 'react'

import { PickerInline } from 'filestack-react'
import type { EditPartById, UpdatePartInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPart = NonNullable<EditPartById['part']>

interface PartFormProps {
  part?: EditPartById['part']
  onSave: (data: UpdatePartInput, id?: FormPart['id']) => void
  error: RWGqlError
  loading: boolean
}

const PartForm = (props: PartFormProps) => {
  const [imageUrl, setImageUrl] = useState(props?.part?.imageUrl)

  const onSubmit = (data: FormPart) => {
    const dataWithImageUrl = Object.assign(data, { imageUrl })
    props.onSave(dataWithImageUrl, props?.part?.id)
  }

  const onImageUpload = (response) => {
    setImageUrl(response.filesUploaded[0].url)
  }

  const preview = (url: string) => {
    const parts = url.split('/')
    parts.splice(3, 0, 'resize=height:500')
    return parts.join('/')
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPart> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.part?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.part?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="availableStock"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Available stock
        </Label>

        <NumberField
          name="availableStock"
          defaultValue={props.part?.availableStock}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="availableStock" className="rw-field-error" />

        <Label
          name="imageUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image
        </Label>

        {!imageUrl && (
          <div style={{ height: '500px' }}>
            <PickerInline
              onSuccess={onImageUpload}
              pickerOptions={{ accept: 'image/*' }}
              apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
            />
          </div>
        )}

        {imageUrl && (
          <div>
            <img
              alt=""
              src={preview(imageUrl)}
              style={{ display: 'block', margin: '2rem 0' }}
            />
            <button
              onClick={() => setImageUrl(null)}
              className="rw-button rw-button-blue"
            >
              Replace Image
            </button>
          </div>
        )}

        <FieldError name="imageUrl" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PartForm
