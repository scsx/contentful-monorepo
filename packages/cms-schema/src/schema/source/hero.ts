import { FieldType } from '../source-types/field-types'

export const hero = {
  schema: {
    model: {
      id: 'hero',
      name: 'Hero',
      description: 'Block',
      fields: [
        {
          id: 'backgroundImage',
          name: 'Background Image',
          type: FieldType.LINK,
          localized: false,
          required: true,
          validations: [],
          disabled: false,
          omitted: false,
          linkType: 'Asset'
        },
        {
          id: 'cta',
          name: 'CTA',
          type: FieldType.LINK,
          localized: false,
          required: false,
          validations: [
            {
              linkContentType: ['cta']
            }
          ],
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
          id: 'text',
          name: 'Text',
          type: FieldType.RICH_TEXT,
          localized: false,
          required: false,
          validations: [
            {
              enabledMarks: [
                'bold',
                'italic',
                'underline',
                'code',
                'superscript',
                'subscript',
                'strikethrough'
              ],
              message:
                'Only bold, italic, underline, code, superscript, subscript, and strikethrough marks are allowed'
            },
            {
              enabledNodeTypes: [
                'heading-1',
                'heading-2',
                'heading-3',
                'heading-4',
                'heading-5',
                'heading-6',
                'ordered-list',
                'unordered-list',
                'hr',
                'blockquote',
                'embedded-entry-block',
                'embedded-asset-block',
                'table',
                'asset-hyperlink',
                'embedded-entry-inline',
                'entry-hyperlink',
                'hyperlink'
              ],
              message:
                'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, Unordered list, horizontal rule, quote, block entry, asset, table, link to asset, inline entry, link to entry, and link to Url nodes are allowed'
            },
            {
              nodes: {}
            }
          ],
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
