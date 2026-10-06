import { put, head } from "@vercel/blob";
import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";
import type { RsvpSubmission, SiteContent } from "@/types/site";
import { defaultSiteContent } from "@/lib/default-content";

const dataDir = path.join(process.cwd(), "data");
const contentPath = path.join(dataDir, "site-content.json");
const rsvpPath = path.join(dataDir, "rsvps.json");

const CONTENT_BLOB = "site-content.json";
const RSVP_BLOB = "rsvps.json";
const CONTENT_REDIS_KEY = "wedding:site-content";
const RSVP_REDIS_KEY = "wedding:rsvps";

function redisClient(): Redis | null {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return Redis.fromEnv();
  }
  return null;
}

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath: string, data: unknown): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function blobReadJson<T>(pathname: string, fallback: T): Promise<T> {
  try {
    const meta = await head(pathname, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const res = await fetch(meta.url);
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

async function blobWriteJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

export async function getSiteContent(): Promise<SiteContent> {
  const redis = redisClient();
  if (redis) {
    const stored = await redis.get<SiteContent>(CONTENT_REDIS_KEY);
    if (stored) return stored;
    await redis.set(CONTENT_REDIS_KEY, defaultSiteContent);
    return defaultSiteContent;
  }

  if (useBlob()) {
    try {
      const meta = await head(CONTENT_BLOB, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      const res = await fetch(meta.url);
      if (res.ok) return (await res.json()) as SiteContent;
    } catch {
      /* premier déploiement : initialiser le blob */
    }
    await blobWriteJson(CONTENT_BLOB, defaultSiteContent);
    return defaultSiteContent;
  }

  try {
    const raw = await fs.readFile(contentPath, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    try {
      await writeJsonFile(contentPath, defaultSiteContent);
    } catch {
      /* FS non writable (ex. Vercel) — contenu par défaut en lecture seule */
    }
    return defaultSiteContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const redis = redisClient();
  if (redis) {
    await redis.set(CONTENT_REDIS_KEY, content);
    return;
  }

  if (useBlob()) {
    await blobWriteJson(CONTENT_BLOB, content);
    return;
  }

  try {
    await writeJsonFile(contentPath, content);
  } catch {
    throw new Error(
      "STORAGE_UNAVAILABLE: configurez Upstash Redis ou Vercel Blob en production.",
    );
  }
}

export async function getRsvpSubmissions(): Promise<RsvpSubmission[]> {
  const redis = redisClient();
  if (redis) {
    const list = await redis.get<RsvpSubmission[]>(RSVP_REDIS_KEY);
    return list ?? [];
  }

  if (useBlob()) {
    return blobReadJson(RSVP_BLOB, []);
  }

  return readJsonFile(rsvpPath, []);
}

export async function addRsvpSubmission(
  submission: Omit<RsvpSubmission, "id" | "createdAt">,
): Promise<RsvpSubmission> {
  const list = await getRsvpSubmissions();
  const entry: RsvpSubmission = {
    ...submission,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  list.unshift(entry);

  const redis = redisClient();
  if (redis) {
    await redis.set(RSVP_REDIS_KEY, list);
    return entry;
  }

  if (useBlob()) {
    await blobWriteJson(RSVP_BLOB, list);
    return entry;
  }

  await writeJsonFile(rsvpPath, list);
  return entry;
}
