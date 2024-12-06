import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

export function GET(_req: NextApiRequest) {
  return NextResponse.json({ status: "OK" }, { status: 200 })
}
