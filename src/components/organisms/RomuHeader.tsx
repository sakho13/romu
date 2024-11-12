"use client"

import { joinClassName } from "@/services/functions/joinClassName"
import { firebaseClient } from "@/utils/firebaseClient"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
  type: "before-signed-in" | "signed-in"
}

export function RomuHeader({ type }: Props) {
  const router = useRouter()
  const logout = async () => {
    await firebaseClient.auth.signOut()
    router.replace("/")
  }

  return (
    <div id='header' className='navbar border-b px-16'>
      <div className='navbar-start'>
        <a
          className='btn btn-ghost text-xl'
          href={type === "before-signed-in" ? "/" : "/romu"}
        >
          RoMu
        </a>
      </div>

      {type === "before-signed-in" ? (
        <Link className='navbar-end ' href={"/sign-in"}>
          GoToUse
        </Link>
      ) : (
        <div className='navbar-end'>
          <div className='dropdown dropdown-end'>
            <div tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <span
                className={joinClassName(
                  "i-fa-user-circle",
                  "w-[30px] h-[30px]",
                )}
              />
            </div>

            <ul
              tabIndex={0}
              className={joinClassName(
                "menu menu-sm dropdown-content",
                "shadow-sm",
                "bg-base-100 rounded-box z-[1] mt-3 w-52 p-2",
              )}
            >
              <li>
                <Link href={"/romu/profile"}>プロフィール</Link>
              </li>
              <li>
                <a onClick={logout}>ログアウト</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
