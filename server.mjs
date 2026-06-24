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
const DATA_FILE = path.resolve(process.env.DATA_FILE || path.join(__dirname, "data", "store.json"));
const DATA_DIR = path.dirname(DATA_FILE);
const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(DATA_DIR, "uploads"));
const DIST_DIR = path.resolve(path.join(__dirname, "dist"));

if (!ADMIN_PASSWORD) {
  console.error("Missing ADMIN_PASSWORD. Start with: ADMIN_PASSWORD='your-password' npm run serve");
  process.exit(1);
}

function passwordIsStrong(value) {
  return typeof value === "string" && value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);
}

if (!passwordIsStrong(ADMIN_PASSWORD)) {
  console.error("ADMIN_PASSWORD must be at least 8 characters and include both letters and numbers.");
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

const seedContent = {
  contact: {
    phone: "+852 2331 7979",
    email: "info@hcfsme.org",
    addressZh: "九龍長沙灣青山道485號九龍廣場20樓9號室",
    addressEn: "Room 9, 20/F., Kowloon Plaza, 485 Castle Peak Road, Cheung Sha Wan, Kowloon",
  },
  coreServices: [
    {
      title: "政府資助與科創扶持",
      value: "降低企業轉型成本，提升申請成功率。",
      items: [
        ["TVP 科技券計劃輔導", "協助企業評估 ERP 升級、網絡安全方案及雲端系統建設等申請可行性，支援申請文件整理。"],
        ["創新及科技基金", "對接企業支援計劃、配對補助及大學科研團隊合作機會。"],
        ["專利申請資助", "協助專利檢索、技術交底書撰寫及官方流程跟進。"],
      ],
    },
    {
      title: "行業委員會與精英社群",
      value: "垂直深耕，打破資訊壁壘，共享圈層資源。",
      items: [
        ["三十餘行業委員會", "涵蓋大健康、金融科技、人工智慧、新零售、專業服務等領域。"],
        ["行業月度沙龍", "定期舉辦會員聚會、標杆企業走訪與跨界交流。"],
      ],
    },
    {
      title: "大灣區商務落地與拓展",
      value: "發揮超級聯繫人角色，助力企業北上南下無縫銜接。",
      items: [
        ["內地商事登記諮詢", "提供大灣區城市公司註冊、外資備案及地址託管諮詢。"],
        ["政府招商精準對接", "組織企業與大灣區各級政府招商部門一對一洽談。"],
      ],
    },
    {
      title: "企業進階培訓與智庫",
      value: "賦能管理層，應對新時代商業挑戰。",
      items: [
        ["創科與數碼化轉型", "涵蓋 AI 應用、Web3.0、企業數據安全合規等課程。"],
        ["ESG 可持續發展", "協助企業建立 ESG 報告框架。"],
      ],
    },
    {
      title: "廠商資源對接與貿易合規",
      value: "對標成熟工商會服務標準，提供一站式貿易支援。",
      items: [
        ["原產地證協助對接", "協助企業了解一般原產地證及優惠產地證申請流程。"],
        ["產品檢測認證轉介", "對接 STC、SGS、TÜV 等權威機構辦理產品認證。"],
      ],
    },
  ],
  memberBenefits: [
    ["企業會員", "香港或境外依法註冊之工商企業、行業商會或公會，可指定代表行使會員權利。"],
    ["個人會員", "企業東主、合夥人、高管或具中小企管理經驗之專業人士，可直接申請入會。"],
    ["會員權益", "優先參加培訓、研討、考察、政策解讀、會員福利活動及行業委員會交流。"],
    ["會務參與", "入會滿三個月後享有選舉及被選舉權，可對會務提出建議及監督。"],
  ],
  downloads: [
    ["商會章程", "查看章程摘要，後續可接入 PDF 下載。", "/charter"],
    ["入會申請表", "企業及個人會員申請資料準備指引。", "/application"],
    ["資助計劃簡介", "TVP、BUD、ITF、市場推廣基金等服務資料。", "/services"],
    ["活動相冊", "商會活動影像記錄與年度回顧。", "/photo"],
  ],
  activities: [
    {
      title: "近期活動預告",
      summary: "培訓、研討會、考察團、接待來訪團及政府機構交流安排。",
      imageUrl: "https://www.hcfsme.org/wp-content/uploads/2024/06/frc-6deffb397e74f4ff88845165d91ea5a7.jpeg",
      buttonLabel: "查看入口",
      url: "/subscribe",
    },
    {
      title: "活動回顧",
      summary: "按年度整理活動圖文、影音與新聞稿，呈現商會服務軌跡。",
      imageUrl: "https://www.hcfsme.org/wp-content/uploads/2024/03/20211119_145409620_iOS-scaled-e1637544896380.jpeg",
      buttonLabel: "查看入口",
      url: "/news",
    },
    {
      title: "年度盛事介紹",
      summary: "包括高峰論壇、頒獎典禮、簽約儀式及跨境交流活動。",
      imageUrl: "https://www.hcfsme.org/wp-content/uploads/2024/03/34.jpeg",
      buttonLabel: "查看入口",
      url: "/photo",
    },
    {
      title: "現正招展／報名",
      summary: "後續可接入展覽、贊助、活動報名與席位查詢入口。",
      imageUrl: "https://www.hcfsme.org/wp-content/uploads/2023/02/blog-title-img.jpg",
      buttonLabel: "查看入口",
      url: "/application",
    },
  ],
  homeStats: [
    ["27年", "建會歷程"],
    ["30+", "行業委員會"],
    ["全球", "中小企業支援網絡"],
  ],
  homeIntro: "紮根大中華，立足香港，服務全球中小企業。香港中",
  homeSupportCards: [
    ["青年發展基金", "支持香港青年在香港及大灣區內地城市創業，提供資本資助、創業支援及孵化服務。"],
    ["中小企連線", "讓中小企業在單一平台獲取工業貿易署、香港貿發局等支援資訊。"],
    ["創科生活基金", "資助能為市民帶來更方便、舒適和安全生活的創科項目。"],
    ["創意智優計劃", "資助有助創意產業發展的項目，支援網上提交申請。"],
    ["創新及科技基金", "鼓勵香港企業提升科技水平，為業務注入更多創新意念。"],
    ["專利申請資助計劃", "以撥款形式協助本地公司及個人為其發明申請專利。"],
    ["中小企業市場推廣基金", "鼓勵中小企業參與出口推廣活動，協助擴展香港境外市場。"],
    ["科技券", "支援本地企業及機構使用科技服務和方案，提高生產力並升級轉型。"],
    ["BUD專項基金", "協助香港中小企業融資、擴展海外市場及提高競爭力。"],
  ],
  governanceGroups: [
    ["會董會", "戰略領航，最高決策。", "蔣文凱 Elisa、韓君 Alex Han、鄭綺文 Elaine Cheng、李迎春 Shirley Li、譚耀泉、禹雲均"],
    ["監察委員會", "獨立監察會務運作合規性。", "黃桂林、梁志超"],
    ["名譽主席團", "借助社會影響力與資源網絡。", "勞英夫、劉衛東、羅文浩、彭樹穩、鄭偉俊、許倩華、謝燕飛"],
    ["顧問團隊", "提供專業諮詢與決策支持。", "呂志豪、陳佩斯、蘇彥威"],
    ["應屆執行委員會", "負責落實會董會決議。", "會長鄭綺文、指導主席譚耀泉、執行會長曾崇瑞、秘書長胡海燕"],
  ],
  committeeGroups: [
    ["大健康及生物科技產業", "23 人", ["大健康產業發展委員會", "健康產業發展委員會", "健康環保科技委員會", "生物科技發展委員會", "生物科技皮膚健康委員會", "眼健康產業發展委員會"]],
    ["金融及資產管理產業", "16 人", ["金融發展委員會", "金融業界發展委員會", "保險界委員會", "互聯網金融委員會", "供應鏈金融發展委員會", "新金融資管傳承委員會", "上市產業專家委員會"]],
    ["科技、數智及新興產業", "14 人", ["Web3.0/人工智慧產業發展委員會", "數智化發展委員會", "數字文旅產業發展委員會", "元宇宙行業發展委員會", "新媒體產業發展委員會", "智能家居行業委員會"]],
    ["灣區融合及區域發展", "14 人", ["大灣區發展籌委會", "深圳發展委員會", "產業培育委員會", "港品發展委員會", "專業移民發展委員會", "專業移民顧問發展委員會"]],
    ["服務業、零售及消費產業", "22 人", ["餐飲業委員會", "批發及零售委員會", "新零售產業發展委員會", "品牌推廣發展委員會", "美容化妝業界委員會", "旅遊業界發展委員會", "時尚產業發展委員會", "鐘錶業界發展委員會", "房地產業發展委員會"]],
    ["區域發展與辦事處", "6 個", ["佛山辦事處", "福建辦事處", "杭州辦事處", "洛陽辦事處", "重慶辦事處", "遼寧分會"]],
  ],
  membershipSteps: [
    "登錄港中聯官方網站，點擊首頁「入會申請」進入事必簽電子簽約系統。",
    "內地會員完整、真實、準確填寫資訊，完成個人認證及企業認證後簽署會員服務協議。",
    "香港企業會員完成會員服務費支付後，聯繫商會秘書處協助辦理核證申請。",
    "會員支付會員服務費及電子簽約服務費，內地企業會員服務費為 CNY10000元/兩年。",
    "香港企業會員服務費為 HKD10000元/兩年，認證簽署服務費為 HKD580元/次。",
    "支付完成後，系統發送訂單票據與簽署成功通知郵件。",
  ],
  memberServiceLinks: [
    ["/member-benefits", "會員類別及權益", "了解企業會員、個人會員、會務參與與活動優先權益。"],
    ["/membership", "入會須知", "了解電子簽約入會流程、服務費及認證要求。"],
    ["/application", "線上入會預登記", "留下公司、職位、聯絡方式及感興趣服務，秘書處跟進。"],
    ["/agreement", "會員服務協議", "查看會員服務、費用、權利義務與爭議處理條款。"],
    ["/certification", "實名認證協議", "了解實名認證、數字證書與電子簽名服務規則。"],
    ["/protection", "資訊保護政策", "查看法律聲明、個人資訊保護與用戶權利。"],
  ],
  resourceLinks: [
    ["/news", "新聞稿", "按年度整理港中聯活動、合作、簽約與會務消息。"],
    ["/services", "政策與商機資訊", "聚合香港及大灣區最新扶持政策、資助計劃及調研摘錄。"],
    ["/announcements", "公告", "入會公示、會議通知及商會重要事項公告。"],
  ],
};


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
    const store = JSON.parse(raw);
    return {
      news: store.news || seedNews,
      applications: store.applications || [],
      content: { ...seedContent, ...(store.content || {}) },
    };
  } catch {
    const store = { news: seedNews, applications: [], content: seedContent };
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
  if (body.length > 8_000_000) throw new Error("Payload too large");
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

function isInsideDir(baseDir, targetPath) {
  const relative = path.relative(baseDir, targetPath);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
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

  if (req.method === "GET" && url.pathname === "/api/content") {
    const store = await readStore();
    sendJson(res, 200, { content: store.content || seedContent });
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
    if (!passwordIsStrong(String(input.password || ""))) {
      sendJson(res, 400, { error: "密碼至少 8 位，並需包含字母和數字" });
      return;
    }
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

  if (url.pathname === "/api/admin/content") {
    if (!requireAdmin(req, res)) return;
    const store = await readStore();

    if (req.method === "GET") {
      sendJson(res, 200, { content: store.content || seedContent });
      return;
    }

    if (req.method === "PUT") {
      const input = await readJson(req);
      if (!input.content || typeof input.content !== "object" || Array.isArray(input.content)) {
        sendJson(res, 400, { error: "內容配置格式不正確" });
        return;
      }
      store.content = { ...seedContent, ...input.content };
      await writeStore(store);
      sendJson(res, 200, { content: store.content });
      return;
    }
  }

  if (req.method === "POST" && url.pathname === "/api/admin/upload") {
    if (!requireAdmin(req, res)) return;
    const input = await readJson(req);
    const match = String(input.dataUrl || "").match(/^data:(image\/(?:png|jpeg|webp|gif));base64,([A-Za-z0-9+/=]+)$/);
    if (!match) {
      sendJson(res, 400, { error: "只支持 PNG、JPG、WEBP、GIF 圖片" });
      return;
    }
    const extMap = { "image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp", "image/gif": ".gif" };
    const buffer = Buffer.from(match[2], "base64");
    if (buffer.length > 5_000_000) {
      sendJson(res, 400, { error: "圖片不能超過 5MB" });
      return;
    }
    await mkdir(UPLOAD_DIR, { recursive: true });
    const safeName = `${Date.now()}-${randomUUID()}${extMap[match[1]]}`;
    await writeFile(path.join(UPLOAD_DIR, safeName), buffer);
    sendJson(res, 201, { url: `/uploads/${safeName}` });
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
  if (url.pathname.startsWith("/uploads/")) {
    const uploadPath = path.resolve(path.join(UPLOAD_DIR, decodeURIComponent(url.pathname.replace("/uploads/", ""))));
    if (!isInsideDir(UPLOAD_DIR, uploadPath)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    try {
      await stat(uploadPath);
      res.writeHead(200, {
        "Content-Type": mime[path.extname(uploadPath)] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000",
      });
      createReadStream(uploadPath).pipe(res);
      return;
    } catch {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
  }

  const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.resolve(path.join(DIST_DIR, requested));
  if (!isInsideDir(DIST_DIR, filePath)) {
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
