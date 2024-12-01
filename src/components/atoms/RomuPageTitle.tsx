type Props = {
  title: string
}

export function RomuPageTitle({ title }: Props) {
  return <h1 className='text-4xl font-bold my-2 select-none'>{title}</h1>
}
