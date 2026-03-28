export const navAndFlowSteps = {
  toRepo: [
    { label: 'SOURCE (.ts files)', path: '/source' },
    { label: 'GENERATE .json files', path: '/generate' },
    { label: 'GENERATE TS types (from .json files)', path: '/types' },
    { label: 'JOIN to schema.json', path: '/join' },
    { label: 'MIGRATE (schema.json)', path: '/migrate' },
  ],
  fromRepo: [
    { label: 'IMPORT from Contentful', path: '/import' },
    { label: 'SPLIT full .json into files', path: '/split' },
    { label: 'CREATE .ts files', path: '/create' }
  ],
  logs: [
    { label: 'Logs', path: '/logs' },
    { label: 'Deleted', path: '/logs/deleted' },
    { label: 'Omitted', path: '/logs/omitted' },
  ]
}