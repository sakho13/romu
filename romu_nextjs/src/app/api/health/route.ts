import { NextRequest, NextResponse } from "next/server"

export function GET(_req: NextRequest) {
  return NextResponse.json({ status: "OK" }, { status: 200 })
}
