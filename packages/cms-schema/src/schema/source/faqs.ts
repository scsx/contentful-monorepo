import { FieldType } from '../source-types/field-types'

export const faqs = {
  schema: {
    model: {
      id: 'faqs',
      name: 'FAQs',
      description: 'Block',
      fields: [
        {
          id: 'items',
          name: 'Items',
          type: FieldType.ARRAY,
          localized: false,
          required: true,
          validations: [],
          disabled: false,
          omitted: false,
          items: {
            type: FieldType.LINK,
            validations: [
              {
                linkContentType: ['titleAndText']
              }
            ],
            linkType: 'Entry'
          }
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
        },
        {
          id: 'title',
          name: 'Title',
          type: FieldType.SYMBOL,
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false
        }
      ]
    }
  }
}
