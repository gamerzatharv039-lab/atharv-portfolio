import { getStore } from "@netlify/blobs";

const STORE_NAME = "atharv-portfolio";
const KEY = "videos.json";
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});

function validVideo(video) {
  if (!video || typeof video.title !== "string" || typeof video.url !== "string") return false;
  if (video.title.trim().length < 1 || video.title.length > 100) return false;
  try {
    const u = new URL(video.url);
    const host = u.hostname.replace(/^www\./, "");
    const allowed = ["youtube.com", "m.youtube.com", "youtu.be", "youtube-nocookie.com"].some(d => host === d || host.endsWith(`.${d}`));
    return u.protocol === "https:" && allowed;
  } catch { return false; }
}

export default async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method === "GET") {
    try {
      const store = getStore(STORE_NAME);
      const raw = await store.get(KEY);
      let videos = [];
      if (raw) {
        try { videos = JSON.parse(raw); } catch { videos = []; }
      }
      return json({ videos: Array.isArray(videos) ? videos : [] });
    } catch (error) {
      console.error("Portfolio video read failed", error);
      return json({ error: "Portfolio storage is not ready yet. Please check the Netlify deploy setup." }, 503);
    }
  }

  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await request.json();
    if (body.action === "auth") return json({ ok: true });

    const store = getStore(STORE_NAME);
    const raw = await store.get(KEY);
    let videos = [];
    if (raw) {
      try { videos = JSON.parse(raw); } catch { videos = []; }
    }
    if (!Array.isArray(videos)) videos = [];

    if (body.action === "add") {
      const v = body.video;
      if (!validVideo(v)) return json({ error: "Please provide a valid YouTube video title and HTTPS URL." }, 400);
      const id = typeof v.id === "string" && v.id ? v.id.slice(0, 100) : crypto.randomUUID();
      videos = videos.filter(item => item.id !== id);
      videos.unshift({ id, title: v.title.trim(), url: v.url.trim(), long: Boolean(v.long) });
    } else if (body.action === "remove") {
      if (typeof body.id !== "string") return json({ error: "Missing video ID." }, 400);
      videos = videos.filter(item => item.id !== body.id);
    } else {
      return json({ error: "Unknown action." }, 400);
    }

    await store.set(KEY, JSON.stringify(videos));
    return json({ ok: true, videos });
  } catch (error) {
    console.error("Portfolio video write failed", error);
    return json({ error: "Could not save the video. Check Netlify function and Blobs setup." }, 500);
  }
};
