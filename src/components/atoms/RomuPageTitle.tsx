type Props = {
  title: string
}

export function RomuPageTitle({ title }: Props) {
  return (
    <h1 className='text-4xl font-bold mt-2 mb-4 select-none border-b pb-2 px-4'>
      {title}
    </h1>
  )
}
