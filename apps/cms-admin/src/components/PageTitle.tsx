type PageTitleProps = {
  title: string
}

export default function PageTitle({ title }: PageTitleProps) {
  return <h2 className="pagetitle">{title}</h2>
}
