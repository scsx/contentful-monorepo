import { colors } from '@repo/utils'
import { FieldType } from '../source-types/field-types'
import { WidgetId } from '../source-types/widgets'

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
          // TODO: não é type color picker, é string, o color picker tem que ser definido na interface. Ver TODO em baixo.
          type: WidgetId.COLOR_PICKER,
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
          type: FieldType.SYMBOL,
          localized: false,
          required: true,
          validations: [],
          disabled: false,
          omitted: false
        },
        {
          id: 'ctaUrl',
          name: 'CTA url',
          type: FieldType.SYMBOL,
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
  // TODO: testar:
  /*
  interface: {
  ctaBgColour: {
    widget: 'app',
    widgetNamespace: 'my-app-id',
    settings: {
      widgetId: WidgetId.COLOR_PICKER
    }
  }
}
  */
  interface: {
    ctaBgColour: {
      widget: 'app',
      widgetNamespace: 'my-app-id'
    }
  },
  app: {
    sidebar: {
      html: '<div>CTA element (button)</div>'
    }
  }
}
