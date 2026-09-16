import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "gourab_society_admin";
const ADMIN_LOGIN_PATH = "/admin/login";
const PUBLIC_ADMIN_API_PATHS = ["/api/admin/login", "/api/admin/setup"];
const PRIVATE_PAGE_PATHS = ["/setup-admin"];

const secret = process.env.AUTH_SECRET;
const secretKey = secret ? new TextEncoder().encode(secret) : null;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isPublicAdminApi = PUBLIC_ADMIN_API_PATHS.includes(pathname);
  const isPrivatePage = PRIVATE_PAGE_PATHS.includes(pathname);

  if (!isAdminPage && !isAdminApi && !isPrivatePage) {
    return NextResponse.next();
  }

  const adminCookie = request.cookies.get(ADMIN_COOKIE)?.value;

  if (!adminCookie || !secretKey) {
    if (isAdminApi && !isPublicAdminApi) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    if (isAdminPage && pathname !== ADMIN_LOGIN_PATH) {
      const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
      return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();
    if (isPrivatePage) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    }
    return response;
  }

  try {
    const { payload } = await jwtVerify(adminCookie, secretKey);

    if (payload.role !== "admin" || !payload.sub) {
      throw new Error("Invalid admin token");
    }
  } catch {
    if (isAdminApi && !isPublicAdminApi) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    if (isAdminPage && pathname !== ADMIN_LOGIN_PATH) {
      const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/setup-admin"],
};
