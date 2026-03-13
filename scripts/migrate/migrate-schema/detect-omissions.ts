export function detectOmissions(repoSchema: any, existingContentTypes: any) {
  const existingMap = new Map<string, any>(
    existingContentTypes.items.map((ct: any) => [ct.sys.id, ct])
  )

  const omissions: string[] = []
  const contentTypesToOmit: string[] = []

  // Detect field omissions
  for (const repoCT of repoSchema.contentTypes) {
    const existing: any = existingMap.get(repoCT.id)
    if (!existing) continue

    const repoFieldIds = new Set(repoCT.fields.map((f: any) => f.id))

    for (const existingField of existing.fields) {
      if (!repoFieldIds.has(existingField.id) && !existingField.omitted) {
        omissions.push(`${repoCT.id}.${existingField.id}`)
      }
    }
  }

  // Detect content types to omit
  const repoContentTypeIds = new Set(repoSchema.contentTypes.map((ct: any) => ct.id))

  for (const existingCT of existingContentTypes.items) {
    if (!repoContentTypeIds.has(existingCT.sys.id)) {
      contentTypesToOmit.push(existingCT.sys.id)
    }
  }

  return {
    omissions,
    contentTypesToOmit,
    existingMap
  }
}
