import { FieldType } from '../source-types/field-types'

export const blockWrapper = {
  schema: {
    model: {
      id: 'blockWrapper',
      name: 'Block',
      description: 'Block, consumes elements',
      fields: [
        {
          id: 'backgroundColour',
          name: 'Background Colour',
          type: FieldType.SYMBOL,
          localized: false,
          required: false,
          validations: [
            {
              in: ['none', 'white', 'primary', 'secondary', 'alternative', 'neutral']
            }
          ],
          defaultValue: {
            'en-US': 'white'
          },
          disabled: false,
          omitted: false
        },
        {
          id: 'backgroundImage',
          name: 'Background Image',
          type: FieldType.LINK,
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          linkType: 'Asset'
        },
        {
          id: 'centerVertically',
          name: 'Center vertically',
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
          id: 'content',
          name: 'Content',
          type: FieldType.LINK,
          localized: false,
          required: true,
          validations: [],
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
        },
        {
          id: 'paddingBottom',
          name: 'Padding Bottom',
          type: FieldType.SYMBOL,
          localized: false,
          required: false,
          validations: [
            {
              in: ['none', 'xs', 's', 'm', 'l', 'xl']
            }
          ],
          defaultValue: {
            'en-US': 'm'
          },
          disabled: false,
          omitted: false
        },
        {
          id: 'paddingTop',
          name: 'Padding Top',
          type: FieldType.SYMBOL,
          localized: false,
          required: false,
          validations: [
            {
              in: ['none', 'xs', 's', 'm', 'l', 'xl']
            }
          ],
          defaultValue: {
            'en-US': 'm'
          },
          disabled: false,
          omitted: false
        },
        {
          id: 'width',
          name: 'Width',
          type: FieldType.SYMBOL,
          localized: false,
          required: false,
          validations: [
            {
              in: ['1/3', '1/2', '2/3', 'Full']
            }
          ],
          defaultValue: {
            'en-US': 'Full'
          },
          disabled: false,
          omitted: false
        }
      ]
    }
  }
}
