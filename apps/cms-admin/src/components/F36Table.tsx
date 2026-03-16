'use client'

import { Table } from '@contentful/f36-components'

type TColumn = {
  key: string
  label: string
}

type F36TableProps<T> = {
  columns: TColumn[]
  data: T[]
  keyField?: keyof T
}

const F36Table = <T extends Record<string, any>>({ columns, data, keyField }: F36TableProps<T>) => {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          {columns.map((col) => (
            <Table.Cell key={col.key}>{col.label}</Table.Cell>
          ))}
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.map((row, index) => (
          <Table.Row key={keyField ? row[keyField] : index}>
            {columns.map((col) => (
              <Table.Cell key={col.key}>{row[col.key]}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default F36Table
