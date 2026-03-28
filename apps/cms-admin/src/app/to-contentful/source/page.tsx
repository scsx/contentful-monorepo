import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import Link from 'next/link'
import FlowSteps from '@/components/FlowSteps'

export default function ModelsPage() {
  return (
    <>
      <PageTitle title='Source Models' subtitle='Edited manually' />
      <div className='flex'>
        <div className='w-2/3'>
          <div className='space-y-2'>
            <p className='text-lg'>
              Source has the <code className='text-lg'>.ts</code> files to generate the final{' '}
              <code className='text-lg'>.json</code> files for schema. These are the{' '}
              <strong>actual source of truth</strong>.
            </p>
            <h2 className='mt-8'>Base structure</h2>
            <pre className='bg-white py-2 px-4 text-base'>
              {`
export const modelName = {
  schema: {
    model: {
      id: 'modelName',
      name: 'Display Name',
      description: 'Description',
      fields: [
        {
          id: 'fieldId'
          // etc
        }
      ]
    }
  },
  editorInterface: {
    // How fields appear in the editor (help text, appearance, widget, etc)
    fieldId: {
      helpText: 'Help text',
      widget: 'colorPicker'
    }
  },
  taxonomy: {
    // Maybe mandatory, TBD
    ...
  },
  app: {
    sidebar: {
      // To be read by the Contentful App (contentful-monorepo/apps/contentful-app)
    }
  }
}
              `}
            </pre>
          </div>
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='fromRepo' activeStep={0} />
        </div>
      </div>
    </>
  )
}
