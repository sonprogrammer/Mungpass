import { NextResponse } from "next/server";

export function redirectWithCookies(
  url: URL,
  res: NextResponse
) {
  const redirectRes = NextResponse.redirect(url)

  res.cookies.getAll().forEach((cookie) => {
    redirectRes.cookies.set(cookie)
  })

  return redirectRes
}