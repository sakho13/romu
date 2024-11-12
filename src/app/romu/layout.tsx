"use client"

import { CenteringLayout } from "@/components/atoms/CenteringLayout"
import { LoadingIcon } from "@/components/atoms/LoadingIcon"
import { RomuHeader } from "@/components/organisms/RomuHeader"
import { useAuthStore } from "@/stores/useAuthStore"

type Props = Readonly<{
  children: React.ReactNode
}>

export default function RomuRootLayout({ children }: Props) {
  const { accessToken } = useAuthStore()
  return (
    <>
      <RomuHeader type={"signed-in"} />

      {accessToken ? (
        children
      ) : (
        <CenteringLayout>
          <LoadingIcon className='w-[100px] text-success my-32' />
        </CenteringLayout>
      )}
    </>
  )
}
