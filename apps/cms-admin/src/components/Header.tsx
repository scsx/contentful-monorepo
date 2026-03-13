import Link from 'next/link'

const Header = () => {
  return (
    <header className='mainheader bg-white'>
      <h1 className='text-blue lh-1'>
        <Link href='/'>contentful admin</Link>
      </h1>
    </header>
  )
}

export default Header
