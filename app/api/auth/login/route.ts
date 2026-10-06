import { NextResponse } from "next/server";
import {
  createSessionToken,
  setSessionCookie,
  verifyAdminLogin,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    username?: string;
    password?: string;
  };

  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";

  if (!username || !password) {
    return NextResponse.json(
      { error: "Identifiants requis" },
      { status: 400 },
    );
  }

  const valid = await verifyAdminLogin(username, password);
  if (!valid) {
    return NextResponse.json(
      { error: "Identifiants incorrects" },
      { status: 401 },
    );
  }

  const token = await createSessionToken(username);
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
