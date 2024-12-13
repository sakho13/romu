import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function RomuBreadcrumbs() {
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<React.ReactNode[]>([])

  const romuLink = (label: string, href: string, key: string) => (
    <li key={`breadcrumbs-${key}`}>
      <Link href={href}>{label}</Link>
    </li>
  )

  const romuCurrent = (label: string, key: string) => (
    <li key={`breadcrumbs-${key}`} className='select-none'>
      {label}
    </li>
  )

  useEffect(() => {
    if (pathname === "/romu") {
      setBreadcrumbs([romuCurrent("Home", "home")])
    }
    if (pathname === "/romu/workouts") {
      setBreadcrumbs([
        romuLink("Home", "/romu", "home"),
        romuCurrent("Workouts", "workouts"),
      ])
    }
    if (pathname === "/romu/profile") {
      setBreadcrumbs([
        romuLink("Home", "/romu", "home"),
        romuCurrent("Profile", "profile"),
      ])
    }
  }, [pathname])

  return (
    <div className='breadcrumbs text-sm'>
      <ul>{breadcrumbs.map((breadcrumb) => breadcrumb)}</ul>
    </div>
  )
}
