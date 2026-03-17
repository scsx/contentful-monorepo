import { FieldType } from '../source-types/field-types'

export const largeHero = {
  schema: {
    model: {
      id: 'largeHero',
      name: 'Large Hero',
      description: 'Block',
      fields: [
        {
          id: 'content',
          name: 'Content',
          type: FieldType.LINK,
          localized: false,
          required: false,
          validations: [
            {
              linkContentType: ['titleAndText']
            }
          ],
          disabled: false,
          omitted: false,
          linkType: 'Entry'
        },
        {
          id: 'name',
          name: 'Name',
          type: FieldType.SYMBOL,
          localized: false,
          required: true,
          validations: [],
          disabled: false,
          omitted: false
        }
      ]
    }
  }
}
