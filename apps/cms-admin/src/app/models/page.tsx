import fs from 'node:fs'
import path from 'node:path'
import PageTitle from '@/components/PageTitle'
import Link from 'next/link'

export default function ModelsPage() {
  const modelsPath = path.resolve(process.cwd(), '../../packages/cms-schema/src/schema/models')

  const files = fs.readdirSync(modelsPath).filter((file) => file.endsWith('.json'))

  return (
    <div>
      <PageTitle title='Models' subtitle='Content Types, models for short' />

      <div className='space-y-2'>
        {files.map((file) => {
          const name = file.replace('.json', '')
          return (
            <p key={name} className='text-lg'>
              <code className='modelname'>
                <Link href={`/models/${name}`}>{name}</Link>
              </code>
            </p>
          )
        })}
      </div>
    </div>
  )
}
