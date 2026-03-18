/**
 * Available custom field widgets
 *
 * These widget IDs are referenced in the schema's `interface` section.
 * The app (contentful-app) must implement each widget listed here.
 *
 * Usage in schema:
 *   interface: {
 *     fieldId: {
 *       widgetId: WidgetId.COLOR_PICKER
 *     }
 *   }
 *
 * To add a new widget:
 * 1. Add the ID to this enum
 * 2. Implement the component in contentful-app
 * 3. Register it in FieldDispatcher
 */
export enum WidgetId {
  COLOR_PICKER = 'color-picker'
  // More...
}
