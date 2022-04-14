import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { baseApiUrl, baseUrl } from "../../consts";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { token } = req.cookies;
  if (!token) return NextResponse.redirect(`${baseUrl}auth/sign-in`, 301);
  const currUserRes = await fetch(`${baseApiUrl}api/auth/current-user`, {
    headers: { Authorization: token },
  });
  const currentUser = await currUserRes.json();

  if (!currentUser.data)
    return NextResponse.redirect(`${baseUrl}auth/sign-in`, 301);

  if (!currentUser.data.Verified)
    return NextResponse.redirect(`${baseUrl}auth/verify-email`, 301);

  const validUrl = `/dashboard/${(
    currentUser.data.Role as string
  ).toLowerCase()}`;
  const url = req.page.name;
  // console.log(validUrl, url, validUrl == url);
  if (validUrl != url)
    return NextResponse.redirect(`${baseUrl}auth/sign-in`, 301);

  return NextResponse.next();
}
