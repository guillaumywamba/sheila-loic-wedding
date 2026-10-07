import { put, head } from "@vercel/blob";
import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";
import type { RsvpSubmission, SiteContent } from "@/types/site";
import { defaultSiteContent } from "@/lib/default-content";
import { mergeSiteContent } from "@/lib/merge-site-content";
import {
  readGitHubJson,
  useGitHubStorage,
  writeGitHubJson,
} from "@/lib/github-storage";

const dataDir = path.join(process.cwd(), "data");
const contentPath = path.join(dataDir, "site-content.json");
const rsvpPath = path.join(dataDir, "rsvps.json");

const CONTENT_BLOB = "site-content.json";
const RSVP_BLOB = "rsvps.json";
const CONTENT_REDIS_KEY = "wedding:site-content";
const RSVP_REDIS_KEY = "wedding:rsvps";
const GITHUB_CONTENT_PATH = "data/site-content.json";
const GITHUB_RSVP_PATH = "data/rsvps.json";

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

function blobTokenOption() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  return token ? { token } : {};
}

async function blobWriteJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    ...blobTokenOption(),
  });
}

export async function getSiteContent(): Promise<SiteContent> {
  if (useGitHubStorage()) {
    const stored = await readGitHubJson<SiteContent>(GITHUB_CONTENT_PATH);
    if (stored) return mergeSiteContent(stored);
  }

  const redis = redisClient();
  if (redis) {
    const stored = await redis.get<SiteContent>(CONTENT_REDIS_KEY);
    if (stored) return mergeSiteContent(stored);
    await redis.set(CONTENT_REDIS_KEY, defaultSiteContent);
    return defaultSiteContent;
  }

  if (useBlob() || process.env.VERCEL === "1") {
    try {
      const meta = await head(CONTENT_BLOB, blobTokenOption());
      const res = await fetch(meta.url);
      if (res.ok) return mergeSiteContent((await res.json()) as SiteContent);
    } catch {
      /* initialiser le blob */
    }
    await blobWriteJson(CONTENT_BLOB, defaultSiteContent);
    return defaultSiteContent;
  }

  try {
    const raw = await fs.readFile(contentPath, "utf-8");
    return mergeSiteContent(JSON.parse(raw) as SiteContent);
  } catch {
    return defaultSiteContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  if (useGitHubStorage()) {
    await writeGitHubJson(
      GITHUB_CONTENT_PATH,
      content,
      "Mise à jour du contenu du site (admin)",
    );
    return;
  }

  const redis = redisClient();
  if (redis) {
    await redis.set(CONTENT_REDIS_KEY, content);
    return;
  }

  if (useBlob() || process.env.VERCEL === "1") {
    await blobWriteJson(CONTENT_BLOB, content);
    return;
  }

  try {
    await writeJsonFile(contentPath, content);
  } catch {
    throw new Error(
      "Stockage indisponible : ajoutez GITHUB_TOKEN (recommandé) ou un Blob store Vercel.",
    );
  }
}

export async function getRsvpSubmissions(): Promise<RsvpSubmission[]> {
  if (useGitHubStorage()) {
    const list = await readGitHubJson<RsvpSubmission[]>(GITHUB_RSVP_PATH);
    if (list) return list;
  }

  const redis = redisClient();
  if (redis) {
    const list = await redis.get<RsvpSubmission[]>(RSVP_REDIS_KEY);
    return list ?? [];
  }

  if (useBlob() || process.env.VERCEL === "1") {
    try {
      const meta = await head(RSVP_BLOB, blobTokenOption());
      const res = await fetch(meta.url);
      if (res.ok) return (await res.json()) as RsvpSubmission[];
    } catch {
      /* empty */
    }
    return [];
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

  if (useGitHubStorage()) {
    await writeGitHubJson(GITHUB_RSVP_PATH, list, "Nouvelle réponse RSVP");
    return entry;
  }

  const redis = redisClient();
  if (redis) {
    await redis.set(RSVP_REDIS_KEY, list);
    return entry;
  }

  if (useBlob() || process.env.VERCEL === "1") {
    await blobWriteJson(RSVP_BLOB, list);
    return entry;
  }

  await writeJsonFile(rsvpPath, list);
  return entry;
}
