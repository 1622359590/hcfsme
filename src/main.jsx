import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Buildings,
  CalendarBlank,
  CaretDown,
  EnvelopeSimple,
  GlobeHemisphereEast,
  Handshake,
  List,
  MapPin,
  Phone,
  ShieldCheck,
  X,
} from "@phosphor-icons/react";
import "./styles.css";

const image = {
  logo: "https://www.hcfsme.org/wp-content/uploads/2024/03/K3.png",
  hero: "https://www.hcfsme.org/wp-content/uploads/2024/03/34.jpeg",
  meeting: "https://www.hcfsme.org/wp-content/uploads/2024/03/20211119_145409620_iOS-scaled-e1637544896380.jpeg",
  funding: "https://www.hcfsme.org/wp-content/uploads/2024/03/funding-2-FTA-TVP.jpg",
  structure: "https://www.hcfsme.org/wp-content/uploads/2024/06/组织结构图4-副本1-scaled.jpg",
  side: "https://www.hcfsme.org/wp-content/uploads/2024/03/side-area-img.jpg",
  directors: [
    "https://www.hcfsme.org/wp-content/uploads/2023/01/YANG8468_2-scaled.jpg",
    "https://www.hcfsme.org/wp-content/uploads/2023/01/YANG8511_2-scaled.jpg",
    "https://www.hcfsme.org/wp-content/uploads/2023/01/YANG8414_2_2-scaled.jpg",
    "https://www.hcfsme.org/wp-content/uploads/2023/01/YANG8200_2-scaled.jpg",
    "https://www.hcfsme.org/wp-content/uploads/2023/01/YANG8431_2-scaled.jpg",
  ],
  gallery: [
    "https://www.hcfsme.org/wp-content/uploads/2024/06/frc-6deffb397e74f4ff88845165d91ea5a7.jpeg",
    "https://www.hcfsme.org/wp-content/uploads/2024/07/图片_202407031736281-650x1300.jpg",
    "https://www.hcfsme.org/wp-content/uploads/2023/01/YANG8032_2_2-複製1-650x1300.jpg",
    "https://www.hcfsme.org/wp-content/uploads/2023/02/blog-title-img.jpg",
    "https://www.hcfsme.org/wp-content/uploads/2023/03/how-it-works.jpg",
    "https://www.hcfsme.org/wp-content/uploads/2024/03/sec_section-banner-05.jpg",
  ],
  industryIcons: [
    "https://www.hcfsme.org/wp-content/uploads/2024/06/47.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/33.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/46.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/32.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/18.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/45.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/31.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/17.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/44.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/30.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/16.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/43.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/15.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/42.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/28.png",
    "https://www.hcfsme.org/wp-content/uploads/2024/06/29.png",
  ],
};

const contact = {
  phone: "+852 2331 7979",
  email: "info@hcfsme.org",
  addressZh: "九龍長沙灣青山道485號九龍廣場20樓9號室",
  addressEn: "Room 9, 20/F., Kowloon Plaza, 485 Castle Peak Road, Cheung Sha Wan, Kowloon",
};

const nav = [
  { label: "首頁", path: "/" },
  {
    label: "關於商會",
    path: "/about",
    children: [
      { label: "商會簡介", path: "/intro" },
      { label: "商會架構", path: "/structure" },
      { label: "會董名錄", path: "/directors" },
    ],
  },
  { label: "商會服務", path: "/services" },
  { label: "行業委員會", path: "/industry" },
  { label: "新聞動態", path: "/news" },
  { label: "商會相冊", path: "/photo" },
  {
    label: "會員服務",
    path: "/member-services",
    children: [
      { label: "入會須知", path: "/membership" },
      { label: "會員服務協議", path: "/agreement" },
      { label: "實名認證協議", path: "/certification" },
      { label: "信息保護政策", path: "/protection" },
    ],
  },
  { label: "聯系我們", path: "/contact" },
  { label: "訂閱我們", path: "/subscribe" },
];

const mission = [
  "作為全球化的堅定推動者，與世界各國政府、商協會、企業建立廣泛的關係，創造共同價值，積極推動技術與環球市場的發展。",
  "向發展中國家的中小企業傳播中国與東亞新興工業國家的企業發展經驗。",
  "擔當中小企業和政府的溝通橋樑和紐帶，協助解決中小企業的營商問題。",
  "拓展中小企面對世界商機，協助政府招商引資，招才引智。",
  "推動企業社會責任，為全球經濟出謀獻策，推動中小企持續發展。",
  "正面提倡「和」文化的概念三維度，實現政通人和，多元共融，和氣生財的商業倫理。",
];

const associationIntro = [
  "香港中小企業工商聯合會(HCFSME港中聯)，是一家香港政府法定公認的非盈利國際組織。作为香港政府認可及支持的重要商會，香港中小企業工商聯合會自1998年創會以来，目前擁有三十多個行業委員會。",
  "本會在香港政府指導下，一直以來都以服務及支援會員單位為己任，以支援全球華人地區中小企業为使命，聚集香港工商業各界優秀企業代表，以强企之心，行助企之事。港中聯將持續以中央政府和香港政府為後盾，貫徹「商 源 香 江，惠 通 全 球」的宗旨。",
];

const associationPurpose = [
  "凝聚百年香江商業魅力，貫通新世代東亞發展能量，連接新興產業國事業機遇，傳播工業文明強盛經驗，實現全球中小企業之通贏未來。",
  "本會全力推動及維護中小企業權益，面向全球助力各國政府優化投資及營商環境，加強本地與各國各級政府部門及領導官員的聯繫，凝聚業界，提升競爭力，共同拓展商機。",
  "本會亦秉承「和文化思想」核心理念，以促進人與自然、社會及跨文化之和諧共生為責任，並在商務活動中積極推廣「和文化」宣傳教育工作。",
];

const associationStory = [
  "港中聯成立於1998年，以「紮根大中華，立足香港，服務全球中小企業」為發展理念，目前擁有30多個行業委員會和地區辦事處。建會27年以來，港中聯成功幫助多個省市政府完成招商任務，幫助150多家大灣區中小企業獲得發展機遇，幫助9家企業實現成功上市，幫助240多家企業完成事業升級，並取得政府支持。",
  "在全球化遭遇重大挑戰之際，港中聯從2018年開始，全面調整發展戰略，著手開展新的事業佈局，以「堅持國際化，大力推動區域化，開拓藍海新全球市場，推動中小企業轉型升級，通過全金融要素助力企業發展」為新發展方向，通過以點帶面的方式，積極開拓全新的市場，積極拓展新的發展方式。",
  "目前，又與韓國的中小企業部、香港貿易發展局、澳門基金、大灣區政府一道，積極的推動中韓港青年創業計劃，助力中韓港的青年成功創業，順利融入大灣區的發展環境。在港中聯的帶領下，包括香港中小企業在內的全球華人企業都將為中國經濟的再次騰飛，為中國的高质量發展增添一份力量。",
];

const funds = [
  ["青年發展基金", "支持香港青年在香港及大灣區內地城市創業，提供資本資助、創業支援及孵化服務。"],
  ["中小企連線", "讓中小企業在單一平台獲取工業貿易署、香港貿發局等支援資訊。"],
  ["創科生活基金", "資助能為市民帶來更方便、舒適和安全生活的創科項目。"],
  ["創意智優計劃", "資助有助創意產業發展的項目，支援網上提交申請。"],
  ["創新及科技基金", "鼓勵香港企業提升科技水平，為業務注入更多創新意念。"],
  ["專利申請資助計劃", "以撥款形式協助本地公司及個人為其發明申請專利。"],
  ["中小企業市場推廣基金", "鼓勵中小企業參與出口推廣活動，協助擴展香港境外市場。"],
  ["科技券", "支援本地企業及機構使用科技服務和方案，提高生產力並升級轉型。"],
  ["BUD專項基金", "協助香港中小企業融資、擴展海外市場及提高競爭力。"],
];

const directors = [
  ["譚耀泉 Sam Tam", "指導主席"],
  ["蔣文凱 Elisa", "會董會主席"],
  ["韓君 Alex Han", "主席（國際）"],
  ["鄭綺文 Elaine Cheng", "會長"],
  ["李迎春 Shirley Li", "會董"],
];

const managementTeam = [
  ...directors,
  ["黃桂林 Terence Wong", "監察委員會主席"],
  ["梁志超 Jacky Leung", "監察委員會副主席"],
  ["謝慧", "監察委員會副主席"],
  ["禹雲均 Jacky Yu", "執行會長"],
];

const news = [
  {
    title: "《天使基金助力企業、新媒體賦能品牌-港中聯十二月商聚圓滿成功！》",
    desc: "天使基金助力企業、新媒體賦能品牌，港中聯十二月商聚圓滿成功。",
    date: "2024 年 6 月 10 日",
  },
  {
    title: "2022年活動回顧",
    desc: "港中聯2022年活動回顧，記錄商會年度交流、服務與合作進展。",
    date: "2024 年 6 月 10 日",
  },
  {
    title: "首屆“香港族裔成就獎頒獎典禮暨高峰論壇”2023發佈會成功舉行",
    desc: "由港中聯主辦的香港族裔成就獎頒獎典禮暨高峰論壇2023發佈會在香港召開。",
    date: "2024 年 6 月 10 日",
  },
  {
    title: "龍抬頭，好兆頭，港中聯喜迎惠山",
    desc: "無錫市惠山區總商會、堰橋街道拜訪港中聯，並分別簽署戰略合作協議。",
    date: "2024 年 6 月 10 日",
  },
  {
    title: "深度鏈接！港中聯現屆團隊出席香港工貿署座談會",
    desc: "港中聯會董會主席譚耀泉先生和會長鄭綺文女士帶領團隊到訪香港工貿署。",
    date: "2024 年 6 月 10 日",
  },
  {
    title: "首屆「香港族裔成就獎頒獎典禮暨高峰論壇2023」彰顯香港精神並共襄善舉",
    desc: "港中聯主辦的香港族裔成就獎2023新聞發佈會順利舉辦。",
    date: "2024 年 6 月 10 日",
  },
];

const legalPages = {
  agreement: {
    title: "香港中小企業工商聯合會會員服務協議",
    intro:
      "本協議適用於會員申請、會員服務、電子簽約及相關服務。用戶在註冊或使用港中聯服務前，應仔細閱讀並同意協議內容。",
    sections: [
      ["一、服務內容", "港中聯依據會員申請資料及服務規則，向會員提供商會服務、電子簽約、會員管理及相關支援。會員應提供真實、完整、準確的申請信息。"],
      ["二、會員申請與費用", "會員須依照網站指引完成申請、認證、協議簽署及服務費支付。會員退會時，已支付的會員服務費不予退還。"],
      ["三、會員權利義務", "會員可依照商會章程及服務規則享有相關會員服務，同時應遵守法律法規、平台規則及商會管理要求。"],
      ["四、服務變更", "港中聯可根據法律法規、業務發展及風險控制需要調整服務內容，並通過官方網站公告。"],
      ["五、適用法律及管轄", "本協議受中國法律管轄。因協議產生的爭議，應提交香港國際仲裁中心處理。"],
    ],
  },
  certification: {
    title: "港中聯實名認證服務協議",
    intro:
      "本協議說明港中聯在提供實名認證、數字證書及電子簽名服務時收集、核驗、使用會員身份資料的規則。",
    sections: [
      ["一、定義", "實名認證服務是港中聯或合作機構依據用戶提交的個人或企業資料，對身份真實性進行核驗的服務。"],
      ["二、授權與許可", "為準確核驗身份，港中聯可按需收集姓名、證件號碼、手機號、銀行卡號、人臉照片、企業對公帳戶等資料，並提交合法第三方機構比對核驗。"],
      ["三、用戶權利義務", "用戶不得將認證服務用於法律法規限制或違背道德風俗的領域，並應妥善保存身份認證相關材料及設備。"],
      ["四、港中聯權利義務", "港中聯會根據認證技術發展及市場風險環境，不斷調整和完善認證服務內容及形式。"],
      ["五、數字證書服務", "如服務包含電子簽名，港中聯將在實名認證後為用戶申請並調用數字證書，用於簽署及相關場景。"],
      ["六、除外責任", "因自然災害、網絡堵塞、黑客攻擊、政府行為、伺服器維護等因素造成服務中斷的，依協議約定處理。"],
    ],
  },
  protection: {
    title: "港中聯法律聲明及個人信息保護政策",
    intro:
      "港中聯重視用戶信息及隱私安全，按照法律法規要求採取安全保護措施，保護個人信息安全可控。",
    sections: [
      ["發布及生效日期", "發布日期：2023年12月25日。生效日期：2023年12月25日。"],
      ["一、個人信息的收集", "港中聯根據相關法律法規和監管要求，遵循合法、正當、必要和誠信原則，基於帳戶註冊、認證、數字證書、電子簽名及風險控制等目的收集信息。"],
      ["二、個人信息的使用", "收集的信息將用於提供產品與服務、身份核驗、安全管理、風險控制、服務優化及符合法律法規的其他用途。"],
      ["三、委託處理與披露", "在產品服務需要時，港中聯可能依法與合作機構、核驗機構或監管機構共享必要信息，並要求第三方採取嚴格保護措施。"],
      ["四、個人信息的保護", "港中聯通過技術、政策、制度和流程等措施加強信息安全管理，防止未授權訪問、泄露、篡改或丟失。"],
      ["五、用戶權利", "用戶可依法管理、查詢、更正、刪除個人信息，或提出投訴與建議。"],
      ["六、爭議解決", "本政策受中國法律管轄，使用港中聯產品或服務即表示理解並接受相關內容。"],
    ],
  },
};

const pages = {
  "/": { title: "商源香江 惠通全球", subtitle: "香港中小企業工商聯合會" },
  "/about": { title: "關於商會", subtitle: "法定公認的非盈利國際商會組織" },
  "/intro": { title: "商會簡介", subtitle: "紮根大中華，立足香港，服務全球中小企業" },
  "/structure": { title: "商會架構", subtitle: "清晰治理架構，連接商會、會員與產業資源" },
  "/directors": { title: "會董名錄", subtitle: "聚集香港工商業各界優秀企業代表" },
  "/services": { title: "商會服務", subtitle: "協助企業連接政策、資金、市場與合作機會" },
  "/industry": { title: "行業委員會", subtitle: "凝聚行業精英，共同面對挑戰，把握機遇" },
  "/news": { title: "新聞動態", subtitle: "記錄港中聯的重要活動、合作與商會消息" },
  "/photo": { title: "商會相冊", subtitle: "活動現場、交流片段與商會影像記錄" },
  "/member-services": { title: "會員服務", subtitle: "會員註冊、入會申請、協議與信息保護" },
  "/membership": { title: "企業商會入會須知", subtitle: "線上完成申請、認證、繳費與協議簽署" },
  "/agreement": legalPages.agreement,
  "/certification": legalPages.certification,
  "/protection": legalPages.protection,
  "/contact": { title: "聯系我們", subtitle: "我們的全球辦事處與秘書處聯絡方式" },
  "/subscribe": { title: "訂閱我們", subtitle: "收取更多本會宣傳資訊與 Newsletter" },
};

function normalizePath(path) {
  if (!path || path === "/index.html") return "/";
  return pages[path] ? path : "/";
}

function useRoute() {
  const [path, setPath] = useState(normalizePath(window.location.pathname));
  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (next) => {
    const safe = normalizePath(next);
    window.history.pushState({}, "", safe);
    setPath(safe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return [path, navigate];
}

function App() {
  const [path, navigate] = useRoute();
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = pages[path]?.title || pages["/"].title;

  useEffect(() => {
    document.title = `${title} | 香港中小企業工商聯合會`;
  }, [title]);

  return (
    <div>
      <Header path={path} navigate={navigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <RenderPage path={path} navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ path, navigate, mobileOpen, setMobileOpen }) {
  return (
    <header className="site-header">
      <div className="topbar">
        <span><EnvelopeSimple size={16} /> {contact.email}</span>
        <span><Phone size={16} /> {contact.phone}</span>
      </div>
      <nav className="nav-wrap" aria-label="主導航">
        <button className="brand" onClick={() => navigate("/")} aria-label="返回首頁">
          <img src={image.logo} alt="香港中小企業工商聯合會標誌" />
          <span>香港中小企業工商聯合會</span>
        </button>
        <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="打開導航">
          {mobileOpen ? <X size={24} /> : <List size={24} />}
        </button>
        <div className={`nav-links ${mobileOpen ? "is-open" : ""}`}>
          {nav.map((item) => (
            <div className="nav-item" key={item.label}>
              <button
                className={path === item.path || item.children?.some((child) => child.path === path) ? "active" : ""}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
              >
                {item.label}
                {item.children ? <CaretDown size={13} /> : null}
              </button>
              {item.children ? (
                <div className="dropdown">
                  {item.children.map((child) => (
                    <button
                      key={child.path}
                      onClick={() => {
                        navigate(child.path);
                        setMobileOpen(false);
                      }}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}

function RenderPage({ path, navigate }) {
  if (path === "/") return <Home navigate={navigate} />;
  if (path === "/about") return <AboutPage navigate={navigate} />;
  if (path === "/intro") return <IntroPage />;
  if (path === "/structure") return <StructurePage />;
  if (path === "/directors") return <DirectorsPage />;
  if (path === "/services") return <ServicesPage />;
  if (path === "/industry") return <IndustryPage />;
  if (path === "/news") return <NewsPage />;
  if (path === "/photo") return <PhotoPage />;
  if (path === "/member-services") return <MemberServices navigate={navigate} />;
  if (path === "/membership") return <MembershipPage />;
  if (["/agreement", "/certification", "/protection"].includes(path)) return <LegalPage data={pages[path]} />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/subscribe") return <SubscribePage />;
  return <Home navigate={navigate} />;
}

function PageHero({ title, subtitle, imageUrl = image.meeting }) {
  return (
    <section className="page-hero">
      <div>
        <p className="kicker">HCFSME</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <img src={imageUrl} alt="" />
    </section>
  );
}

function Home({ navigate }) {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="kicker">HCFSME since 1998</p>
          <h1>商源香江 惠通全球</h1>
          <p>
            香港中小企業工商聯合會以香港為樞紐，服務及支援全球華人地區中小企業。
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => navigate("/membership")}>
              入會申請 <ArrowRight size={18} />
            </button>
            <button className="secondary" onClick={() => navigate("/services")}>
              我們的服務
            </button>
          </div>
        </div>
        <figure className="hero-image">
          <img src={image.hero} alt="港中聯活動現場" />
        </figure>
      </section>

      <section className="intro-band">
        <div>
          <span>27年</span>
          <p>建會歷程</p>
        </div>
        <div>
          <span>30+</span>
          <p>行業委員會</p>
        </div>
        <div>
          <span>全球</span>
          <p>中小企業支援網絡</p>
        </div>
      </section>

      <section className="section two-col">
        <div>
          <p className="kicker">商會介紹</p>
          <h2>紮根大中華，立足香港，服務全球中小企業</h2>
        </div>
        <div className="rich-text">
          <p>
            香港中小企業工商聯合會是一家香港特區政府法定公認的非盈利國際組織。自1998年創會以來，港中聯以服務及支援會員單位為己任，聚集香港工商業各界優秀企業代表，以強企之心，行助企之事。
          </p>
          <p>
            本會持續以中央政府和香港特區政府為後盾，貫徹「商源香江 惠通全球」的宗旨，協助中小企業拓展世界商機。
          </p>
        </div>
      </section>

      <section className="section support-grid">
        <div className="support-lead">
          <h2>對本地及外地企業的支援</h2>
          <p>連接政策、資金、科技與市場資訊，幫助企業找到合適的發展通道。</p>
        </div>
        {funds.slice(0, 5).map(([title, desc], index) => (
          <article className={`support-card tone-${index}`} key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </section>

      <DirectorsPreview />
      <NewsStrip navigate={navigate} />
    </>
  );
}

function IntroPage() {
  return (
    <>
      <PageHero {...pages["/intro"]} imageUrl={image.side} />
      <section className="section two-col">
        <div>
          <p className="kicker">簡介</p>
          <h2>香港特區政府法定公認的非盈利國際組織</h2>
        </div>
        <div className="rich-text">
          {associationIntro.map((item) => <p key={item}>{item}</p>)}
        </div>
      </section>
      <section className="section purpose">
        <h2>宗旨</h2>
        {associationPurpose.map((item) => <p key={item}>{item}</p>)}
      </section>
      <section className="section mission-list">
        <h2>使命</h2>
        <div>
          {mission.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutPage({ navigate }) {
  return (
    <>
      <PageHero {...pages["/about"]} imageUrl={image.meeting} />
      <section className="section two-col">
        <div>
          <p className="kicker">協會簡介</p>
          <h2>香港政府認可及支持的重要商會</h2>
        </div>
        <div className="rich-text">
          {associationIntro.map((item) => <p key={item}>{item}</p>)}
        </div>
      </section>
      <section className="section purpose">
        <h2>本會宗旨</h2>
        {associationPurpose.map((item) => <p key={item}>{item}</p>)}
      </section>
      <section className="section mission-list">
        <h2>本會使命</h2>
        <div>
          {mission.map((item) => <p key={item}>{item}</p>)}
        </div>
      </section>
      <section className="section two-col">
        <div>
          <p className="kicker">商會介紹</p>
          <h2>建會27年，連接香港與全球中小企業</h2>
        </div>
        <div className="rich-text">
          {associationStory.map((item) => <p key={item}>{item}</p>)}
        </div>
      </section>
      <section className="section image-panel">
        <div>
          <h2>商会架構</h2>
          <p>原站在關於商會頁中展示組織結構圖，用於說明商會治理與協作架構。</p>
        </div>
        <img src={image.structure} alt="香港中小企業工商聯合會組織結構圖" />
      </section>
      <section className="section directors-preview">
        <div>
          <p className="kicker">商會管理團隊</p>
          <h2>聚集香港工商業各界優秀企業代表</h2>
        </div>
        <div className="director-row">
          {managementTeam.map(([name, role], index) => (
            <article key={name}>
              <img src={image.directors[index % image.directors.length]} alt={name} />
              <h3>{name}</h3>
              <p>{role}</p>
            </article>
          ))}
        </div>
      </section>
      <NewsStrip navigate={navigate} />
    </>
  );
}

function StructurePage() {
  return (
    <>
      <PageHero {...pages["/structure"]} imageUrl={image.structure} />
      <section className="section image-panel">
        <div>
          <h2>商會架構圖</h2>
          <p>以會董會、監察委員會、執行會長及各行業委員會形成協作治理架構。</p>
        </div>
        <img src={image.structure} alt="香港中小企業工商聯合會組織結構圖" />
      </section>
    </>
  );
}

function DirectorsPreview() {
  return (
    <section className="section directors-preview">
      <div>
        <p className="kicker">商會管理團隊</p>
        <h2>會董會與監察委員會</h2>
      </div>
      <div className="director-row">
        {directors.map(([name, role], index) => (
          <article key={name}>
            <img src={image.directors[index % image.directors.length]} alt={name} />
            <h3>{name}</h3>
            <p>{role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DirectorsPage() {
  return (
    <>
      <PageHero {...pages["/directors"]} imageUrl={image.directors[0]} />
      <section className="section director-grid">
        {directors.map(([name, role], index) => (
          <article key={name}>
            <img src={image.directors[index % image.directors.length]} alt={name} />
            <div>
              <h2>{name}</h2>
              <p>{role}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero {...pages["/services"]} imageUrl={image.funding} />
      <section className="section two-col">
        <div>
          <p className="kicker">商會介紹</p>
          <h2>紮根大中華，立足香港，服務全球中小企業</h2>
        </div>
        <div className="rich-text">
          <p>
            港中聯成立於1998年，以「紮根大中華，立足香港，服務全球中小企業」為發展理念，擁有30多個行業委員會。建會26年以來，港中聯在多個省市政府成功招商，幫助多家中小企業獲得發展機遇，完成事業升級，取得政府支持。
          </p>
          {[
            "作為全球化的堅定推動者，與世界各國政府、商協會、企業建立廣泛的關係，積極推動技術與環球市場發展。",
            "向發展中國家的中小企業傳播香港與東亞新興工業國家的企業發展經驗。",
            "擔當中小企業和政府的溝通橋樑和紐帶，協助解決中小企業的營商問題。",
            "拓展中小企面對世界商機。協助政府招商引知，吸納人才。",
            "推動企業社會責任，為全球經濟出謀獻策，有利中小企持續發展。凝聚各國商協會和企業的關係，創造共同價值。",
          ].map((item) => <p key={item}>{item}</p>)}
        </div>
      </section>
      <section className="section fund-list">
        <h2>了解更多政府中小企資助</h2>
        <div>
          {funds.map(([title, desc]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section faq">
        <h2>常見問題</h2>
        <article>
          <h3>如何聯絡你們</h3>
          <p>歡迎社會各界人士聯系我們，我們的地址：九龍尖沙咀東部加連威老道94號明輝中心十二樓1210室，郵件：{contact.email}，電話：852 2330 0822。</p>
        </article>
        <article>
          <h3>企業怎麼加入商會</h3>
          <p>
            港中联新会员的入会流程，过往是通过线上港中联的官网提交入會申请表、线下完成纸质协议签署并支付费用后才能成为会员。现通过事必签（SpeedGlobalSign）电子签约系统將会员入会的流程以线上的方式完成。
          </p>
        </article>
        <article>
          <h3>法律声明及个人信息保护政策</h3>
          <p>您的信任對我們非常重要，我們深知用戶信息安全的重要性，我們將按照法律法規要求，採取安全保護措施，保護您的個人信息安全可控。</p>
        </article>
      </section>
    </>
  );
}

function IndustryPage() {
  return (
    <>
      <PageHero {...pages["/industry"]} imageUrl={image.side} />
      <section className="section purpose">
        <h2>共建更繁榮、永續的行業環境</h2>
        <p>
          在快速變化的商業世界中，行業委員會扮演著至關重要的角色。 我們不僅是一個集體的聲音，更是推動行業進步、促進交流合作的橋樑。 我們的使命是通過彙聚行業精英的智慧與力量，共同面對挑戰，把握機遇，塑造一個更加繁榮、永續的行業環境。
        </p>
      </section>
      <section className="section industry-icons" aria-label="行業委員會圖示">
        {image.industryIcons.map((src, index) => (
          <figure key={src}>
            <img src={src} alt={`行業委員會圖示 ${index + 1}`} />
          </figure>
        ))}
      </section>
      <ContactPrompt />
    </>
  );
}

function NewsStrip({ navigate }) {
  return (
    <section className="section news-strip">
      <div>
        <h2>商會新聞＆動態</h2>
        <button className="text-button" onClick={() => navigate("/news")}>查看全部 <ArrowRight size={16} /></button>
      </div>
      <div className="news-row">
        {news.slice(0, 3).map((item) => (
          <article key={item.title}>
            <span>{item.date}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function NewsPage() {
  return (
    <>
      <PageHero {...pages["/news"]} imageUrl={image.gallery[3]} />
      <section className="section news-grid">
        {news.map((item, index) => (
          <article key={item.title}>
            <img src={image.gallery[index % image.gallery.length]} alt="" />
            <div>
              <span><CalendarBlank size={16} /> {item.date}</span>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <button className="text-button">查看詳細 <ArrowRight size={16} /></button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function PhotoPage() {
  return (
    <>
      <PageHero {...pages["/photo"]} imageUrl={image.gallery[0]} />
      <section className="section gallery">
        {image.gallery.map((src, index) => (
          <figure key={src} className={index === 0 || index === 4 ? "wide" : ""}>
            <img src={src} alt={`商會相冊 ${index + 1}`} />
          </figure>
        ))}
      </section>
    </>
  );
}

function MemberServices({ navigate }) {
  return (
    <>
      <PageHero {...pages["/member-services"]} imageUrl={image.funding} />
      <section className="section purpose">
        <h2>Member services</h2>
        <p>
          原站會員服務頁作為會員相關入口頁，集中連到入會須知、會員服務協議、實名認證協議與信息保護政策。
        </p>
      </section>
      <section className="section service-links">
        {[
          ["/membership", "入會須知", "了解電子簽約入會流程、服務費及認證要求。"],
          ["/agreement", "會員服務協議", "查看會員服務、費用、權利義務與爭議處理條款。"],
          ["/certification", "實名認證協議", "了解實名認證、數字證書與電子簽名服務規則。"],
          ["/protection", "信息保護政策", "查看法律聲明、個人信息保護與用戶權利。"],
        ].map(([path, title, desc]) => (
          <button key={path} onClick={() => navigate(path)}>
            <ShieldCheck size={28} />
            <h2>{title}</h2>
            <p>{desc}</p>
            <span>進入頁面 <ArrowRight size={16} /></span>
          </button>
        ))}
      </section>
    </>
  );
}

function MembershipPage() {
  return (
    <>
      <PageHero {...pages["/membership"]} imageUrl={image.gallery[4]} />
      <section className="section membership">
        <div className="rich-text">
          <p>
            港中聯新會員入會流程現通過事必簽（SpeedGlobalSign）電子簽約系統線上完成。會員在入會的同時申請電子簽約系統，通過系統實現合同電子化、服務費在線支付，並可隨時隨地完成合同簽署。
          </p>
        </div>
        <div className="steps">
          {[
            "登錄港中聯官方網站，點擊首頁「入會申請」進入事必簽電子簽約系統。",
            "國內會員完整、真實、準確填寫信息，完成個人認證及企業認證後簽署會員服務協議。",
            "香港企業會員完成會員服務費支付後，聯繫商會秘書處協助辦理核證申請。",
            "會員支付會員服務費及電子簽約服務費，國內企業會員服務費為 CNY10000元/兩年。",
            "香港企業會員服務費為 HKD10000元/兩年，認證簽署服務費為 HKD580元/次。",
            "支付完成後，系統發送訂單票據與簽署成功通知郵件。",
          ].map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function LegalPage({ data }) {
  return (
    <>
      <PageHero title={data.title} subtitle={data.intro} imageUrl={image.gallery[4]} />
      <section className="section legal">
        <p className="legal-intro">{data.intro}</p>
        {data.sections.map(([title, body]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function ContactPrompt() {
  return (
    <section className="section contact-prompt">
      <div>
        <h2>給我們留言或反饋</h2>
        <p>Leave us a comment or ask a question</p>
      </div>
      <button className="primary">提交留言 <ArrowRight size={18} /></button>
    </section>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero {...pages["/contact"]} imageUrl={image.side} />
      <section className="section offices">
        <article>
          <Buildings size={34} />
          <h2>香港辦事處</h2>
          <p>{contact.addressZh}</p>
          <p>{contact.addressEn}</p>
        </article>
        <article>
          <GlobeHemisphereEast size={34} />
          <h2>深圳辦事處</h2>
          <p>歡迎透過秘書處查詢深圳及大灣區合作事宜。</p>
        </article>
        <article>
          <EnvelopeSimple size={34} />
          <h2>聯絡方式</h2>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
        </article>
      </section>
    </>
  );
}

function SubscribePage() {
  return (
    <>
      <PageHero {...pages["/subscribe"]} imageUrl={image.meeting} />
      <section className="section subscribe-panel">
        <div>
          <h2>訂閱本商會宣傳資訊</h2>
          <p>如欲收取更多本中心宣傳資訊，請提供電郵地址，訂閱我們的 Newsletter。</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="newsletter">電子郵箱</label>
          <div>
            <input id="newsletter" type="email" placeholder="name@example.com" />
            <button className="primary" type="submit">立即訂閱</button>
          </div>
        </form>
      </section>
    </>
  );
}

function Footer({ navigate }) {
  const quickLinks = useMemo(() => nav.flatMap((item) => item.children || item).slice(0, 9), []);
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <img src={image.logo} alt="香港中小企業工商聯合會標誌" />
          <h2>香 港 中 小 企 業 工 商 聯 合 會</h2>
          <p>香港中小企業工商聯合會簡稱「港中聯」，一個香港法定公認的非盈利商會組織。</p>
        </div>
        <div>
          <h3>快速鏈接</h3>
          {quickLinks.map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)}>{item.label}</button>
          ))}
        </div>
        <div>
          <h3>Contact Us</h3>
          <p><Phone size={16} /> {contact.phone}</p>
          <p><EnvelopeSimple size={16} /> {contact.email}</p>
          <p><MapPin size={16} /> {contact.addressZh}</p>
        </div>
      </div>
      <div className="copyright">© 1998-2026 港中聯 版權所有</div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
