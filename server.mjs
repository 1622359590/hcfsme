import { createServer } from "node:http";
import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8787);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || ADMIN_PASSWORD;
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, "data", "store.json");
const DIST_DIR = path.join(__dirname, "dist");

if (!ADMIN_PASSWORD) {
  console.error("Missing ADMIN_PASSWORD. Start with: ADMIN_PASSWORD='your-password' npm run serve");
  process.exit(1);
}

const seedNews = [
  {
    id: "news-1",
    title: "《天使基金助力企業、新媒體賦能品牌-港中聯十二月商聚圓滿成功！》",
    desc: "天使基金助力企業、新媒體賦能品牌，港中聯十二月商聚圓滿成功。",
    date: "2024 年 6 月 10 日",
    image: "https://www.hcfsme.org/wp-content/uploads/2024/06/frc-6deffb397e74f4ff88845165d91ea5a7.jpeg",
  },
  {
    id: "news-2",
    title: "2022年活動回顧",
    desc: "港中聯2022年活動回顧，記錄商會年度交流、服務與合作進展。",
    date: "2024 年 6 月 10 日",
    image: "https://www.hcfsme.org/wp-content/uploads/2024/03/20211119_145409620_iOS-scaled-e1637544896380.jpeg",
  },
  {
    id: "news-3",
    title: "首屆“香港族裔成就獎頒獎典禮暨高峰論壇”2023發佈會成功舉行",
    desc: "由港中聯主辦的香港族裔成就獎頒獎典禮暨高峰論壇2023發佈會在香港召開。",
    date: "2024 年 6 月 10 日",
    image: "https://www.hcfsme.org/wp-content/uploads/2024/03/34.jpeg",
  },
  {
    id: "news-4",
    title: "龍抬頭，好兆頭，港中聯喜迎惠山",
    desc: "無錫市惠山區總商會、堰橋街道拜訪港中聯，並分別簽署戰略合作協議。",
    date: "2024 年 6 月 10 日",
    image: "https://www.hcfsme.org/wp-content/uploads/2023/02/blog-title-img.jpg",
  },
  {
    id: "news-5",
    title: "深度鏈接！港中聯現屆團隊出席香港工貿署座談會",
    desc: "港中聯會董會主席譚耀泉先生和會長鄭綺文女士帶領團隊到訪香港工貿署。",
    date: "2024 年 6 月 10 日",
    image: "https://www.hcfsme.org/wp-content/uploads/2024/03/funding-2-FTA-TVP.jpg",
  },
  {
    id: "news-6",
    title: "首屆「香港族裔成就獎頒獎典禮暨高峰論壇2023」彰顯香港精神並共襄善舉",
    desc: "港中聯主辦的香港族裔成就獎2023新聞發佈會順利舉辦。",
    date: "2024 年 6 月 10 日",
    image: "https://www.hcfsme.org/wp-content/uploads/2024/03/sec_section-banner-05.jpg",
  },
];

function tokenFor(password) {
  return createHash("sha256").update(`${TOKEN_SECRET}:${password}`).digest("hex");
}

function isValidToken(token = "") {
  const expected = tokenFor(ADMIN_PASSWORD);
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function readStore() {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    const store = { news: seedNews, applications: [] };
    await writeStore(store);
    return store;
  }
}

async function writeStore(store) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

async function readJson(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  if (!body) return {};
  if (body.length > 1_000_000) throw new Error("Payload too large");
  return JSON.parse(body);
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(data));
}

function getBearer(req) {
  const value = req.headers.authorization || "";
  return value.startsWith("Bearer ") ? value.slice(7) : "";
}

function requireAdmin(req, res) {
  if (isValidToken(getBearer(req))) return true;
  sendJson(res, 401, { error: "Unauthorized" });
  return false;
}

function cleanText(value, limit = 2000) {
  return String(value || "").trim().slice(0, limit);
}

function cleanNews(input) {
  return {
    title: cleanText(input.title, 180),
    desc: cleanText(input.desc, 500),
    date: cleanText(input.date, 60),
    image: cleanText(input.image, 1000),
  };
}

async function handleApi(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/news") {
    const store = await readStore();
    sendJson(res, 200, { news: store.news || [] });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/applications") {
    const input = await readJson(req);
    const store = await readStore();
    const record = {
      id: randomUUID(),
      name: cleanText(input.name, 120),
      company: cleanText(input.company, 180),
      role: cleanText(input.role, 120),
      phone: cleanText(input.phone, 80),
      email: cleanText(input.email, 180),
      interest: cleanText(input.interest, 500),
      createdAt: new Date().toISOString(),
    };
    if (!record.name || !record.phone) {
      sendJson(res, 400, { error: "姓名及聯絡電話為必填" });
      return;
    }
    store.applications = [record, ...(store.applications || [])];
    await writeStore(store);
    sendJson(res, 201, { application: record });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/admin/login") {
    const input = await readJson(req);
    if (String(input.password || "") !== ADMIN_PASSWORD) {
      sendJson(res, 401, { error: "密碼錯誤" });
      return;
    }
    sendJson(res, 200, { token: tokenFor(ADMIN_PASSWORD) });
    return;
  }

  if (url.pathname === "/api/admin/news") {
    if (!requireAdmin(req, res)) return;
    const store = await readStore();

    if (req.method === "GET") {
      sendJson(res, 200, { news: store.news || [] });
      return;
    }

    if (req.method === "POST") {
      const input = cleanNews(await readJson(req));
      if (!input.title) {
        sendJson(res, 400, { error: "新聞標題為必填" });
        return;
      }
      const item = { id: randomUUID(), ...input };
      store.news = [item, ...(store.news || [])];
      await writeStore(store);
      sendJson(res, 201, { news: item });
      return;
    }
  }

  const newsMatch = url.pathname.match(/^\/api\/admin\/news\/([^/]+)$/);
  if (newsMatch) {
    if (!requireAdmin(req, res)) return;
    const store = await readStore();
    const id = decodeURIComponent(newsMatch[1]);
    const index = (store.news || []).findIndex((item) => item.id === id);
    if (index === -1) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }

    if (req.method === "PUT") {
      const input = cleanNews(await readJson(req));
      store.news[index] = { ...store.news[index], ...input };
      await writeStore(store);
      sendJson(res, 200, { news: store.news[index] });
      return;
    }

    if (req.method === "DELETE") {
      const [removed] = store.news.splice(index, 1);
      await writeStore(store);
      sendJson(res, 200, { news: removed });
      return;
    }
  }

  if (req.method === "GET" && url.pathname === "/api/admin/applications") {
    if (!requireAdmin(req, res)) return;
    const store = await readStore();
    sendJson(res, 200, { applications: store.applications || [] });
    return;
  }

  sendJson(res, 404, { error: "Not found" });
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

async function serveStatic(req, res, url) {
  const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(DIST_DIR, requested));
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("Not a file");
    res.writeHead(200, {
      "Content-Type": mime[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": requested.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "no-cache",
    });
    createReadStream(filePath).pipe(res);
  } catch {
    const indexPath = path.join(DIST_DIR, "index.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
    createReadStream(indexPath).pipe(res);
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    await serveStatic(req, res, url);
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error" });
  }
});

server.listen(PORT, () => {
  console.log(`HCFSME server listening on http://localhost:${PORT}`);
  console.log(`Admin page: http://localhost:${PORT}/admin`);
});
