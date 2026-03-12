'use client'

import React from 'react'
import { Table } from '@contentful/f36-components'
import { XIcon, CheckIcon } from '@contentful/f36-icons'

type Migration = {
  id: string
  source: string
  target: string
  startedAt: string
  finishedAt: string
  status: string
  summary?: {
    contentTypesCreated?: number
    contentTypesUpdated?: number
    fieldsAdded?: number
  }
}

type Props = {
  migrations: Migration[]
}

const MigrateLogsDevTable: React.FC<Props> = ({ migrations }) => {
  return (
    <div className='w-2/3 pt-8'>
      <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Date</Table.Cell>
          <Table.Cell>Source</Table.Cell>
          <Table.Cell>Target</Table.Cell>
          <Table.Cell>Created</Table.Cell>
          <Table.Cell>Updated</Table.Cell>
          <Table.Cell>Fields Added</Table.Cell>
          <Table.Cell>Status</Table.Cell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {migrations.map((m) => (
          <Table.Row key={m.id}>
            <Table.Cell>{new Date(m.startedAt).toLocaleString()}</Table.Cell>
            <Table.Cell>{m.source}</Table.Cell>
            <Table.Cell>{m.target}</Table.Cell>
            <Table.Cell>{m.summary?.contentTypesCreated ?? 0}</Table.Cell>
            <Table.Cell>{m.summary?.contentTypesUpdated ?? 0}</Table.Cell>
            <Table.Cell>{m.summary?.fieldsAdded ?? 0}</Table.Cell>
            <Table.Cell>{m.status === 'success' ? <CheckIcon /> : <XIcon />}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    </div>
  )
}

export default MigrateLogsDevTable
