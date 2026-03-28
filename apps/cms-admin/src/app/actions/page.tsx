import PageTitle from '@/components/PageTitle'
import Link from 'next/link'

export default function ActionsPage() {
  return (
    <div>
      <PageTitle title='Actions' subtitle='Utilities and schema management' />

      <div className='space-y-6'>
        <p>
          This section provides utility actions for viewing, comparing, and managing your schema
          across different environments.
        </p>

        <div className='space-y-4'>
          <h2>Available Actions:</h2>
          <ul className='space-y-3 pl-4'>
            <li>
              <Link href='/actions/view' className='text-blue-600 hover:underline'>
                View Schema
              </Link>
              {' - '} Schema structure and details for each model (content type), including{' '}
              <b>usages</b>.
            </li>
            <li>
              <Link href='/actions/compare' className='text-blue-600 hover:underline'>
                Compare Schema
              </Link>
              {' - '} Compare schemas across different environments
            </li>
            <li>
              <Link href='/actions/delete' className='text-blue-600 hover:underline'>
                Delete Content Types
              </Link>
              {' - '} Remove models from your schema
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
