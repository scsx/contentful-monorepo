import { FieldType } from '../source-types/field-types'

export const breadcrumbs = {
  schema: {
    model: {
      id: 'breadcrumbs',
      name: 'Breadcrumbs',
      description: 'Block (Magic)',
      fields: [
        {
          id: 'name',
          name: 'Name',
          type: FieldType.SYMBOL,
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false
        },
        {
          id: 'style',
          name: 'Style',
          type: FieldType.SYMBOL,
          localized: false,
          required: false,
          validations: [
            {
              in: ['default', 'large']
            }
          ],
          disabled: false,
          omitted: false
        }
      ]
    }
  }
}
