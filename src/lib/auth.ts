import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "gourab_society_admin";

const secret = process.env.AUTH_SECRET;

if (!secret) {
  throw new Error("AUTH_SECRET is missing.");
}

const secretKey = new TextEncoder().encode(secret);

type AdminPayload = {
  id: string;
  email: string;
  name: string;
};

export async function createAdminToken(admin: AdminPayload) {
  return new SignJWT({
    email: admin.email,
    name: admin.name,
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(admin.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);

    if (payload.role !== "admin" || !payload.sub) {
      return null;
    }

    return {
      id: payload.sub,
      email: String(payload.email ?? ""),
      name: String(payload.name ?? "Admin"),
    };
  } catch {
    return null;
  }
}