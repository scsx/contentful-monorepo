import fs from 'fs'
import path from 'path'

// File to make the sidebar navigation dynamically.

type RouteNode = {
  name: string
  path: string
  children?: RouteNode[]
}

function readRoutes(dir: string, basePath = ''): RouteNode[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  const routes: RouteNode[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const folderName = entry.name

    // ignore special folders and dynamic routes
    if (
      folderName.startsWith('_') ||
      folderName.startsWith('(') ||
      folderName === 'api' ||
      (folderName.startsWith('[') && folderName.endsWith(']'))
    ) {
      continue
    }

    const fullPath = path.join(dir, folderName)
    const routePath = `${basePath}/${folderName}`

    const hasPage = fs.existsSync(path.join(fullPath, 'page.tsx'))

    const children = readRoutes(fullPath, routePath)

    if (hasPage || children.length > 0) {
      routes.push({
        name: folderName,
        path: routePath,
        children: children.length > 0 ? children : undefined
      })
    }
  }

  return routes
}

export default readRoutes
