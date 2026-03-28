import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import Link from 'next/link'
import FlowSteps from '@/components/FlowSteps/FlowSteps'

export default function ModelsPage() {
  return (
    <>
      <PageTitle title='Source Models' />
      <div className='flex'>
        <div className='w-2/3'>
          <div className='space-y-2'>
            <p>
              Source has the <code className='text-lg'>.ts</code> files to generate the final{' '}
              <code className='text-lg'>.json</code> files for schema. These are the{' '}
              <strong>actual source of truth</strong>.
            </p>
            <p>Files have the following structure:</p>
            <pre className='bg-white p-2'>
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
    // Editor Interface — how fields appear in the editor (help text, appearance, widget, aspect ratio, etc)
    fieldId: {
      helpText: 'Help text',
      widget: 'radio'
    }
  },
  app: {
    sidebar: {
      // To be read by the Contentful App (contentful-app)
    }
  }
}
              `}
            </pre>

            <h2 className='pt-8 pb-4'>After editing</h2>
            <p>
              Visit <Link href='/models/generate'>generate</Link>
            </p>
          </div>
        </div>
        <div className='w-1/3'>
          <FlowSteps flow='toRepo' activeStep={0} />
        </div>
      </div>
    </>
  )
}
