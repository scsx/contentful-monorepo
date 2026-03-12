import PageTitle from '@/components/PageTitle'
import ScriptSteps from '@/components/ScriptSteps'

export default function MigrateSchemaPage() {
  return (
    <div>
      <PageTitle title='Migrate Schema' />

      <ScriptSteps
        steps={[
          {
            title: 'Migrate schema from repo to dev',
            command: 'pnpm tsx scripts/schema/migrate-schema.ts repo dev'
          },
          {
            title: 'Promote schema from dev to preprod',
            command: 'pnpm tsx scripts/schema/migrate-schema.ts dev preprod'
          },
          {
            title: 'Promote schema from preprod to master',
            command: 'pnpm tsx scripts/schema/migrate-schema.ts preprod master'
          }
        ]}
      />
    </div>
  )
}
