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
            command: 'pnpm tsx scripts/schema/migrate/migrate-schema.ts repo dev'
          },
          {
            title: 'Promote schema from dev to preprod',
            command: 'pnpm tsx scripts/schema/migrate/migrate-schema.ts dev preprod'
          },
          {
            title: 'Promote schema from preprod to master',
            command: 'pnpm tsx scripts/schema/migrate/migrate-schema.ts preprod master'
          }
        ]}
      />

      <h3 className='pt-8'>Example script output</h3>
      <p>A new string was added to FAQs (subtitle)</p>
      <pre className='bg-black text-white p-4 mt-4 text-base w-1/2'>
        {`pnpm tsx scripts/schema/migrate/migrate-schema.ts repo dev
[dotenv@17.3.1] injecting env (5) from .env

Source: repo
Target: dev

No changes: blockWrapper
No changes: breadcrumbs
No changes: cta
No changes: ctaGroup
No changes: dynamicPage
  Add field: faqs.subtitle
Update content type: faqs
No changes: genericContentColumns
No changes: genericContentColumnsItem
No changes: hero
No changes: largeHero
No changes: timeline
No changes: titleAndText

Summary
-------
Content types created: 0
Content types updated: 1
Fields added: 1
Fields updated: 0`}
      </pre>
    </div>
  )
}
