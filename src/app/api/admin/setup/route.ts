import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { name, email, password, setupToken } = await request.json();

    if (
      !name ||
      !email ||
      !password ||
      !setupToken ||
      password.length < 12
    ) {
      return NextResponse.json(
        { message: "Use a valid name, email, and a password of at least 12 characters." },
        { status: 400 },
      );
    }

    if (setupToken !== process.env.ADMIN_SETUP_TOKEN) {
      return NextResponse.json(
        { message: "Invalid setup token." },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const existingAdmin = await User.exists({ role: "admin" });

    if (existingAdmin) {
      return NextResponse.json(
        { message: "An admin account already exists." },
        { status: 403 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      passwordHash,
      role: "admin",
    });

    return NextResponse.json({
      status: "ok",
      message: "Admin account created successfully.",
    });
  } catch {
    return NextResponse.json(
      { message: "Could not create the admin account." },
      { status: 500 },
    );
  }
}