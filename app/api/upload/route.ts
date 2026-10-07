import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { storeUploadedImage, validateImageFile } from "@/lib/upload-image";

export async function POST(request: Request) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Formulaire invalide" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  const validation = validateImageFile(file);
  if (validation) {
    return NextResponse.json({ error: validation }, { status: 400 });
  }

  try {
    const folder = (formData.get("folder") as string) || "gallery";
    const url = await storeUploadedImage(file, folder);
    return NextResponse.json({ url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Échec du téléversement";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
