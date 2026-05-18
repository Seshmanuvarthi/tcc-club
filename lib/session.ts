import { cookies } from "next/headers";
import { getIronSession, SessionOptions } from "iron-session";

export type SessionData = {
  isAdmin?: boolean;
  username?: string;
};

const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "change-me-change-me-change-me-change-me-32-chars",
  cookieName: "tcc_session",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session.isAdmin) {
    return null;
  }
  return session;
}
