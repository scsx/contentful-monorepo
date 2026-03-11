'use client'

import { useState } from 'react'
import PageTitle from '@/components/PageTitle'
import Button from '@/components/Button'
import { TextInput } from '@contentful/f36-components'

export default function ModelBuilderPage() {
  const [modelName, setModelName] = useState('largeHero')
  const [fields, setFields] = useState<string[]>([])

  const availableFields = [
    "createTextField('title', 'Title', true)",
    "createColorField('backgroundColor', 'Background Color')"
  ]

  const availableFragments = ['...ctaFragment']

  const addItem = (item: string) => {
    setFields((prev) => [...prev, item])
  }

  const generatedCode = `
  import { createTextField } from '../fields/text-field'
  import { createColorField } from '../fields/color-field'
  import { ctaFragment } from '../fragments/cta'

  export const ${modelName}Model = {
    id: '${modelName}',
    name: '${modelName}',
    displayField: 'title',
    fields: [
      ${fields.join(',\n    ')}
    ]
  }
  `

  return (
    <div>
      <PageTitle title='Model Builder (Experimental)' subtitle='Draft' />

      <div className='w-1/2 flex flex-col'>
        <div>
          <label>Model name</label>
          <TextInput
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder='Enter model name'
          />
        </div>

        <h3 className='mt-4'>Fields</h3>
        <div className='flex flex-col space-y-4'>
          {availableFields.map((f) => (
            <Button
              key={f}
              variant='primary'
              size='small'
              onClick={() => addItem(f)}
              className='mt-4 mb-2'>
              + {f}
            </Button>
          ))}
        </div>

        <h3 className='mt-4 mb-2'>Fragments</h3>
        {availableFragments.map((f) => (
          <Button
            key={f}
            variant='primary'
            size='small'
            onClick={() => addItem(f)}
            className='mb-2'>
            + {f}
          </Button>
        ))}

        <h3 className='mt-4 mb-2'>Generated TS</h3>
        <pre className='bg-white'>{generatedCode}</pre>

        <p className='mt-6'>
          Copy this code and paste it into
          <code className='text-lg'> cms-schema/src/schema/source/models/{modelName}.ts</code>
        </p>
      </div>
    </div>
  )
}
