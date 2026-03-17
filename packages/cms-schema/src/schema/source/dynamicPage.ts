import { FieldType } from '../source-types/field-types'

export const dynamicPage = {
  schema: {
    model: {
      id: 'dynamicPage',
      name: 'Dynamic Page',
      description: 'Page, consumes blocks',
      fields: [
        {
          id: 'blocks',
          name: 'Blocks',
          type: FieldType.ARRAY,
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          items: {
            type: FieldType.LINK,
            validations: [
              {
                linkContentType: ['blockWrapper']
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
          id: 'slug',
          name: 'Slug',
          type: FieldType.SYMBOL,
          localized: false,
          required: true,
          validations: [
            {
              unique: true
            },
            {
              regexp: {
                pattern: '^[a-z0-9-/]+$',
                flags: null
              }
            }
          ],
          disabled: false,
          omitted: false
        }
      ]
    }
  }
}
