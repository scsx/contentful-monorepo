import { FieldType } from '../source-types/field-types'

export const timeline = {
  schema: {
    model: {
      id: 'timeline',
      name: 'Timeline',
      description: 'Block',
      fields: [
        {
          id: 'color',
          name: 'Color',
          type: FieldType.BOOLEAN,
          localized: false,
          required: false,
          validations: [],
          defaultValue: {
            'en-US': true
          },
          disabled: false,
          omitted: false
        },
        {
          id: 'direction',
          name: 'Direction',
          type: FieldType.BOOLEAN,
          localized: false,
          required: false,
          validations: [],
          defaultValue: {
            'en-US': true
          },
          disabled: false,
          omitted: false
        },
        {
          id: 'items',
          name: 'Items',
          type: FieldType.OBJECT,
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false
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
          id: 'timeline',
          name: 'Timeline',
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
