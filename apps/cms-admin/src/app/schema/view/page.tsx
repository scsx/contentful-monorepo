'use client'

import { contentTypes } from '@repo/cms-schema'
import PageTitle from '@/components/PageTitle'
import React from 'react'
import { Table } from '@contentful/f36-components'
import { XIcon, CheckIcon } from '@contentful/f36-icons'
import ContentfulTypeMapping from '@/components/ContentfulTypeMapping'

export default function SchemaViewPage() {
  const getFieldType = (f: any) => {
    if (f.items) {
      if (f.items.validations) {
        const linkContentType = f.items.validations.find(
          (v: any) => v.linkContentType
        )?.linkContentType
        if (linkContentType && linkContentType.length > 0) {
          return (
            <span>
              Array of{' '}
              <code>
                <strong className='text-blue'>{linkContentType.join(', ')}</strong>
              </code>
            </span>
          )
        }
      }
      return `Array (${f.items.type})`
    } else if (f.validations) {
      const linkContentType = f.validations.find((v: any) => v.linkContentType)?.linkContentType
      if (linkContentType && linkContentType.length > 0) {
        return (
          <span>
            Link to{' '}
            <code>
              <strong className='text-blue'>{linkContentType.join(', ')}</strong>
            </code>
          </span>
        )
      }
    }
    return f.type
  }

  return (
    <div>
      <PageTitle
        title='Schema View'
        subtitle='Reading from packages\cms-schema\src\schema\full\schema.json'
      />

      <div className='flex space-x-8'>
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
                    <strong className='text-xl font-bold text-blue'>
                      <pre>{ct.id}</pre>
                    </strong>
                    <p className='text-base'>{ct.name}</p>
                    <em>{ct.description ?? ''}</em>
                  </Table.Cell>
                </Table.Row>

                {Array.isArray(ct.fields) && ct.fields.length > 0 ? (
                  ct.fields.map((f: any) => (
                    <Table.Row key={`${ct.id}-${f.id}`}>
                      <Table.Cell></Table.Cell>
                      <Table.Cell>
                        <strong>{f.name}</strong>
                      </Table.Cell>
                      <Table.Cell>{f.id}</Table.Cell>
                      <Table.Cell>{getFieldType(f)}</Table.Cell>
                      <Table.Cell>{f.required ? <CheckIcon /> : <XIcon />}</Table.Cell>
                      <Table.Cell>{f.localized ? <CheckIcon /> : <XIcon />}</Table.Cell>
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
        <ContentfulTypeMapping />
      </div>
    </div>
  )
}
