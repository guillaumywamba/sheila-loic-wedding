import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content-storage";
import type { SiteContent } from "@/types/site";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let body: SiteContent;
  try {
    body = (await request.json()) as SiteContent;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  try {
    await saveSiteContent(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur d'enregistrement";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
