import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  const { username, password } = await request
    .json()
    .catch(() => ({ username: "", password: "" }));

  const expectedUser = process.env.ADMIN_USER;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUser || !expectedHash) {
    return NextResponse.json(
      {
        error:
          "Admin credentials are not configured. Set ADMIN_USER and ADMIN_PASSWORD_HASH in .env.local.",
      },
      { status: 500 }
    );
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username !== expectedUser
  ) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const ok = await bcrypt.compare(password, expectedHash);
  if (!ok) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const session = await getSession();
  session.isAdmin = true;
  session.username = username;
  await session.save();

  return NextResponse.json({ ok: true });
}
