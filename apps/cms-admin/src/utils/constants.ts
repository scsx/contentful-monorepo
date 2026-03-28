export const navAndFlowSteps = {
  toRepo: {
    numberedLabel: '1. To Repo',
    simpleLabel: 'To Repo',
    path: '/to-repo',
    steps: [
      {
        numberedLabel: '1.1 IMPORT from Contentful',
        simpleLabel: 'IMPORT from Contentful',
        path: '/to-repo/import',
        step: 0
      },
      {
        numberedLabel: '1.2 SPLIT full .json into files',
        simpleLabel: 'SPLIT full .json into files',
        path: '/to-repo/split',
        step: 1
      },
      {
        numberedLabel: '1.3 CREATE .ts files',
        simpleLabel: 'CREATE .ts files (manually, for now)',
        path: '/to-repo/create',
        step: 2
      }
    ]
  },

  fromRepo: {
    numberedLabel: '2. To Contentful',
    simpleLabel: 'To Contentful',
    path: '/to-contentful',
    steps: [
      {
        numberedLabel: '2.1 SOURCE (.ts files)',
        simpleLabel: 'SOURCE (*.ts files)',
        path: '/to-contentful/source',
        step: 0
      },
      {
        numberedLabel: '2.2 STRINGIFY (.json files)',
        simpleLabel: 'STRINGIFY (*.ts to *.json)',
        path: '/to-contentful/stringify',
        step: 1
      },
      {
        numberedLabel: '2.3 TYPIFY (TS types)',
        simpleLabel: 'TYPIFY (*.json to types.ts)',
        path: '/to-contentful/typify',
        step: 2
      },
      {
        numberedLabel: '2.4 JOIN to schema.json',
        simpleLabel: 'JOIN (*.json to schema.json)',
        path: '/to-contentful/join',
        step: 3
      },
      {
        numberedLabel: '2.5 MIGRATE (schema.json)',
        simpleLabel: 'MIGRATE (schema.json)',
        path: '/to-contentful/migrate',
        step: 4
      }
    ]
  },

  actions: {
    numberedLabel: '3. ACTIONS',
    simpleLabel: 'ACTIONS',
    path: '/actions',
    steps: [
      { numberedLabel: '3.1 VIEW schema', simpleLabel: 'VIEW schema', path: '/actions/view' },
      {
        numberedLabel: '3.2 COMPARE schema',
        simpleLabel: 'COMPARE schema',
        path: '/actions/compare'
      },
      { numberedLabel: '3.3 DELETE', simpleLabel: 'DELETE', path: '/actions/delete' }
    ]
  },

  logs: {
    numberedLabel: '4. LOGS',
    simpleLabel: 'LOGS',
    path: '/logs',
    steps: [
      { numberedLabel: '4.1 OMITTED', simpleLabel: 'OMITTED', path: '/logs/omitted' },
      { numberedLabel: '4.2 DELETED', simpleLabel: 'DELETED', path: '/logs/deleted' },
      { numberedLabel: '4.3 TO DEV', simpleLabel: 'TO DEV', path: '/logs/dev' },
      { numberedLabel: '4.4 TO MASTER', simpleLabel: 'TO MASTER', path: '/logs/master' }
    ]
  }
}
