export default function Home() {
  return (
    <div>
      <h1 className='pt-8 text-blue'>Stats</h1>
      <ul className='pl-6 pt-4'>
        <li>Total content types: 74</li>
        <li>Total fields: 412</li>
        <li>Environments: dev, preprod, master</li>
        <li>Last schema sync: 2026-03-12 22:55</li>
      </ul>

      <h1 className='pt-8 text-blue-darker'>Warnings</h1>
      <ul className='pl-6 pt-4'>
        <li>2 fields omitted from API response</li>
        <li>1 content type differs between repo and dev</li>
        <li>Unpublished change detected in preprod</li>
      </ul>

      <h1 className='pt-8 text-success'>Last operations</h1>
      <ul className='pl-6 pt-4'>
        <li>2026-03-12 — repo → dev migration (success)</li>
        <li>2026-03-10 — dev → preprod promotion (success)</li>
        <li>2026-03-09 — schema import from Contentful</li>
      </ul>
      <p className="pt-8">Dummy content, example</p>
    </div>
  )
}
