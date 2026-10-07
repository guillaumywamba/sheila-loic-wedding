import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import {
  addRsvpSubmission,
  getRsvpSubmissions,
} from "@/lib/content-storage";
import { normalizePhone, rsvpAlreadyExists } from "@/lib/rsvp-utils";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    fullName?: string;
    email?: string;
    phone?: string;
    attendance?: "present" | "absent";
    message?: string;
  };

  const fullName = body.fullName?.trim();
  const phone = body.phone?.trim();
  const attendance = body.attendance;

  if (!fullName || !phone || !attendance) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants" },
      { status: 400 },
    );
  }

  if (normalizePhone(phone).length < 6) {
    return NextResponse.json(
      { error: "Numéro de téléphone invalide" },
      { status: 400 },
    );
  }

  const existing = await getRsvpSubmissions();
  if (rsvpAlreadyExists(existing, fullName, phone)) {
    return NextResponse.json(
      {
        error:
          "Une réponse existe déjà avec ce nom et ce numéro de téléphone.",
      },
      { status: 409 },
    );
  }

  const entry = await addRsvpSubmission({
    fullName,
    phone,
    email: body.email?.trim() || undefined,
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
