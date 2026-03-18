import { FieldType, LinkType } from '../source-types/field-types'

export const ctaGroup = {
  schema: {
    model: {
      id: 'ctaGroup',
      name: 'CTA Group',
      description: 'Block',
      fields: [
        {
          id: 'alignment',
          name: 'Alignment',
          type: FieldType.SYMBOL,
          localized: false,
          required: false,
          validations: [
            {
              in: ['left', 'center', 'right', 'full']
            }
          ],
          defaultValue: { 'en-US': 'center' },
          disabled: false,
          omitted: false
        },
        {
          id: 'items',
          name: 'items',
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
                linkContentType: ['cta'] // referência ao modelo cta
              }
            ],
            linkType: LinkType.ENTRY
          }
        },
        {
          id: 'titleAndSubtitle',
          name: 'Title and Subtitle',
          type: FieldType.LINK,
          localized: false,
          required: false,
          validations: [
            {
              linkContentType: ['titleAndText'] // referência ao modelo titleAndText
            }
          ],
          disabled: false,
          omitted: false,
          linkType: LinkType.ENTRY
        }
      ]
    }
  },
  app: {
    sidebar: {
      html: '<div>Group of CTA elements</div>'
    }
  }
}
