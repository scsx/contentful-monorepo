'use client'

import React from 'react'
import { Table } from '@contentful/f36-components'
import { XIcon, CheckIcon } from '@contentful/f36-icons'
import ContentfulTypeMapping from '@/components/ContentfulTypeMapping'

type Props = {
  contentTypes: any[]
}

const SchemaViewTable = ({ contentTypes }: Props) => {
  const getFieldType = (f: any) => {
    if (f.items) {
      if (f.items.validations) {
        const linkContentType = f.items.validations.find(
          (v: any) => v.linkContentType
        )?.linkContentType
        if (linkContentType && linkContentType.length > 0) {
          return (
            <span>
              Array of <code className='modelname'>{linkContentType.join(', ')}</code>
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
            Link to <code className='modelname'>{linkContentType.join(', ')}</code>
          </span>
        )
      }
    }
    return f.type
  }

  return (
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
                    <code className='modelname text-xl'>{ct.id}</code>
                  <p className='text-base mt-2'>
                    <strong>{ct.name}</strong>
                  </p>
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
  )
}

export default SchemaViewTable
