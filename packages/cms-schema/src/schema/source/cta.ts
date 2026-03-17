import { colors } from '@repo/utils'

export const cta = {
  schema: {
    model: {
      id: 'cta',
      name: 'CTA',
      description: 'Element (link)',
      fields: [
        {
          id: 'ctaBgColour',
          name: 'CTA Bg Colour',
          type: 'Symbol',
          localized: false,
          required: false,
          validations: [
            {
              in: Object.keys(colors)
            }
          ],
          disabled: false,
          omitted: false
        },
        {
          id: 'ctaText',
          name: 'CTA Text',
          type: 'Symbol',
          localized: false,
          required: true,
          validations: [],
          disabled: false,
          omitted: false
        },
        {
          id: 'ctaUrl',
          name: 'CTA url',
          type: 'Symbol',
          localized: false,
          required: true,
          validations: [
            {
              regexp: {
                pattern:
                  '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
                flags: null
              }
            }
          ],
          disabled: false,
          omitted: false
        }
      ]
    }
  },
  sidebar: {
    html: "<div class='cta-sidebar'>This is a CTA (button) element</div>"
  }
}
