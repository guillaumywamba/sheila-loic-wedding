import { put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

const MAX_BYTES = 12 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
]);

function blobTokenOption() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  return token ? { token } : {};
}

export function validateImageFile(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const extOk = ["jpg", "jpeg", "png", "webp", "gif", "heic", "heif"].includes(
    ext,
  );
  if (
    !file.type.startsWith("image/") &&
    !ALLOWED.has(file.type) &&
    !extOk
  ) {
    return "Format non supporté. Utilisez JPEG, PNG ou WebP.";
  }
  if (file.size > MAX_BYTES) {
    return "Image trop volumineuse (max 12 Mo).";
  }
  return null;
}

export async function storeUploadedImage(
  file: File,
  folder = "gallery",
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const safeBase = file.name.replace(/[^a-zA-Z0-9.-]/g, "_") || "photo.jpg";
  const pathname = `${folder}/${Date.now()}-${safeBase}`;

  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL === "1") {
    const blob = await put(pathname, buffer, {
      access: "public",
      contentType: file.type || "image/jpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
      ...blobTokenOption(),
    });
    return blob.url;
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadsDir, { recursive: true });
  const filename = `${Date.now()}-${safeBase}`;
  await fs.writeFile(path.join(uploadsDir, filename), buffer);
  return `/uploads/${folder}/${filename}`;
}
