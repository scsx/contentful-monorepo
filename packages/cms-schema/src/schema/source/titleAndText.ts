import { FieldType } from '../source-types/field-types'

export const titleAndText = {
  schema: {
    model: {
      id: 'titleAndText',
      name: 'Title And Text',
      description: 'Sub-block - For FAQs, text blocks, etc',
      fields: [
        {
          id: 'text',
          name: 'Text',
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
          required: true,
          validations: [],
          disabled: false,
          omitted: false
        }
      ]
    }
  }
}
