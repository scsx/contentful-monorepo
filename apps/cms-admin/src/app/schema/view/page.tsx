'use client'

import { contentTypes } from '@repo/cms-models'
import PageTitle from '@/components/PageTitle'
import React from 'react'
import { Table } from '@contentful/f36-components'

export default function SchemaViewPage() {
  return (
    <div>
      <PageTitle title='Schema View' />

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Field name</Table.Cell>
            <Table.Cell>Field id</Table.Cell>
            <Table.Cell>Type</Table.Cell>
            <Table.Cell>Required</Table.Cell>
            <Table.Cell>Localized</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {contentTypes.map((ct: any) => (
            <React.Fragment key={ct.id}>
              <Table.Row>
                <Table.Cell>
                  <div>
                    <div>
                      <strong>{ct.name}</strong>
                    </div>
                    <pre>{ct.id}</pre>
                    <div>
                      <em>{ct.description ?? ''}</em>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>

              {Array.isArray(ct.fields) && ct.fields.length > 0 ? (
                ct.fields.map((f: any) => (
                  <Table.Row key={`${ct.id}-${f.id}`}>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>{f.name}</Table.Cell>
                    <Table.Cell>{f.id}</Table.Cell>
                    <Table.Cell>
                      {f.type}
                      {f.items ? ` (${f.items.type})` : ''}
                    </Table.Cell>
                    <Table.Cell>{f.required ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{f.localized ? 'Yes' : 'No'}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={6}>No fields</Table.Cell>
                </Table.Row>
              )}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
