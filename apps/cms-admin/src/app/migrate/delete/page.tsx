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
      <p className='mb-4 pt-8'>
        When migrating a schema to dev with deletions those items will be omitted. This script can
        clean them up afterwards.
      </p>
      <p className='mb-8'>
        Check deleted items at <Link href='/migrate/logs/deleted'>Deletion Logs</Link>.
      </p>
    </div>
  )
}
