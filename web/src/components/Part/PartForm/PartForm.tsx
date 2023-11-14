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
  TextAreaField,
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
    const dataUpdated = Object.assign(data, {
      imageUrl: imageUrl ?? '/no_image.png',
    })

    props.onSave(dataUpdated, props?.part?.id)
  }

  const onImageUpload = (response) => {
    setImageUrl(response.filesUploaded[0].url)
  }

  const preview = (url: string) => {
    if (url.includes('no_image.png')) return url
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

        <TextField
          name="name"
          placeholder="Name"
          defaultValue={props.part?.name}
          className="rw-input mb-3 min-w-full"
          errorClassName="rw-input rw-input-error min-w-full"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error pb-3" />

        <TextAreaField
          name="description"
          placeholder="Description"
          defaultValue={props.part?.description}
          className="rw-textarea mb-1 min-w-full"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error pb-3" />

        <NumberField
          name="availableStock"
          defaultValue={props.part?.availableStock ?? 0}
          className="rw-input min-w-full"
          errorClassName="rw-input rw-input-error min-w-full"
          validation={{ required: true, min: 0 }}
          min={0}
          max={2147483647}
        />

        <FieldError name="availableStock" className="rw-field-error pb-3" />

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
              className="rw-button btn-primary"
            >
              Replace Image
            </button>
          </div>
        )}

        <FieldError name="imageUrl" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button btn-primary">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PartForm
