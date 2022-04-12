import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { baseApiUrl, baseUrl } from "../../consts";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { token } = req.cookies;
  if (!token) return NextResponse.next();
  const currentUser = await (
    await fetch(`${baseApiUrl}api/auth/current-user`, {
      headers: { token },
    })
  ).json();
  if (currentUser.data)
    return NextResponse.redirect(
      `${baseUrl}dashboard/${(currentUser.data.role as string).toLowerCase()}`,
      301
    );
  return NextResponse.next();
}
