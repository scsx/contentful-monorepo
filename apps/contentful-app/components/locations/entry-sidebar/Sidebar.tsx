import * as React from 'react'
import { useSDK } from '@contentful/react-apps-toolkit'
import { Tabs, Paragraph } from '@contentful/f36-components'

const Sidebar: React.FC = () => {
  const sdk = useSDK()

  const contentType = sdk.contentType.sys.id
  const entryId = sdk.entry.getSys().id

  // Stupid TS fix.
  const TabsComponent = Tabs as unknown as React.FC<any>
  const TabsList = Tabs.List as unknown as React.FC<any>
  const TabsTab = Tabs.Tab as unknown as React.FC<any>
  const TabsPanel = Tabs.Panel as unknown as React.FC<any>

  return (
    <div style={{ padding: '5px 10px', backgroundColor: 'gold', borderRadius: '4px' }}>
      <TabsComponent defaultTab='first'>
        <TabsList>
          <TabsTab panelId='first'>First</TabsTab>
          <TabsTab panelId='second'>Second</TabsTab>
        </TabsList>

        <TabsPanel id='first'>
          <Paragraph>I love Forma 36 design system.</Paragraph>
        </TabsPanel>
        <TabsPanel id='second'>Content for the second tab</TabsPanel>
      </TabsComponent>

      <div>
        <p>CT: {contentType}</p>
        <p>ID: {entryId}</p>
      </div>
    </div>
  )
}

export default Sidebar
