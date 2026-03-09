type PageTitleProps = {
  title: string
  subtitle?: string
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className='pagetitle'>
      <h2 className=''>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
