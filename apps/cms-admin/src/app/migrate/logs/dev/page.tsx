import PageTitle from '@/components/PageTitle'
import { getMigrationLog } from '@repo/cms-schema'

import MigrateLogsDevTable from '@/components/page-specific/MigrateLogsDevTable'

export default function LogsDevPage() {
  const logs = getMigrationLog('dev')

  return (
    <div>
      <PageTitle
        title='Migrations to dev Logs'
        subtitle='Reading from packages/cms-schema/src/logs/dev-migration-log.json'
      />

      <MigrateLogsDevTable migrations={logs?.migrations ?? []} />

      <p className='mt-8'>Dummy data</p>
    </div>
  )
}
