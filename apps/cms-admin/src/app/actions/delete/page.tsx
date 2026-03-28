import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'
import Link from 'next/link'

export default function MigrateSchemaPage() {
  return (
    <div>
      <PageTitle title='Delete Omitted' />

      <ScriptSteps
        steps={[
          {
            title: 'Delete previously omitted items (dev only)',
            command: 'pnpm tsx scripts/migrate/delete-omitted.ts dev'
          }
        ]}
      />
      <p className='mb-4'>
        When migrating a schema to dev with deletions those items will be omitted. This script can
        clean them up afterwards.
      </p>
      <p className='mb-8'>
        Check deleted items at <Link href='/migrate/logs/deleted'>Deletion Logs</Link>.
      </p>

      <h2 className='pt-8 pb-4'>Example output from script</h2>
       className='bg-black text-white p-4 mt-4 text-base w-2/3'>
        {`
[dotenv@17.3.1] injecting env (7) from .env -- tip: ⚙️  write to custom object with { processEnv: myObject }
Delete field: genericContentColumnsItem.descriptionTest
Delete field: genericContentColumnsItem.subtitleTest
        `}
      </pre><pre
    </div>
  )
}
