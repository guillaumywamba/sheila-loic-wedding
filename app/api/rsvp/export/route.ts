import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { requireAdminSession } from "@/lib/auth";
import { getRsvpSubmissions } from "@/lib/content-storage";

export async function GET() {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const list = await getRsvpSubmissions();
  const rows = list.map((r) => ({
    Date: new Date(r.createdAt).toLocaleString("fr-FR"),
    Nom: r.fullName,
    Téléphone: r.phone,
    Présence: r.attendance === "present" ? "Présent(e)" : "Absent(e)",
    Message: r.message ?? "",
  }));

  const sheet = XLSX.utils.json_to_sheet(rows);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "Invités");
  const buffer = XLSX.write(book, { type: "buffer", bookType: "xlsx" }) as Buffer;

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="rsvp-invites-sheila-loic.xlsx"',
    },
  });
}
