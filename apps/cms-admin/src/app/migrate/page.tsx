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
            command: 'pnpm tsx scripts/migrate/migrate-schema.ts repo dev'
          },
          {
            title: 'Promote schema from dev to preprod',
            command: 'pnpm tsx scripts/migrate/migrate-schema.ts dev preprod'
          },
          {
            title: 'Promote schema from preprod to master',
            command: 'pnpm tsx scripts/migrate/migrate-schema.ts preprod master'
          }
        ]}
      />

      <h2 className='pt-8 pb-4'>Example outputs from script</h2>
      <p>A new string was added to FAQs (subtitle):</p>
      <pre className='bg-black text-white p-4 mt-4 text-base w-2/3'>
        {`pnpm tsx scripts/migrate/migrate-schema.ts repo dev
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
      <p className='pt-8'>The previous string was removed from FAQs (subtitle):</p>
      <pre className='bg-black text-white p-4 mt-4 text-base w-2/3'>
        {`pnpm tsx scripts/migrate/migrate-schema.ts repo dev
[dotenv@17.3.1] injecting env (5) from .env -- tip: ⚙️  suppress all logs with { quiet: true }

Source: repo
Target: dev

No changes: blockWrapper
No changes: breadcrumbs
No changes: cta
No changes: ctaGroup
No changes: dynamicPage
  Omit field: faqs.subtitle
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
Fields added: 0
Fields updated: 0
Fields omitted: 1`}
      </pre>
    </div>
  )
}
