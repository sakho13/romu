import type { Metadata } from "next"
import { AuthProvider } from "@/components/organisms/AuthProvider"
import { StrictMode } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// })
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })

export const metadata: Metadata = {
  title: "RoMu",
  description: "RoMu - Memory Training App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja' data-theme='bumblebee' suppressHydrationWarning={true}>
      <body>
        <StrictMode>
          <AuthProvider>{children}</AuthProvider>

          <Toaster />
        </StrictMode>
      </body>
    </html>
  )
}
