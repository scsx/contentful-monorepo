import { FieldType } from '../source-types/field-types'

export const genericContentColumns = {
  schema: {
    model: {
      id: 'genericContentColumns',
      name: 'Generic Content Columns',
      description: 'Block',
      fields: [
        {
          id: 'imagesHeight',
          name: 'Images Height',
          type: FieldType.SYMBOL,
          localized: false,
          required: false,
          validations: [
            {
              in: ['short', 'normal', 'tall']
            }
          ],
          defaultValue: {
            'en-US': 'normal'
          },
          disabled: false,
          omitted: false
        },
        {
          id: 'isCarousel',
          name: 'Is Carousel',
          type: FieldType.BOOLEAN,
          localized: false,
          required: false,
          validations: [],
          defaultValue: {
            'en-US': false
          },
          disabled: false,
          omitted: false
        },
        {
          id: 'isNumbered',
          name: 'Is Numbered',
          type: FieldType.BOOLEAN,
          localized: false,
          required: false,
          validations: [],
          defaultValue: {
            'en-US': false
          },
          disabled: false,
          omitted: false
        },
        {
          id: 'items',
          name: 'Items',
          type: FieldType.ARRAY,
          localized: false,
          required: true,
          validations: [
            {
              size: {
                min: 2,
                max: null
              }
            }
          ],
          disabled: false,
          omitted: false,
          items: {
            type: FieldType.LINK,
            validations: [
              {
                linkContentType: ['genericContentColumnsItem']
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
          id: 'subtitle',
          name: 'Subtitle',
          type: FieldType.SYMBOL,
          localized: false,
          required: false,
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
