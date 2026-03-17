import * as React from 'react'
import { useSDK } from '@contentful/react-apps-toolkit'
import { SidebarAppSDK } from '@contentful/app-sdk'
import { Tabs, Paragraph, List } from '@contentful/f36-components'

const Sidebar: React.FC = () => {
  const sdk = useSDK<SidebarAppSDK>()

  const contentType = sdk.entry.getSys().contentType.sys.id
  const entryId = sdk.entry.getSys().id

  // Used to automatically resize the sidebar height to fit the content.
  React.useEffect(() => {
    sdk.window.startAutoResizer()
  }, [sdk])

  return (
    <div style={{ padding: '5px 10px', backgroundColor: '#fff3b4', borderRadius: '4px' }}>
      <Tabs defaultTab='first'>
        <Tabs.List>
          <Tabs.Tab panelId='first'>Info</Tabs.Tab>
          <Tabs.Tab panelId='second'>Instructions</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel id='first'>
          <Paragraph marginTop='spacingM' marginBottom='spacingM'>
            This is some info.
          </Paragraph>
        </Tabs.Panel>

        <Tabs.Panel id='second'>
          <Paragraph marginTop='spacingM' marginBottom='spacingM'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='https://www.estadao.com.br/resizer/v2/AZMGCEQCVFNPFBDI4PTSUV6GTU.jpg?quality=80&auth=80cfeced1b5f0fb585922c5fdfe8c9bf372e817d07aac11bf7a035995da55989&width=1200&height=1200&smart=true'
              style={{ width: '100%', height: 'auto' }}
              alt='Homer'
            />
          </Paragraph>
        </Tabs.Panel>
      </Tabs>

      <List>
        <List.Item>Content type: {contentType}</List.Item>
        <List.Item>Entry ID: {entryId}</List.Item>
      </List>
    </div>
  )
}

export default Sidebar
