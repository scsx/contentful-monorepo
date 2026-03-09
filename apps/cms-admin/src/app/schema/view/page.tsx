'use client'

import { contentTypes } from '@repo/cms-models'
import PageTitle from '@/components/PageTitle'
import React from 'react'
import { Table } from '@contentful/f36-components'

export default function SchemaViewPage() {
  const getFieldType = (f: any) => {
    let type = f.type
    if (f.items) {
      type += ` (${f.items.type}`
      if (f.items.validations) {
        const linkContentType = f.items.validations.find(
          (v: any) => v.linkContentType
        )?.linkContentType
        if (linkContentType && linkContentType.length > 0) {
          type += ` of ${linkContentType.join(', ')}`
        }
      }
      type += ')'
    } else if (f.validations) {
      const linkContentType = f.validations.find((v: any) => v.linkContentType)?.linkContentType
      if (linkContentType && linkContentType.length > 0) {
        type += ` (${linkContentType.join(', ')})`
      }
    }
    return type
  }

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
                <Table.Cell colSpan={6}>
                  <div className='flex space-x-4'>
                    <strong className='text-lg'>{ct.name}</strong>
                    <strong className='text-lg text-danger'>
                      <pre>{ct.id}</pre>
                    </strong>
                  </div>
                  <em>{ct.description ?? ''}</em>
                </Table.Cell>
              </Table.Row>

              {Array.isArray(ct.fields) && ct.fields.length > 0 ? (
                ct.fields.map((f: any) => (
                  <Table.Row key={`${ct.id}-${f.id}`}>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>{f.name}</Table.Cell>
                    <Table.Cell>{f.id}</Table.Cell>
                    <Table.Cell>{getFieldType(f)}</Table.Cell>
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
