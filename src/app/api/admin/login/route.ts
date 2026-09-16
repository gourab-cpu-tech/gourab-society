import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const user = await User.findOne({
      email: String(email).toLowerCase(),
      role: "admin",
    });

    const isValidPassword =
      user && (await bcrypt.compare(String(password), user.passwordHash));

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Incorrect email or password." },
        { status: 401 },
      );
    }

    const token = await createAdminToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({
      status: "ok",
      message: "Login successful.",
    });

    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Could not log in." },
      { status: 500 },
    );
  }
}