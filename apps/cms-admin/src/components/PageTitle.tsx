type PageTitleProps = {
  title: string
  subtitle?: string
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className='pagetitle mb-4'>
      <h2>{title}</h2>
      {subtitle && <p className='font-bold text-blue-darker'>{subtitle}</p>}
    </div>
  )
}
