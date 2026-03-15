import { Table } from '@contentful/f36-components'

type Mapping = {
  contentful: string
  typescript: string
}

const mappings: Mapping[] = [
  { contentful: 'Symbol', typescript: 'string' },
  { contentful: 'Text', typescript: 'string (long)' },
  { contentful: 'RichText', typescript: 'Document (JSON structure)' },
  { contentful: 'Integer', typescript: 'number' },
  { contentful: 'Number', typescript: 'number' },
  { contentful: 'Boolean', typescript: 'boolean' },
  { contentful: 'Date', typescript: 'string (ISO date)' },
  { contentful: 'Link', typescript: 'Entry | Asset' },
  { contentful: 'Array', typescript: 'T[]' }
]

export default function ContentfulTypeMapping() {
  return (
    <div>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Type</Table.Cell>
            <Table.Cell>TypeScript</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {mappings.map((item) => (
            <Table.Row key={item.contentful}>
              <Table.Cell>{item.contentful}</Table.Cell>
              <Table.Cell>
                <p className='lh-1'>{item.typescript}</p>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
