# Schema Source

This folder contains the single source of truth for the Contentful content model, defined in TypeScript.

## Structure

Each `.ts` file corresponds to a content type:

```typescript
export const modelName = {
  schema: {
    model: {
      id: 'modelName',
      name: 'Display Name',
      description: 'Description',
      fields: [
        {
          id: 'fieldId'
          // etc
        }
      ]
    }
  },
  editorInterface: {
    // Editor Interface — how fields appear in the editor (help text, appearance, widget, aspect ratio, etc)
    fieldId: {
      helpText: 'Help text',
      widget: 'radio'
    }
  },
  app: {
    sidebar: {
      // To be read by the Contentful App (contentful-app)
    }
  }
}
```
