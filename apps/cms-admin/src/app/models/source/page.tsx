import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'

export default function ModelsPage() {
  return (
    <div>
      <PageTitle title='Source Models' />

      <div className='space-y-2'>
        <p>
          Source has the <code className='text-lg'>.ts</code> files to generate the final{' '}
          <code className='text-lg'>.json</code> files for schema. These are the{' '}
          <strong>actual source of truth</strong>.
        </p>
        <p>Files have the following structure:</p>
        <pre className='bg-white w-2/3 p-2'>
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
        <ScriptSteps
          steps={[
            {
              title: '1 Generate .json files',
              command: 'pnpm ...'
            },
            {
              title: '2 Generate types',
              command: 'pnpm ...'
            }
          ]}
        />
      </div>
    </div>
  )
}
