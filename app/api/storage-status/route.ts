import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { useGitHubStorage } from "@/lib/github-storage";

export async function GET() {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const github = useGitHubStorage();
  const blob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const redis = Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN,
  );
  const onVercel = process.env.VERCEL === "1";

  return NextResponse.json({
    github,
    blob,
    redis,
    onVercel,
    ready: github || blob || redis || !onVercel,
  });
}
