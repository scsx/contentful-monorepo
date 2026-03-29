'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type RouteNode = {
  name: string
  path: string
  number?: string
  children?: RouteNode[]
}

type Props = {
  routes: RouteNode[]
}

const RenderRoutes = ({ routes }: { routes: RouteNode[] }) => {
  const pathname = usePathname()

  return (
    <ul>
      {routes.map((route) => {
        // Exact match OR direct child only (not grandchildren)
        const isDirectChild =
          pathname.startsWith(route.path + '/') &&
          !pathname.slice(route.path.length + 1).includes('/')
        const isActive = pathname === route.path || isDirectChild

        return (
          <li key={route.path}>
            <Link href={route.path} className={isActive ? 'bg-yellow' : ''}>
              {route.number && <span className='font-semibold mr-2'>{route.number}</span>}
              {route.name}
            </Link>

            {route.children && route.children.length > 0 && (
              <RenderRoutes routes={route.children} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

const Sidebar = ({ routes }: Props) => {
  return (
    <aside className='navsidebar'>
      <div className='nav'>
        <RenderRoutes routes={routes} />
      </div>
    </aside>
  )
}

export default Sidebar
