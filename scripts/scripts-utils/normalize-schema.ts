/**
 * Normalizes a Contentful schema into a canonical, deterministic structure.
 *
 * - Sorts content types and fields by id
 * - Sorts validation rules and enum ("in") arrays
 * - Normalizes boolean flags and removes ordering noise
 *
 * This ensures stable output across environments and executions,
 * making Git diffs predictable, enabling reliable drift detection,
 * and allowing accurate schema comparisons and hashing.
 */

export function normalizeSchema(schema: any) {
  if (!schema) return schema

  const normalizeContentType = (ct: any) => {
    const normalizedFields = Array.isArray(ct.fields)
      ? [...ct.fields]
          .map((field) => normalizeField(field))
          .sort((a, b) => a.id.localeCompare(b.id))
      : []

    return {
      id: ct.id,
      name: ct.name,
      description: ct.description ?? null,
      fields: normalizedFields
    }
  }

  const normalizeField = (field: any) => {
    const normalizedValidations = Array.isArray(field.validations)
      ? [...field.validations]
          .map((v) => normalizeValidation(v))
          .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
      : []

    return {
      id: field.id,
      name: field.name,
      type: field.type,
      localized: !!field.localized,
      required: !!field.required,
      disabled: !!field.disabled,
      omitted: !!field.omitted,
      validations: normalizedValidations
    }
  }

  const normalizeValidation = (validation: any) => {
    if (validation?.in && Array.isArray(validation.in)) {
      return {
        ...validation,
        in: [...validation.in].sort()
      }
    }

    return validation
  }

  const normalizedContentTypes = Array.isArray(schema.contentTypes)
    ? [...schema.contentTypes]
        .map((ct) => normalizeContentType(ct))
        .sort((a, b) => a.id.localeCompare(b.id))
    : []

  return {
    schemaVersion: schema.schemaVersion ?? null,
    contentTypes: normalizedContentTypes
  }
}
