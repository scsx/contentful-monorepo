import Link from 'next/link'

type RouteNode = {
  name: string
  path: string
  children?: RouteNode[]
}

type Props = {
  routes: RouteNode[]
}

const RenderRoutes = ({ routes }: { routes: RouteNode[] }) => {
  return (
    <ul>
      {routes.map((route) => (
        <li key={route.path}>
          <Link href={route.path}>{route.name}</Link>

          {route.children && route.children.length > 0 && <RenderRoutes routes={route.children} />}
        </li>
      ))}
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
