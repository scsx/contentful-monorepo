export const navAndFlowSteps = {
  toRepo: {
    label: '1. TO REPO',
    path: '/to-repo',
    steps: [
      { label: '1.1 IMPORT from Contentful', path: '/to-repo/import', step: 0 },
      { label: '1.2 SPLIT full .json into files', path: '/to-repo/split', step: 1 },
      { label: '1.3 CREATE .ts files', path: '/to-repo/create', step: 2 }
    ]
  },

  fromRepo: {
    label: '2. TO CONTENTFUL',
    path: '/to-contentful',
    steps: [
      { label: '2.1 SOURCE (.ts files)', path: '/to-contentful/source', step: 0 },
      { label: '2.2 GENERATE (.json files)', path: '/to-contentful/generate-json', step: 1 },
      { label: '2.3 GENERATE (TS types)', path: '/to-contentful/generate-ts', step: 2 },
      { label: '2.4 JOIN to schema.json', path: '/to-contentful/join', step: 3 },
      { label: '2.5 MIGRATE (schema.json)', path: '/to-contentful/migrate', step: 4 }
    ]
  },

  actions: {
    label: '3. ACTIONS',
    path: '/actions',
    steps: [
      { label: '3.1 VIEW schema', path: '/actions/view' },
      { label: '3.2 COMPARE schema', path: '/actions/compare' },
      { label: '3.3 DELETE', path: '/actions/delete' }
    ]
  },

  logs: {
    label: '4. LOGS',
    path: '/logs',
    steps: [
      { label: '4.1 OMITTED', path: '/logs/omitted' },
      { label: '4.2 DELETED', path: '/logs/deleted' },
      { label: '4.3 TO DEV', path: '/logs/dev' },
      { label: '4.4 TO MASTER', path: '/logs/master' }
    ]
  }
}
