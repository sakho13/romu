import { NextResponse } from "next/server"

export const dynamic = "force-static"

export function GET() {
  return NextResponse.json({ status: "OK" }, { status: 200 })
}
