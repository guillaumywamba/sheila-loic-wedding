import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import {
  addRsvpSubmission,
  getRsvpSubmissions,
} from "@/lib/content-storage";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    fullName?: string;
    email?: string;
    phone?: string;
    attendance?: "present" | "absent";
    message?: string;
  };

  const fullName = body.fullName?.trim();
  const email = body.email?.trim();
  const attendance = body.attendance;

  if (!fullName || !email || !attendance) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants" },
      { status: 400 },
    );
  }

  const entry = await addRsvpSubmission({
    fullName,
    email,
    phone: body.phone?.trim(),
    attendance,
    message: body.message?.trim(),
  });

  return NextResponse.json({ ok: true, id: entry.id });
}

export async function GET() {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const list = await getRsvpSubmissions();
  return NextResponse.json(list);
}
