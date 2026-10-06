const DEFAULT_REPO = "guillaumywamba/sheila-loic-wedding";
const DEFAULT_BRANCH = "master";

function getRepo(): string {
  return process.env.GITHUB_REPO ?? DEFAULT_REPO;
}

function getBranch(): string {
  return process.env.GITHUB_BRANCH ?? DEFAULT_BRANCH;
}

function getToken(): string | undefined {
  return process.env.GITHUB_TOKEN ?? process.env.SITE_STORAGE_GITHUB_TOKEN;
}

export function useGitHubStorage(): boolean {
  return Boolean(getToken());
}

type GitHubFile = {
  sha: string;
  content: string;
};

async function fetchGitHubFile(path: string): Promise<GitHubFile | null> {
  const token = getToken();
  if (!token) return null;

  const ref = encodeURIComponent(getBranch());
  const res = await fetch(
    `https://api.github.com/repos/${getRepo()}/contents/${path}?ref=${ref}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub read failed (${res.status})`);
  }

  const data = (await res.json()) as { sha: string; content: string };
  return { sha: data.sha, content: data.content };
}

export async function readGitHubJson<T>(path: string): Promise<T | null> {
  const file = await fetchGitHubFile(path);
  if (!file) return null;
  const decoded = Buffer.from(file.content, "base64").toString("utf-8");
  return JSON.parse(decoded) as T;
}

export async function writeGitHubJson(
  path: string,
  data: unknown,
  message: string,
): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new Error("GITHUB_TOKEN manquant");
  }

  const existing = await fetchGitHubFile(path);
  const body: Record<string, string> = {
    message,
    branch: getBranch(),
    content: Buffer.from(JSON.stringify(data, null, 2)).toString("base64"),
  };
  if (existing?.sha) body.sha = existing.sha;

  const res = await fetch(
    `https://api.github.com/repos/${getRepo()}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(err.message ?? `GitHub write failed (${res.status})`);
  }
}
