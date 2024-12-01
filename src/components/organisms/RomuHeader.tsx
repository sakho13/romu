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
    <div id='header' className='navbar border-b lg:px-16'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <Link href={"/romu"}>Home</Link>
            </li>
            <li>
              <Link href={"/romu/workouts"}>Workout</Link>
            </li>
            <li>
              <Link href={"/romu/analyze"}>Analyze</Link>
            </li>
          </ul>
        </div>

        <a
          className='btn btn-ghost text-xl'
          href={type === "before-signed-in" ? "/" : "/romu"}
        >
          RoMu
        </a>
      </div>

      {type === "before-signed-in" ? null : (
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal'>
            <li>
              <Link href={"/romu"}>Home</Link>
            </li>
            <li>
              <Link href={"/romu/workouts"}>Workout</Link>
            </li>
            <li>
              <Link href={"/romu/analyze"}>Analyze</Link>
            </li>
          </ul>
        </div>
      )}

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
