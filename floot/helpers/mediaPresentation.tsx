export function safeMediaUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("/_cdn/") && !value.includes("\\")) return value;
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : undefined; } catch { return undefined; }
}
export function youtubeId(value: string): string | undefined {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    const id = host === "youtu.be" ? url.pathname.slice(1) :
      ["youtube.com", "www.youtube.com", "m.youtube.com", "www.youtube-nocookie.com"].includes(host)
        ? (url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]) : undefined;
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : undefined;
  } catch { return undefined; }
}
export function isNativeMedia(url: string, contentType: string | null, kind: "audio" | "video"): boolean {
  if (contentType?.startsWith(kind + "/")) return true;
  return kind === "audio" ? /\.(mp3|m4a|ogg|wav|aac|flac)(?:[?#]|$)/i.test(url) : /\.(mp4|webm|mov|m4v|ogv)(?:[?#]|$)/i.test(url);
}
