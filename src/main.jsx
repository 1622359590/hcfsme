import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Buildings,
  CalendarBlank,
  CaretDown,
  DownloadSimple,
  EnvelopeSimple,
  GlobeHemisphereEast,
  Handshake,
  List,
  MapPin,
  Phone,
  ShieldCheck,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import "./styles.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
  news: [
    "https://www.hcfsme.org/wp-content/uploads/2024/06/frc-6deffb397e74f4ff88845165d91ea5a7.jpeg",
    "https://www.hcfsme.org/wp-content/uploads/2024/03/20211119_145409620_iOS-scaled-e1637544896380.jpeg",
    "https://www.hcfsme.org/wp-content/uploads/2024/03/34.jpeg",
    "https://www.hcfsme.org/wp-content/uploads/2023/02/blog-title-img.jpg",
    "https://www.hcfsme.org/wp-content/uploads/2024/03/funding-2-FTA-TVP.jpg",
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

const apiBase = import.meta.env.VITE_API_BASE || "";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "操作失敗");
  return data;
}

const nav = [
  { label: "首頁", path: "/" },
  {
    label: "關於港中聯",
    path: "/about",
    children: [
      { label: "商會簡介", path: "/intro" },
      { label: "商會章程", path: "/charter" },
      { label: "商會架構", path: "/structure" },
      { label: "會董暨名譽職務", path: "/directors" },
      { label: "行業委員會", path: "/industry" },
      { label: "聯絡我們", path: "/contact" },
    ],
  },
  {
    label: "商會服務",
    path: "/services",
    children: [
      { label: "政府資助申請輔導", path: "/services#service-1" },
      { label: "行業委員會與交流平台", path: "/services#service-2" },
      { label: "大灣區商務對接", path: "/services#service-3" },
      { label: "企業培訓與研討會", path: "/services#service-4" },
      { label: "廠商資源對接", path: "/services#service-5" },
    ],
  },
  {
    label: "商會活動",
    path: "/activities",
    children: [
      { label: "近期活動預告", path: "/activities" },
      { label: "活動回顧", path: "/news" },
      { label: "商會相冊", path: "/photo" },
    ],
  },
  {
    label: "會員服務",
    path: "/member-services",
    children: [
      { label: "會員類別及權益", path: "/member-benefits" },
      { label: "入會須知", path: "/membership" },
      { label: "線上入會預登記", path: "/application" },
      { label: "會員服務協議", path: "/agreement" },
      { label: "實名認證協議", path: "/certification" },
      { label: "資訊保護政策", path: "/protection" },
    ],
  },
  {
    label: "資訊中心",
    path: "/resources",
    children: [
      { label: "新聞稿", path: "/news" },
      { label: "政策與商機資訊", path: "/resources" },
      { label: "公告", path: "/announcements" },
    ],
  },
  { label: "資源下載", path: "/downloads" },
];

const mission = [
  "作為全球化的堅定推動者，與世界各國政府、商協會、企業建立廣泛的關係，創造共同價值，積極推動技術與環球市場的發展。",
  "向發展中國家的中小企業傳播中國與東亞新興工業國家的企業發展經驗。",
  "擔當中小企業和政府的溝通橋樑和紐帶，協助解決中小企業的營商問題。",
  "拓展中小企面對世界商機，協助政府招商引資，招才引智。",
  "推動企業社會責任，為全球經濟出謀獻策，推動中小企持續發展。",
  "正面提倡「和」文化的概念三維度，實現政通人和，多元共融，和氣生財的商業倫理。",
];

const associationIntro = [
  "香港中小企業工商聯合會（簡稱「港中聯」或 HCFSME）成立於1998年，是香港特區政府認可及支持的非牟利工商團體（擔保有限公司）。",
  "本會秉承「商源香江，惠通全球」的宗旨，致力於團結香港工商界專業人士及廣大中小企業，構建集政策建言、商務對接、資源共享於一體的高端交流平台。",
  "面對全球經濟格局變化及粵港澳大灣區的發展機遇，港中聯充分發揮香港「超級聯繫人」角色，協助會員企業開拓海內外市場，特別是大灣區及東南亞新興市場。",
];

const associationPurpose = [
  "團結香港中小型企業及工商界力量，維護會員合法權益。",
  "促進香港與內地，特別是大灣區及海外工商交流合作，發揮香港「超級聯繫人」角色，搭建內聯外拓商務對接平台。",
  "向特區政府及有關機構反映中小企訴求，參與公共政策諮詢。",
  "舉辦工商研討、培訓、考察、政策解讀及聯誼活動，推動中小企轉型升級及持續發展。",
  "弘揚誠信經商、愛港愛國精神，服務社會及業界福祉。",
];

const associationStory = [
  "港中聯成立於1998年，以「紮根大中華，立足香港，服務全球中小企業」為發展理念，目前擁有30多個行業委員會和地區辦事處。建會27年以來，港中聯成功幫助多個省市政府完成招商任務，幫助150多家大灣區中小企業獲得發展機遇，幫助9家企業實現成功上市，幫助240多家企業完成事業升級，並取得政府支持。",
  "在全球化遭遇重大挑戰之際，港中聯從2018年開始，全面調整發展戰略，著手開展新的事業佈局，以「堅持國際化，大力推動區域化，開拓藍海新全球市場，推動中小企業轉型升級，通過全金融要素助力企業發展」為新發展方向，通過以點帶面的方式，積極開拓全新的市場，積極拓展新的發展方式。",
  "目前，又與韓國的中小企業部、香港貿易發展局、澳門基金、大灣區政府一道，積極推動中韓港青年創業計劃，助力中韓港青年成功創業，順利融入大灣區的發展環境。在港中聯的帶領下，包括香港中小企業在內的全球華人企業都將為中國經濟的再次騰飛，為中國的高質量發展增添一份力量。",
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

const coreServices = [
  {
    title: "政府資助與科創扶持",
    value: "降低企業轉型成本，提升申請成功率。",
    items: [
      ["TVP 科技券計劃輔導", "協助企業評估 ERP 升級、網絡安全方案及雲端系統建設等申請可行性，支援申請文件整理。"],
      ["創新及科技基金", "對接企業支援計劃、配對補助及大學科研團隊合作機會。"],
      ["專利申請資助", "協助專利檢索、技術交底書撰寫及官方流程跟進。"],
      ["中小企業市場推廣基金", "支援出口推廣活動，協助企業拓展香港境外市場。"],
      ["BUD 專項基金", "協助企業取得融資、擴展海外市場及提升競爭力。"],
      ["專項診斷服務", "提供資助資格預審，定制資助組合方案，提高獲批率。"],
    ],
  },
  {
    title: "行業委員會與精英社群",
    value: "垂直深耕，打破資訊壁壘，共享圈層資源。",
    items: [
      ["三十餘行業委員會", "涵蓋大健康、金融科技、人工智慧、新零售、專業服務等領域。"],
      ["會董會閉門會議", "高端閉門論壇，探討宏觀經濟、資本運作及產業策略。"],
      ["行業月度沙龍", "定期舉辦會員聚會、標杆企業走訪與跨界交流。"],
      ["產業鏈對接平台", "建立企業庫，透過線上平台及線下推介會精準匹配供應商與採購商。"],
    ],
  },
  {
    title: "大灣區商務落地與拓展",
    value: "發揮超級聯繫人角色，助力企業北上南下無縫銜接。",
    items: [
      ["內地商事登記諮詢", "提供大灣區城市公司註冊、外資備案及地址託管諮詢。"],
      ["香港公司文件公證", "協辦香港公司全套公證，用於內地開戶、訴訟或合資經營。"],
      ["政府招商精準對接", "組織企業與大灣區各級政府招商部門一對一洽談。"],
      ["跨境考察團", "定期組織大灣區產業考察團及東南亞出海考察團。"],
      ["跨境財稅法務支援", "轉介合作律師及會計師事務所，協助處理稅務籌劃及合規問題。"],
    ],
  },
  {
    title: "企業進階培訓與智庫",
    value: "賦能管理層，應對新時代商業挑戰。",
    items: [
      ["創科與數碼化轉型", "涵蓋 AI 應用、Web3.0、企業數據安全合規等課程。"],
      ["ESG 可持續發展", "協助企業建立 ESG 報告框架，應對披露要求及綠色金融需求。"],
      ["品牌出海行銷", "提供海外社媒、網紅帶貨、海外倉儲及物流解決方案。"],
      ["家族辦公室與傳承", "面向會董級成員，提供財富管理、二代接班及家族信託研修。"],
    ],
  },
  {
    title: "廠商資源對接與貿易合規",
    value: "對標成熟工商會服務標準，提供一站式貿易支援。",
    items: [
      ["原產地證協助對接", "協助企業了解一般原產地證及優惠產地證申請流程。"],
      ["特定自貿區證書", "支援中國-東盟自貿區、亞太貿易協定等區域證書諮詢。"],
      ["產品檢測認證轉介", "對接 STC、SGS、TÜV 等權威機構辦理產品認證。"],
      ["香港 Q 嘜優質標誌", "協助企業了解 Q 嘜認證，提升品牌信譽度。"],
      ["跨境物流與供應鏈", "推薦貨代及報關資源，協助處理海關查驗及單證整理。"],
    ],
  },
];

const charterSections = [
  ["總則", "本會中文定名為「香港中小企業工商聯合會」，簡稱「港中聯」；英文名稱為 Hong Kong Confederation of Small and Medium Enterprises Industry and Commerce。"],
  ["會員體系", "本會實行分級會員體系，分為企業會員及個人會員。申請入會須提交申請表及相關證明文件，經審核並繳納入會基金及會費後成為正式會員。"],
  ["會員權利", "會員享有選舉權、被選舉權及表決權，並可對會務提出批評、建議及監督，優先參加培訓、研討、考察及會員福利活動。"],
  ["會員義務", "會員須遵守章程及會議決議，維護本會名譽，促進會員間互助合作，並按期繳納入會基金及常年會費。"],
  ["組織架構", "會員大會為最高權力機構；會董會為核心領導機構；監事委員會獨立行使監察權；秘書處負責日常會務行政工作。"],
  ["會議與經費", "會員大會每年召開一次。本會經費來源包括會費、捐款、贊助、政府或機構資助及其他合法收入，經費僅用於達成宗旨之相關活動。"],
];

const governanceGroups = [
  ["會董會", "戰略領航，最高決策。審議及批准重大投資、戰略規劃及人事任免。", "蔣文凱 Elisa、韓君 Alex Han、鄭綺文 Elaine Cheng、李迎春 Shirley Li、譚耀泉、禹雲均"],
  ["監察委員會", "獨立監察會務運作合規性，審計財務狀況，防範運營風險。", "黃桂林、梁志超"],
  ["名譽主席團", "借助社會影響力與資源網絡，提升聯合會公信力及對外聯絡層次。", "勞英夫、劉衛東、羅文浩、彭樹穩、鄭偉俊、許倩華、謝燕飛"],
  ["顧問團隊", "提供專業諮詢、決策支持與智力服務。", "呂志豪、陳佩斯、蘇彥威"],
  ["應屆執行委員會", "負責落實會董會決議及日常會務運作。", "會長鄭綺文、指導主席譚耀泉、執行會長曾崇瑞、秘書長胡海燕"],
];

const committeeGroups = [
  ["大健康及生物科技產業", "23 人", ["大健康產業發展委員會", "健康產業發展委員會", "健康環保科技委員會", "生物科技發展委員會", "生物科技皮膚健康委員會", "眼健康產業發展委員會"]],
  ["金融及資產管理產業", "16 人", ["金融發展委員會", "金融業界發展委員會", "保險界委員會", "互聯網金融委員會", "供應鏈金融發展委員會", "新金融資管傳承委員會", "上市產業專家委員會"]],
  ["科技、數智及新興產業", "14 人", ["Web3.0/人工智慧產業發展委員會", "數智化發展委員會", "數字文旅產業發展委員會", "元宇宙行業發展委員會", "新媒體產業發展委員會", "智能家居行業委員會"]],
  ["灣區融合及區域發展", "14 人", ["大灣區發展籌委會", "深圳發展委員會", "產業培育委員會", "港品發展委員會", "專業移民發展委員會", "專業移民顧問發展委員會"]],
  ["服務業、零售及消費產業", "22 人", ["餐飲業委員會", "批發及零售委員會", "新零售產業發展委員會", "品牌推廣發展委員會", "美容化妝業界委員會", "旅遊業界發展委員會", "時尚產業發展委員會", "鐘錶業界發展委員會", "房地產業發展委員會"]],
  ["區域發展與辦事處", "6 個", ["佛山辦事處", "福建辦事處", "杭州辦事處", "洛陽辦事處", "重慶辦事處", "遼寧分會"]],
];

const memberBenefits = [
  ["企業會員", "香港或境外依法註冊之工商企業、行業商會或公會，可指定代表行使會員權利。"],
  ["個人會員", "企業東主、合夥人、高管或具中小企管理經驗之專業人士，可直接申請入會。"],
  ["會員權益", "優先參加培訓、研討、考察、政策解讀、會員福利活動及行業委員會交流。"],
  ["會務參與", "入會滿三個月後享有選舉及被選舉權，可對會務提出建議及監督。"],
];

const downloads = [
  ["商會章程", "查看章程摘要，後續可接入 PDF 下載。", "/charter"],
  ["入會申請表", "企業及個人會員申請資料準備指引。", "/application"],
  ["資助計劃簡介", "TVP、BUD、ITF、市場推廣基金等服務資料。", "/services"],
  ["活動相冊", "商會活動影像記錄與年度回顧。", "/photo"],
];

const defaultEditableContent = {
  contact,
  coreServices,
  memberBenefits,
  downloads,
};

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
      ["一、服務內容", "港中聯依據會員申請資料及服務規則，向會員提供商會服務、電子簽約、會員管理及相關支援。會員應提供真實、完整、準確的申請資訊。"],
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
    title: "港中聯法律聲明及個人資訊保護政策",
    intro:
      "港中聯重視用戶資訊及隱私安全，按照法律法規要求採取安全保護措施，保護個人資訊安全可控。",
    sections: [
      ["發布及生效日期", "發布日期：2023年12月25日。生效日期：2023年12月25日。"],
      ["一、個人資訊的收集", "港中聯根據相關法律法規和監管要求，遵循合法、正當、必要和誠信原則，基於帳戶註冊、認證、數字證書、電子簽名及風險控制等目的收集資訊。"],
      ["二、個人資訊的使用", "收集的資訊將用於提供產品與服務、身份核驗、安全管理、風險控制、服務優化及符合法律法規的其他用途。"],
      ["三、委託處理與披露", "在產品服務需要時，港中聯可能依法與合作機構、核驗機構或監管機構共享必要資訊，並要求第三方採取嚴格保護措施。"],
      ["四、個人資訊的保護", "港中聯通過技術、政策、制度和流程等措施加強資訊安全管理，防止未授權訪問、泄露、篡改或丟失。"],
      ["五、用戶權利", "用戶可依法管理、查詢、更正、刪除個人資訊，或提出投訴與建議。"],
      ["六、爭議解決", "本政策受中國法律管轄，使用港中聯產品或服務即表示理解並接受相關內容。"],
    ],
  },
};

const pages = {
  "/": { title: "商源香江 惠通全球", subtitle: "香港中小企業工商聯合會" },
  "/about": { title: "關於港中聯", subtitle: "香港特區政府認可及支持的非牟利工商團體" },
  "/intro": { title: "商會簡介", subtitle: "立足香港，背靠祖國，聯通世界" },
  "/charter": { title: "商會章程", subtitle: "會員體系、會務治理與組織運作準則" },
  "/structure": { title: "組織架構", subtitle: "會董會、監察委員會、執行委員會與專業分支機構" },
  "/directors": { title: "會董暨名譽職務", subtitle: "聚集香港工商業各界優秀企業代表與專業顧問" },
  "/services": { title: "商會服務", subtitle: "五大核心服務體系，支援企業轉型、落地與出海" },
  "/industry": { title: "行業委員會", subtitle: "六大產業板塊，三十餘個專業委員會" },
  "/activities": { title: "商會活動", subtitle: "近期活動、年度盛事、交流考察與活動回顧" },
  "/news": { title: "新聞動態", subtitle: "記錄港中聯的重要活動、合作與商會消息" },
  "/photo": { title: "商會相冊", subtitle: "活動現場、交流片段與商會影像記錄" },
  "/member-services": { title: "會員服務", subtitle: "會員權益、入會流程、預登記與協議政策" },
  "/member-benefits": { title: "會員類別及權益", subtitle: "企業會員、個人會員與會務參與權利" },
  "/membership": { title: "企業商會入會須知", subtitle: "線上完成申請、認證、繳費與協議簽署" },
  "/application": { title: "線上入會預登記", subtitle: "留下聯絡資料，秘書處將協助跟進入會流程" },
  "/agreement": legalPages.agreement,
  "/certification": legalPages.certification,
  "/protection": legalPages.protection,
  "/resources": { title: "資訊中心", subtitle: "新聞稿、政策與商機資訊、公告及調研摘錄" },
  "/announcements": { title: "公告", subtitle: "入會公示、會議通知與會務公告" },
  "/downloads": { title: "資源下載", subtitle: "章程、入會表格、資助計劃與活動資料入口" },
  "/contact": { title: "聯絡我們", subtitle: "我們的全球辦事處與秘書處聯絡方式" },
  "/subscribe": { title: "訂閱我們", subtitle: "收取更多本會宣傳資訊與 Newsletter" },
  "/admin": { title: "網站後台", subtitle: "內容管理與入會預登記資料" },
};

function normalizePath(path) {
  if (!path || path === "/index.html") return "/";
  return pages[path] ? path : "/";
}

function parseRoute(value = `${window.location.pathname}${window.location.hash}`) {
  const [rawPath, rawHash = ""] = value.split("#");
  const path = normalizePath(rawPath);
  return { path, hash: rawHash ? `#${rawHash}` : "" };
}

function useRoute() {
  const [route, setRoute] = useState(() => parseRoute());
  useEffect(() => {
    const onPop = () => setRoute(parseRoute());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (next) => {
    const safe = parseRoute(next);
    const href = `${safe.path}${safe.hash}`;
    window.history.pushState({}, "", href);
    setRoute(safe);
    window.setTimeout(() => {
      if (safe.hash) {
        const target = document.querySelector(safe.hash);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };
  return [route.path, navigate];
}

function App() {
  const [path, navigate] = useRoute();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [content, setContent] = useState(defaultEditableContent);
  const appRef = useRef(null);
  const title = pages[path]?.title || pages["/"].title;
  const isAdmin = path === "/admin";
  const siteContact = content.contact || contact;

  useEffect(() => {
    apiRequest("/api/content")
      .then((data) => setContent({ ...defaultEditableContent, ...(data.content || {}) }))
      .catch(() => setContent(defaultEditableContent));
  }, []);

  useEffect(() => {
    document.title = `${title} | 香港中小企業工商聯合會`;
  }, [title]);

  useEffect(() => {
    if (!window.location.hash) return;
    const timer = window.setTimeout(() => {
      document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [path]);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animatedScope = appRef.current;

    if (!animatedScope || reduceMotion) {
      return;
    }

    gsap.defaults({ ease: "power3.out" });

    const introTimeline = gsap.timeline({ defaults: { duration: 0.72 } });
    introTimeline
      .from(".site-header", { y: -18, autoAlpha: 0, duration: 0.42, clearProps: "all" })
      .from(".hero-copy > *, .page-hero > div > *", {
        y: 26,
        autoAlpha: 0,
        stagger: 0.075,
        clearProps: "all",
      }, "-=0.12")
      .from(".hero-image, .page-hero img", {
        y: 30,
        scale: 0.975,
        autoAlpha: 0,
        duration: 0.86,
        clearProps: "all",
      }, "-=0.42")
      .from(".intro-band > div", {
        y: 24,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.55,
        clearProps: "all",
      }, "-=0.32");

    ScrollTrigger.batch(".section", {
      start: "top 84%",
      once: true,
      interval: 0.08,
      batchMax: 3,
      onEnter: (batch) => {
        gsap.fromTo(batch, { autoAlpha: 0, y: 42 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.08,
          overwrite: true,
          clearProps: "all",
        });
      },
    });

    ScrollTrigger.batch(
      ".support-card, .director-row article, .director-grid article, .news-row article, .news-grid article, .service-links button, .fund-list article, .offices article, .legal article, .steps article, .industry-icons figure, .governance-list article, .committee-board article, .service-panel, .activity-grid article, .benefit-grid article, .resource-list article, .download-list button",
      {
        start: "top 88%",
        once: true,
        interval: 0.06,
        batchMax: 6,
        onEnter: (batch) => {
          gsap.fromTo(batch, { autoAlpha: 0, y: 28, scale: 0.985 }, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.62,
            stagger: { each: 0.045, from: "start" },
            overwrite: true,
            clearProps: "all",
          });
        },
      },
    );

    gsap.utils.toArray(".hero-image img, .page-hero img, .gallery img").forEach((target) => {
      gsap.to(target, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180);

    return () => {
      window.clearTimeout(refreshTimer);
    };
  }, { dependencies: [path], scope: appRef, revertOnUpdate: true });

  return (
    <div ref={appRef}>
      {!isAdmin ? <Header path={path} navigate={navigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} siteContact={siteContact} /> : null}
      <main>
        <RenderPage path={path} navigate={navigate} content={content} siteContact={siteContact} />
      </main>
      {!isAdmin ? <Footer navigate={navigate} siteContact={siteContact} /> : null}
    </div>
  );
}

function Header({ path, navigate, mobileOpen, setMobileOpen, siteContact }) {
  return (
    <header className="site-header">
      <div className="topbar">
        <span><EnvelopeSimple size={16} /> {siteContact.email}</span>
        <span><Phone size={16} /> {siteContact.phone}</span>
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
                      key={`${item.label}-${child.label}`}
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

function RenderPage({ path, navigate, content, siteContact }) {
  if (path === "/") return <Home navigate={navigate} />;
  if (path === "/about") return <AboutPage navigate={navigate} />;
  if (path === "/intro") return <IntroPage />;
  if (path === "/charter") return <CharterPage />;
  if (path === "/structure") return <StructurePage />;
  if (path === "/directors") return <DirectorsPage />;
  if (path === "/services") return <ServicesPage content={content} />;
  if (path === "/industry") return <IndustryPage />;
  if (path === "/activities") return <ActivitiesPage navigate={navigate} />;
  if (path === "/news") return <NewsPage />;
  if (path === "/photo") return <PhotoPage />;
  if (path === "/member-services") return <MemberServices navigate={navigate} />;
  if (path === "/member-benefits") return <MemberBenefitsPage content={content} />;
  if (path === "/membership") return <MembershipPage />;
  if (path === "/application") return <ApplicationPage />;
  if (["/agreement", "/certification", "/protection"].includes(path)) return <LegalPage data={pages[path]} />;
  if (path === "/resources") return <ResourcesPage navigate={navigate} />;
  if (path === "/announcements") return <AnnouncementsPage />;
  if (path === "/downloads") return <DownloadsPage navigate={navigate} content={content} />;
  if (path === "/contact") return <ContactPage siteContact={siteContact} />;
  if (path === "/subscribe") return <SubscribePage />;
  if (path === "/admin") return <AdminPage navigate={navigate} />;
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
          <h2>商會架構</h2>
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
      <section className="section org-overview">
        <div className="org-lead">
          <h2>會董會領航，執行委員會落地，專業分支機構連接產業。</h2>
          <p>新版組織架構按治理職能與產業屬性拆分，讓會員可以清楚理解決策、監察、日常運作與行業服務之間的關係。</p>
        </div>
        <div className="org-stats">
          <div><span>137</span><p>位成員</p></div>
          <div><span>6</span><p>大產業板塊</p></div>
          <div><span>30+</span><p>專業委員會</p></div>
        </div>
      </section>
      <section className="section governance-list">
        {governanceGroups.map(([title, desc, people]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{desc}</p>
            <span>{people}</span>
          </article>
        ))}
      </section>
      <section className="section committee-board">
        <div className="section-heading">
          <h2>專業分支機構</h2>
          <p>按產業屬性劃分為六大板塊，逐步承接行業交流、政策解讀、企業走訪與資源對接。</p>
        </div>
        <div className="committee-list">
          {committeeGroups.map(([title, count, items]) => (
            <article key={title}>
              <div>
                <h3>{title}</h3>
                <span>{count}</span>
              </div>
              <p>{items.join("、")}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function CharterPage() {
  return (
    <>
      <PageHero {...pages["/charter"]} imageUrl={image.side} />
      <section className="section two-col">
        <div>
          <p className="kicker">章程摘要</p>
          <h2>以清晰治理保障會員權益與會務運作。</h2>
        </div>
        <div className="rich-text">
          <p>本章程摘要整理自《香港中小企業工商聯合會章程》，涵蓋本會名稱、宗旨、會員體系、會員權利義務、組織架構、會議、經費及章程修訂等核心條款。</p>
          <p>完整章程文件可於「資源下載」頁後續接入 PDF 或 Word 版本，供會員查閱及下載。</p>
        </div>
      </section>
      <section className="section legal charter-grid">
        {charterSections.map(([title, body]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
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

function ServicesPage({ content }) {
  const serviceGroups = content.coreServices || coreServices;
  return (
    <>
      <PageHero {...pages["/services"]} imageUrl={image.funding} />
      <section className="section two-col">
        <div>
          <p className="kicker">核心服務體系</p>
          <h2>從資助申請到跨境落地，將商會網絡轉化為企業行動力。</h2>
        </div>
        <div className="rich-text">
          <p>
            新版商會服務按照文件建議整理為五大板塊，強調顆粒度細化與專業度提升。每個板塊都對應企業在不同階段會遇到的實際需求：資助、社群、落地、培訓與貿易合規。
          </p>
          <p>港中聯將透過三十餘個行業委員會、政府及專業機構網絡，為香港及內地中小企業提供可執行、可轉介、可跟進的服務入口。</p>
        </div>
      </section>
      <section className="section service-system">
        {serviceGroups.map((group, index) => (
          <article key={group.title} id={`service-${index + 1}`} className="service-panel">
            <div className="service-panel-head">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>服務項目</h3>
            </div>
            <h2>{group.title}</h2>
            <p>{group.value}</p>
            <div>
              {group.items.map(([itemTitle, itemDesc]) => (
                <section key={itemTitle}>
                  <h3>{itemTitle}</h3>
                  <p>{itemDesc}</p>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>
      <section className="section faq">
        <h2>常見問題</h2>
        <article>
          <h3>如何聯絡你們</h3>
          <p>歡迎社會各界人士聯絡我們。地址：九龍尖沙咀東部加連威老道94號明輝中心十二樓1210室；電郵：{contact.email}；電話：852 2330 0822。</p>
        </article>
        <article>
          <h3>企業怎麼加入商會</h3>
          <p>
            港中聯新會員入會流程現已改為線上辦理。會員可透過港中聯官方網站提交入會申請，並使用事必簽（SpeedGlobalSign）電子簽約系統完成協議簽署、服務費支付及相關認證。
          </p>
        </article>
        <article>
          <h3>法律聲明及個人資訊保護政策</h3>
          <p>您的信任對我們非常重要。我們深知用戶資訊安全的重要性，並將按照法律法規要求採取安全保護措施，保障個人資訊安全可控。</p>
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
        <h2>六大產業板塊，承接三十餘個行業委員會。</h2>
        <p>
          行業委員會是港中聯推動精準服務與會員互助的核心機制。每個板塊會逐步承接政策解讀、行業沙龍、標杆企業走訪、產業鏈對接及負責人介紹。
        </p>
      </section>
      <section className="section committee-board">
        <div className="committee-list">
          {committeeGroups.map(([title, count, items]) => (
            <article key={title}>
              <div>
                <h3>{title}</h3>
                <span>{count}</span>
              </div>
              <p>{items.join("、")}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section industry-icons" aria-label="行業委員會圖示">
        {image.industryIcons.slice(0, 12).map((src, index) => (
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
  const [items, setItems] = useState(news);

  useEffect(() => {
    apiRequest("/api/news")
      .then((data) => setItems(data.news?.length ? data.news : news))
      .catch(() => setItems(news));
  }, []);

  return (
    <section className="section news-strip">
      <div>
        <h2>商會新聞＆動態</h2>
        <button className="text-button" onClick={() => navigate("/news")}>查看全部 <ArrowRight size={16} /></button>
      </div>
      <div className="news-row">
        {items.slice(0, 3).map((item) => (
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
  const [items, setItems] = useState(news);

  useEffect(() => {
    apiRequest("/api/news")
      .then((data) => setItems(data.news?.length ? data.news : news))
      .catch(() => setItems(news));
  }, []);

  return (
    <>
      <PageHero {...pages["/news"]} imageUrl={image.news[3]} />
      <section className="section news-grid">
        {items.map((item, index) => (
          <article key={item.title}>
            <img src={item.image || image.news[index % image.news.length]} alt={`${item.title} 活動圖片`} />
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

function ActivitiesPage({ navigate }) {
  return (
    <>
      <PageHero {...pages["/activities"]} imageUrl={image.news[0]} />
      <section className="section activity-grid">
        {[
          ["近期活動預告", "培訓、研討會、考察團、接待來訪團及政府機構交流安排。", "/subscribe"],
          ["活動回顧", "按年度整理活動圖文、影音與新聞稿，呈現商會服務軌跡。", "/news"],
          ["年度盛事介紹", "包括高峰論壇、頒獎典禮、簽約儀式及跨境交流活動。", "/photo"],
          ["現正招展／報名", "後續可接入展覽、贊助、活動報名與席位查詢入口。", "/application"],
        ].map(([title, desc, path], index) => (
          <article key={title}>
            <img src={image.news[index % image.news.length]} alt={`${title} 活動圖片`} />
            <div>
              <h2>{title}</h2>
              <p>{desc}</p>
              <button className="text-button" onClick={() => navigate(path)}>查看入口 <ArrowRight size={16} /></button>
            </div>
          </article>
        ))}
      </section>
      <NewsStrip navigate={navigate} />
    </>
  );
}

function MemberServices({ navigate }) {
  return (
    <>
      <PageHero {...pages["/member-services"]} imageUrl={image.funding} />
      <section className="section purpose">
        <h2>從了解權益，到完成入會，再到持續參與商會活動。</h2>
        <p>
          會員服務頁整合會員類別及權益、入會流程、預登記、協議政策與後期會員登入入口，讓香港及內地企業主可以更快找到下一步。
        </p>
      </section>
      <section className="section service-links">
        {[
          ["/member-benefits", "會員類別及權益", "了解企業會員、個人會員、會務參與與活動優先權益。"],
          ["/membership", "入會須知", "了解電子簽約入會流程、服務費及認證要求。"],
          ["/application", "線上入會預登記", "留下公司、職位、聯絡方式及感興趣服務，秘書處跟進。"],
          ["/agreement", "會員服務協議", "查看會員服務、費用、權利義務與爭議處理條款。"],
          ["/certification", "實名認證協議", "了解實名認證、數字證書與電子簽名服務規則。"],
          ["/protection", "資訊保護政策", "查看法律聲明、個人資訊保護與用戶權利。"],
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

function MemberBenefitsPage({ content }) {
  const benefits = content.memberBenefits || memberBenefits;
  return (
    <>
      <PageHero {...pages["/member-benefits"]} imageUrl={image.meeting} />
      <section className="section benefit-grid">
        {benefits.map(([title, desc]) => (
          <article key={title}>
            <UsersThree size={34} />
            <h2>{title}</h2>
            <p>{desc}</p>
          </article>
        ))}
      </section>
      <section className="section purpose">
        <h2>會員責任</h2>
        <p>會員須遵守本會章程及會員大會、會董會、執行委員會決議，維護本會名譽，促進會員間互助合作，並按期繳納入會基金及常年會費。</p>
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
            港中聯新會員入會流程現通過事必簽（SpeedGlobalSign）電子簽約系統線上完成。會員在入會的同時申請電子簽約系統，通過系統實現合約電子化、服務費線上支付，並可隨時隨地完成合約簽署。
          </p>
        </div>
        <div className="steps">
          {[
            "登錄港中聯官方網站，點擊首頁「入會申請」進入事必簽電子簽約系統。",
            "內地會員完整、真實、準確填寫資訊，完成個人認證及企業認證後簽署會員服務協議。",
            "香港企業會員完成會員服務費支付後，聯繫商會秘書處協助辦理核證申請。",
            "會員支付會員服務費及電子簽約服務費，內地企業會員服務費為 CNY10000元/兩年。",
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

function ApplicationPage() {
  const [form, setForm] = useState({ name: "", company: "", role: "", phone: "", email: "", interest: "" });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    try {
      await apiRequest("/api/applications", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ name: "", company: "", role: "", phone: "", email: "", interest: "" });
      setStatus("提交成功，秘書處將按資料跟進。");
    } catch (error) {
      setStatus(error.message || "提交失敗，請稍後再試。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero {...pages["/application"]} imageUrl={image.meeting} />
      <section className="section application-panel">
        <div>
          <h2>預登記資料</h2>
          <p>表單會提交至網站後台，秘書處可在後台查看並跟進入會流程。姓名及聯絡電話為必填。</p>
          {status ? <p className="form-status">{status}</p> : null}
        </div>
        <form onSubmit={submit}>
          <label>姓名<input type="text" placeholder="請輸入姓名" value={form.name} onChange={update("name")} required /></label>
          <label>公司名稱<input type="text" placeholder="請輸入公司名稱" value={form.company} onChange={update("company")} /></label>
          <label>職位<input type="text" placeholder="請輸入職位" value={form.role} onChange={update("role")} /></label>
          <label>聯絡電話<input type="tel" placeholder="+852 / +86" value={form.phone} onChange={update("phone")} required /></label>
          <label>電郵地址<input type="email" placeholder="name@example.com" value={form.email} onChange={update("email")} /></label>
          <label className="full">感興趣服務<input type="text" placeholder="例如：政府資助、大灣區對接、行業委員會、企業培訓" value={form.interest} onChange={update("interest")} /></label>
          <button className="primary" type="submit" disabled={submitting}>{submitting ? "提交中..." : "提交預登記"} <ArrowRight size={18} /></button>
        </form>
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

function ResourcesPage({ navigate }) {
  return (
    <>
      <PageHero {...pages["/resources"]} imageUrl={image.gallery[3]} />
      <section className="section resource-list">
        {[
          ["新聞稿", "按年度整理港中聯活動、合作、簽約與會務消息。", "/news"],
          ["政策與商機資訊", "聚合香港及大灣區最新扶持政策、資助計劃及調研摘錄。", "/services"],
          ["公告", "入會公示、會議通知及商會重要事項公告。", "/announcements"],
        ].map(([title, desc, path]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{desc}</p>
            <button className="text-button" onClick={() => navigate(path)}>前往查看 <ArrowRight size={16} /></button>
          </article>
        ))}
      </section>
    </>
  );
}

function AnnouncementsPage() {
  return (
    <>
      <PageHero {...pages["/announcements"]} imageUrl={image.side} />
      <section className="section legal">
        {[
          ["入會公示", "後續可在此發布新會員公示、會籍變更及除名通知。"],
          ["會議通知", "後續可發布會員大會、會董會、監事委員會及行業委員會會議安排。"],
          ["會務公告", "後續可發布秘書處通知、服務調整、活動報名與下載資料更新。"],
        ].map(([title, body]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function DownloadsPage({ navigate, content }) {
  const downloadItems = content.downloads || downloads;
  return (
    <>
      <PageHero {...pages["/downloads"]} imageUrl={image.funding} />
      <section className="section download-list">
        {downloadItems.map(([title, desc, path]) => (
          <button key={title} onClick={() => navigate(path)}>
            <DownloadSimple size={30} />
            <span>{title}</span>
            <p>{desc}</p>
          </button>
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

function ContactPage({ siteContact }) {
  return (
    <>
      <PageHero {...pages["/contact"]} imageUrl={image.side} />
      <section className="section offices">
        <article>
          <Buildings size={34} />
          <h2>香港辦事處</h2>
          <p>{siteContact.addressZh}</p>
          <p>{siteContact.addressEn}</p>
        </article>
        <article>
          <GlobeHemisphereEast size={34} />
          <h2>深圳辦事處</h2>
          <p>歡迎透過秘書處查詢深圳及大灣區合作事宜。</p>
        </article>
        <article>
          <EnvelopeSimple size={34} />
          <h2>聯絡方式</h2>
          <p>{siteContact.email}</p>
          <p>{siteContact.phone}</p>
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

function AdminPage({ navigate }) {
  const emptyNews = { title: "", desc: "", date: "", image: "" };
  const copy = {
    zh: {
      back: "返回網站",
      logout: "登出",
      loginTitle: "港中聯網站後台",
      loginHelp: "請輸入部署時設定的後台密碼。密碼至少 8 位，並需包含字母和數字。",
      password: "後台密碼",
      login: "登入後台",
      adminTitle: "網站後台",
      adminDesc: "管理新聞、網站內容與線上入會預登記資料。",
      newNews: "新增新聞",
      editNews: "編輯新聞",
      title: "標題",
      date: "日期",
      imageUrl: "圖片",
      uploadImage: "上傳圖片",
      summary: "摘要",
      save: "保存修改",
      create: "新增新聞",
      cancel: "取消編輯",
      newsList: "新聞列表",
      refresh: "刷新",
      refreshing: "刷新中",
      edit: "編輯",
      delete: "刪除",
      contentConfig: "網站內容配置",
      contentHelp: "可修改聯絡方式、商會服務、會員權益、下載入口等內容。格式需保持合法 JSON。",
      saveContent: "保存內容配置",
      applications: "入會預登記",
      records: "筆",
      emptyApplications: "暫無預登記資料。",
      passwordWeak: "密碼至少 8 位，並需包含字母和數字。",
      loginOk: "登入成功",
      newsCreated: "新聞已新增",
      newsUpdated: "新聞已更新",
      newsDeleted: "新聞已刪除",
      contentSaved: "網站內容已保存",
      uploadOk: "圖片已上傳並填入圖片欄位",
    },
    en: {
      back: "Back to site",
      logout: "Log out",
      loginTitle: "HCFSME Admin",
      loginHelp: "Enter the admin password set on the server. It must be at least 8 characters and include letters and numbers.",
      password: "Admin password",
      login: "Log in",
      adminTitle: "Admin",
      adminDesc: "Manage news, editable site content, and membership pre-registration records.",
      newNews: "New news",
      editNews: "Edit news",
      title: "Title",
      date: "Date",
      imageUrl: "Image",
      uploadImage: "Upload image",
      summary: "Summary",
      save: "Save changes",
      create: "Create news",
      cancel: "Cancel edit",
      newsList: "News list",
      refresh: "Refresh",
      refreshing: "Refreshing",
      edit: "Edit",
      delete: "Delete",
      contentConfig: "Site content config",
      contentHelp: "Edit contact info, services, member benefits, downloads, and other editable content. Keep valid JSON.",
      saveContent: "Save content config",
      applications: "Applications",
      records: "records",
      emptyApplications: "No applications yet.",
      passwordWeak: "Password must be at least 8 characters and include letters and numbers.",
      loginOk: "Logged in",
      newsCreated: "News created",
      newsUpdated: "News updated",
      newsDeleted: "News deleted",
      contentSaved: "Site content saved",
      uploadOk: "Image uploaded and inserted",
    },
  };
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("hcfsme_admin_token") || "");
  const [lang, setLang] = useState(() => localStorage.getItem("hcfsme_admin_lang") || "zh");
  const [items, setItems] = useState([]);
  const [applications, setApplications] = useState([]);
  const [contentDraft, setContentDraft] = useState(JSON.stringify(defaultEditableContent, null, 2));
  const [draft, setDraft] = useState(emptyNews);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const t = copy[lang] || copy.zh;

  const switchLang = () => {
    const next = lang === "zh" ? "en" : "zh";
    localStorage.setItem("hcfsme_admin_lang", next);
    setLang(next);
  };

  const validPassword = (value) => value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);

  const loadAdminData = async (authToken = token) => {
    if (!authToken) return;
    setLoading(true);
    try {
      const [newsData, appData, contentData] = await Promise.all([
        apiRequest("/api/admin/news", { token: authToken }),
        apiRequest("/api/admin/applications", { token: authToken }),
        apiRequest("/api/admin/content", { token: authToken }),
      ]);
      setItems(newsData.news || []);
      setApplications(appData.applications || []);
      setContentDraft(JSON.stringify({ ...defaultEditableContent, ...(contentData.content || {}) }, null, 2));
    } catch (error) {
      setMessage(error.message || "讀取後台資料失敗");
      if (/Unauthorized|401/.test(error.message)) {
        localStorage.removeItem("hcfsme_admin_token");
        setToken("");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [token]);

  const login = async (event) => {
    event.preventDefault();
    setMessage("");
    if (!validPassword(password)) {
      setMessage(t.passwordWeak);
      return;
    }
    try {
      const data = await apiRequest("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      localStorage.setItem("hcfsme_admin_token", data.token);
      setToken(data.token);
      setPassword("");
      setMessage(t.loginOk);
    } catch (error) {
      setMessage(error.message || "登入失敗");
    }
  };

  const saveNews = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      if (editingId) {
        await apiRequest(`/api/admin/news/${editingId}`, {
          method: "PUT",
          token,
          body: JSON.stringify(draft),
        });
        setMessage(t.newsUpdated);
      } else {
        await apiRequest("/api/admin/news", {
          method: "POST",
          token,
          body: JSON.stringify(draft),
        });
        setMessage(t.newsCreated);
      }
      setDraft(emptyNews);
      setEditingId("");
      await loadAdminData();
    } catch (error) {
      setMessage(error.message || "保存失敗");
    }
  };

  const editNews = (item) => {
    setEditingId(item.id);
    setDraft({ title: item.title || "", desc: item.desc || "", date: item.date || "", image: item.image || "" });
  };

  const deleteNews = async (id) => {
    setMessage("");
    try {
      await apiRequest(`/api/admin/news/${id}`, { method: "DELETE", token });
      setMessage(t.newsDeleted);
      await loadAdminData();
    } catch (error) {
      setMessage(error.message || "刪除失敗");
    }
  };

  const saveContent = async () => {
    setMessage("");
    try {
      const parsed = JSON.parse(contentDraft);
      await apiRequest("/api/admin/content", {
        method: "PUT",
        token,
        body: JSON.stringify({ content: parsed }),
      });
      setMessage(t.contentSaved);
      await loadAdminData();
    } catch (error) {
      setMessage(error.message || "內容保存失敗，請檢查 JSON 格式");
    }
  };

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage("");
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const data = await apiRequest("/api/admin/upload", {
        method: "POST",
        token,
        body: JSON.stringify({ filename: file.name, dataUrl }),
      });
      setDraft((current) => ({ ...current, image: data.url }));
      setMessage(t.uploadOk);
    } catch (error) {
      setMessage(error.message || "圖片上傳失敗");
    } finally {
      event.target.value = "";
    }
  };

  const logout = () => {
    localStorage.removeItem("hcfsme_admin_token");
    setToken("");
    setItems([]);
    setApplications([]);
  };

  if (!token) {
    return (
      <section className="admin-shell">
        <div className="admin-login">
          <div className="admin-lang-row">
            <button className="text-button" onClick={() => navigate("/")}>{t.back}</button>
            <button className="text-button" onClick={switchLang}>{lang === "zh" ? "EN" : "中文"}</button>
          </div>
          <h1>{t.loginTitle}</h1>
          <p>{t.loginHelp}</p>
          <form onSubmit={login}>
            <label>{t.password}<input type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            <button className="primary" type="submit">{t.login}</button>
          </form>
          {message ? <p className="form-status">{message}</p> : null}
        </div>
      </section>
    );
  }

  return (
    <section className="admin-shell">
      <div className="admin-top">
        <div>
          <p className="kicker">HCFSME Admin</p>
          <h1>{t.adminTitle}</h1>
          <p>{t.adminDesc}</p>
        </div>
        <div>
          <button className="secondary" onClick={switchLang}>{lang === "zh" ? "English" : "中文"}</button>
          <button className="secondary" onClick={() => navigate("/")}>{t.back}</button>
          <button className="secondary" onClick={logout}>{t.logout}</button>
        </div>
      </div>

      {message ? <p className="form-status admin-message">{message}</p> : null}

      <section className="admin-grid">
        <form className="admin-panel admin-form" onSubmit={saveNews}>
          <h2>{editingId ? t.editNews : t.newNews}</h2>
          <label>{t.title}<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} required /></label>
          <label>{t.date}<input value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} placeholder="2026 年 6 月 24 日" /></label>
          <label>{t.imageUrl}<input value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} placeholder="https://..." /></label>
          <label className="upload-button">
            {t.uploadImage}
            <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={uploadImage} />
          </label>
          <label>{t.summary}<textarea value={draft.desc} onChange={(event) => setDraft({ ...draft, desc: event.target.value })} rows={5} /></label>
          <div className="admin-actions">
            <button className="primary" type="submit">{editingId ? t.save : t.create}</button>
            {editingId ? <button className="secondary" type="button" onClick={() => { setEditingId(""); setDraft(emptyNews); }}>{t.cancel}</button> : null}
          </div>
        </form>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2>{t.newsList}</h2>
            <button className="text-button" onClick={() => loadAdminData()}>{loading ? t.refreshing : t.refresh}</button>
          </div>
          <div className="admin-list">
            {items.map((item) => (
              <article key={item.id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                </div>
                <div>
                  <button className="text-button" onClick={() => editNews(item)}>{t.edit}</button>
                  <button className="text-button danger" onClick={() => deleteNews(item.id)}>{t.delete}</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-panel content-panel">
        <div className="admin-panel-head">
          <div>
            <h2>{t.contentConfig}</h2>
            <p>{t.contentHelp}</p>
          </div>
          <button className="primary" onClick={saveContent}>{t.saveContent}</button>
        </div>
        <textarea value={contentDraft} onChange={(event) => setContentDraft(event.target.value)} rows={18} />
      </section>

      <section className="admin-panel applications-panel">
        <div className="admin-panel-head">
          <h2>{t.applications}</h2>
          <span>{applications.length} {t.records}</span>
        </div>
        <div className="application-table">
          {applications.map((item) => (
            <article key={item.id}>
              <strong>{item.name}</strong>
              <span>{item.company || "未填公司"}</span>
              <span>{item.role || "未填職位"}</span>
              <span>{item.phone}</span>
              <span>{item.email || "未填電郵"}</span>
              <p>{item.interest || "未填感興趣服務"}</p>
            </article>
          ))}
          {!applications.length ? <p>{t.emptyApplications}</p> : null}
        </div>
      </section>
    </section>
  );
}

function Footer({ navigate, siteContact }) {
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
            <button key={`${item.path}-${item.label}`} onClick={() => navigate(item.path)}>{item.label}</button>
          ))}
        </div>
        <div>
          <h3>Contact Us</h3>
          <p><Phone size={16} /> {siteContact.phone}</p>
          <p><EnvelopeSimple size={16} /> {siteContact.email}</p>
          <p><MapPin size={16} /> {siteContact.addressZh}</p>
        </div>
      </div>
      <div className="copyright">© 1998-2026 港中聯 版權所有</div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
