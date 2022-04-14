import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { baseApiUrl, baseUrl } from "../../consts";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { token } = req.cookies;
  // console.log("T : ", token);
  if (!token) return NextResponse.next();
  const currentUser = await (
    await fetch(`${baseApiUrl}api/auth/current-user`, {
      headers: { Authorization: token },
    })
  ).json();
  console.log("Curr : ", currentUser);
  if (currentUser.data)
    return NextResponse.redirect(
      `${baseUrl}dashboard/${(currentUser.data.Role as string).toLowerCase()}`,
      301
    );
  return NextResponse.next();
}
