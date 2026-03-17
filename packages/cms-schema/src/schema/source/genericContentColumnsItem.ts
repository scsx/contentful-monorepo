import { FieldType } from '../source-types/field-types'

export const genericContentColumnsItem = {
  schema: {
    model: {
      id: 'genericContentColumnsItem',
      name: 'Generic Content Columns Item',
      description: 'Sub-block',
      fields: [
        {
          id: 'image',
          name: 'Image',
          type: FieldType.LINK,
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          linkType: 'Asset'
        },
        {
          id: 'text',
          name: 'Text',
          type: FieldType.RICH_TEXT,
          localized: false,
          required: true,
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
