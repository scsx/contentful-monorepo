'use client'

import { Tabs } from '@contentful/f36-components'
import ScriptSteps from '@/components/ScriptSteps'

type TField = {
  id: string
  name: string
  type: string
}

type TActionsViewModelTabsProps = {
  model: string
  fields: TField[]
}

const ActionsViewModelTabs = ({ model, fields }: TActionsViewModelTabsProps) => {
  const fieldSteps = fields.map((field) => ({
    title: field.id,
    command: `pnpm tsx scripts/models/model/find-field-usages.ts ${model}.${field.id} dev`
  }))

  return (
    <div className='pb-8'>
      <Tabs defaultTab='first'>
        <Tabs.List variant='vertical-divider' className='mb-8'>
          <Tabs.Tab panelId='first'>Usages of model</Tabs.Tab>
          <Tabs.Tab panelId='second'>Usages by field</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id='first'>
          <ScriptSteps
            steps={[
              {
                title: 'Find usages in dev:',
                command: `pnpm tsx scripts/models/model/find-usages.ts ${model} dev`
              },
              {
                title: 'Find usages in master:',
                command: `pnpm tsx scripts/models/model/find-usages.ts ${model} master`
              }
            ]}
          />
        </Tabs.Panel>
        <Tabs.Panel id='second'>
          <ScriptSteps steps={fieldSteps} />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default ActionsViewModelTabs
