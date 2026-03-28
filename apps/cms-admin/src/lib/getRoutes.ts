import fs from 'fs'
import path from 'path'
import { navAndFlowSteps } from '@/utils/constants'

// File to make the sidebar navigation dynamically.

type RouteNode = {
  name: string
  path: string
  number?: string
  children?: RouteNode[]
}

// Convert kebab-case slug to Title Case
function slugToTitle(slug: string): string {
  if (slug.startsWith('[') && slug.endsWith(']')) {
    return slug.slice(1, -1).toUpperCase()
  }
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Extract number from numberedLabel (e.g., "1.1 IMPORT from Contentful" -> "1.1")
function extractNumberFromLabel(label: string): string {
  const match = label.match(/^(\d+(?:\.\d+)?)\s/)
  return match ? match[1] : ''
}

// Get number from constants by path
function getNumberFromConstants(routePath: string): string | undefined {
  const pathParts = routePath.split('/').filter(Boolean)
  if (pathParts.length === 0) return undefined

  const firstLevel = pathParts[0]
  const secondLevel = pathParts[1]

  // Try to find in constants
  const config = Object.values(navAndFlowSteps).find((flow: any) => flow.path === `/${firstLevel}`)
  if (!config) return undefined

  if (!secondLevel) {
    // Main level - extract from numberedLabel
    return extractNumberFromLabel((config as any).numberedLabel)
  }

  // Sub-level - find in steps
  const step = (config as any).steps?.find((s: any) => s.path === routePath)
  if (step) {
    return extractNumberFromLabel(step.numberedLabel)
  }

  return undefined
}

// Define order priority for main routes
const routeOrder: Record<string, number> = {
  'to-repo': 1,
  'to-contentful': 2,
  actions: 3,
  logs: 4,
  models: 5
}

// Define order for sub-routes (based on constants.ts)
const subRouteOrder: Record<string, Record<string, number>> = {
  'to-repo': {
    import: 1,
    split: 2,
    create: 3
  },
  'to-contentful': {
    source: 1,
    stringify: 2,
    typify: 3,
    join: 4,
    migrate: 5
  },
  actions: {
    view: 1,
    compare: 2,
    delete: 3
  },
  logs: {
    omitted: 1,
    deleted: 2,
    dev: 3,
    master: 4
  }
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
        name: slugToTitle(folderName),
        path: routePath,
        children: children.length > 0 ? children : undefined
      })
    }
  }

  // Sort routes by priority
  routes.sort((a, b) => {
    // Get parent folder name from current level
    const currentFolder = basePath.split('/').filter(Boolean)[0] || ''

    // Get order config for current level
    const orderConfig = subRouteOrder[currentFolder] || {}

    // Get priorities
    const aPriority =
      orderConfig[a.path.split('/').pop()] ?? routeOrder[a.path.split('/')[1]] ?? 999
    const bPriority =
      orderConfig[b.path.split('/').pop()] ?? routeOrder[b.path.split('/')[1]] ?? 999

    return aPriority - bPriority
  })

  // Add numbering to routes from constants
  routes.forEach((route) => {
    const number = getNumberFromConstants(route.path)
    if (number) {
      route.number = number
    }

    // Add numbering to children from constants
    if (route.children) {
      route.children.forEach((child) => {
        const childNumber = getNumberFromConstants(child.path)
        if (childNumber) {
          child.number = childNumber
        }
      })
    }
  })

  return routes
}

export default readRoutes
