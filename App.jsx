import { useState, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES — clean, modern, light/dark gradient design (not black/gold)
═══════════════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,300;0,700;1,300;1,700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

:root {
  --bg:         #f0ede8;
  --bg2:        #e8e3dc;
  --white:      #faf9f7;
  --surface:    #ffffff;
  --surface2:   #f5f3ef;
  --border:     rgba(0,0,0,0.08);
  --border2:    rgba(0,0,0,0.14);
  --text:       #1a1714;
  --text2:      #6b6560;
  --accent:     #2563eb;
  --accent-h:   #1d4ed8;
  --accent-s:   rgba(37,99,235,0.1);
  --green:      #16a34a;
  --green-s:    rgba(22,163,74,0.1);
  --red:        #dc2626;
  --red-s:      rgba(220,38,38,0.08);
  --amber:      #d97706;
  --r:          12px;
  --shadow:     0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06);
  --shadow-lg:  0 4px 24px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08);
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* ── LAYOUT ── */
.wrap { max-width: 1080px; margin: 0 auto; padding: 0 20px 100px; }

/* ── TOPBAR ── */
.topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 0; margin-bottom: 32px;
  border-bottom: 1px solid var(--border);
}
.logo {
  font-family: 'Fraunces', serif;
  font-size: 22px; font-weight: 700; color: var(--text);
  display: flex; align-items: center; gap: 8px;
}
.logo-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
.topbar-badge {
  padding: 5px 12px; border-radius: 100px; font-size: 11px; font-weight: 600;
  background: var(--accent-s); color: var(--accent); letter-spacing: 0.5px;
}

/* ── HERO ── */
.hero {
  display: grid; grid-template-columns: 1fr auto;
  gap: 24px; align-items: end;
  margin-bottom: 40px;
}
@media(max-width:640px){ .hero{ grid-template-columns:1fr; } .hero-right{display:none;} }
.hero-label {
  font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  color: var(--accent); margin-bottom: 12px;
  display: flex; align-items: center; gap: 8px;
}
.hero-label::before { content:''; width:20px; height:2px; background:var(--accent); border-radius:2px; }
h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(36px, 5.5vw, 62px);
  font-weight: 700; line-height: 1.05;
  letter-spacing: -1.5px; color: var(--text);
  margin-bottom: 14px;
}
h1 span { font-style: italic; color: var(--accent); }
.hero-sub {
  font-size: 15px; font-weight: 400; color: var(--text2);
  line-height: 1.65; max-width: 520px;
}
.hero-stats {
  display: flex; flex-direction: column; gap: 10px; align-items: flex-end;
}
.stat-pill {
  display: flex; align-items: center; gap: 10px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 100px; padding: 8px 16px;
  font-size: 13px; font-weight: 500; white-space: nowrap;
  box-shadow: var(--shadow);
}
.stat-pill-icon { font-size: 16px; }

/* ── MAIN GRID ── */
.main-grid {
  display: grid; grid-template-columns: 340px 1fr;
  gap: 20px; align-items: start;
}
@media(max-width:800px){ .main-grid{ grid-template-columns:1fr; } }

/* ── PANEL / CARD ── */
.panel {
  background: var(--surface); border-radius: 16px;
  border: 1px solid var(--border); box-shadow: var(--shadow);
  overflow: hidden;
}
.panel-head {
  padding: 18px 20px 16px; border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 10px;
}
.panel-icon {
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--accent-s); color: var(--accent);
  display: flex; align-items: center; justify-content: center; font-size: 16px;
}
.panel-title { font-size: 14px; font-weight: 700; }
.panel-subtitle { font-size: 12px; color: var(--text2); margin-top: 1px; }
.panel-body { padding: 20px; }

/* ── UPLOAD ── */
.upload-zone {
  border: 2px dashed var(--border2); border-radius: 12px;
  background: var(--surface2); cursor: pointer;
  transition: all 0.2s; position: relative; overflow: hidden;
  text-align: center; padding: 36px 20px;
}
.upload-zone:hover, .upload-zone.drag {
  border-color: var(--accent); background: var(--accent-s);
}
.upload-zone input[type=file] {
  position: absolute; inset: 0; opacity: 0; cursor: pointer; width:100%; height:100%;
}
.upload-emoji { font-size: 36px; margin-bottom: 10px; display: block; }
.upload-main { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.upload-sub  { font-size: 12px; color: var(--text2); }
.upload-btn-hint {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 12px; padding: 7px 16px; border-radius: 8px;
  background: var(--accent); color: white; font-size: 12px; font-weight: 600;
}

.preview-box {
  border-radius: 12px; overflow: hidden; position: relative;
  background: var(--surface2); border: 1px solid var(--border);
}
.preview-img { width: 100%; display: block; max-height: 280px; object-fit: contain; }
.preview-overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 12px; background: linear-gradient(transparent, rgba(0,0,0,0.5));
  display: flex; justify-content: flex-end;
}
.change-btn {
  padding: 6px 12px; border-radius: 8px; border: none;
  background: rgba(255,255,255,0.9); color: var(--text);
  font-size: 12px; font-weight: 600; cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  backdrop-filter: blur(4px);
}

/* ── FORM ── */
.field { margin-bottom: 14px; }
.field-label {
  display: block; font-size: 11px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: var(--text2); margin-bottom: 6px;
}
input[type=text], textarea, select {
  width: 100%; background: var(--surface2); border: 1px solid var(--border2);
  border-radius: 10px; padding: 11px 14px; color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px;
  outline: none; transition: all 0.2s; resize: vertical;
  -webkit-appearance: none;
}
input[type=text]:focus, textarea:focus, select:focus {
  border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-s);
}
input[type=text]::placeholder, textarea::placeholder { color: var(--text2); opacity: 0.7; }
textarea { min-height: 64px; }
select { cursor: pointer; }
input:disabled, textarea:disabled, select:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── API KEY ── */
.api-row { display: flex; gap: 8px; align-items: stretch; }
.api-row input { flex: 1; }
.eye-btn {
  padding: 0 14px; border-radius: 10px; border: 1px solid var(--border2);
  background: var(--surface2); cursor: pointer; font-size: 16px;
  transition: border-color 0.2s; flex-shrink: 0;
}
.eye-btn:hover { border-color: var(--accent); }
.api-ok {
  display: flex; align-items: center; gap: 8px;
  background: var(--green-s); border: 1px solid rgba(22,163,74,0.25);
  border-radius: 10px; padding: 10px 14px; font-size: 13px; font-weight: 500; color: var(--green);
  margin-top: 8px;
}

/* ── SHOTS ── */
.shots-grid { display: flex; flex-direction: column; gap: 8px; }
.shot-item {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 12px 14px; border-radius: 10px; border: 1px solid var(--border2);
  background: var(--surface2); cursor: pointer; transition: all 0.18s; user-select: none;
}
.shot-item:hover { border-color: var(--accent); }
.shot-item.on { border-color: var(--accent); background: var(--accent-s); }
.shot-cb {
  width: 18px; height: 18px; border-radius: 5px; border: 1.5px solid var(--border2);
  flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center;
  transition: all 0.18s; font-size: 11px;
}
.shot-item.on .shot-cb { background: var(--accent); border-color: var(--accent); color: white; }
.shot-info { flex: 1; min-width: 0; }
.shot-name { font-size: 13px; font-weight: 600; line-height: 1.3; margin-bottom: 2px; }
.shot-desc { font-size: 11px; color: var(--text2); line-height: 1.4; }
.shot-badge {
  font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  padding: 2px 7px; border-radius: 100px; flex-shrink: 0; margin-top: 2px;
}
.b-gpt { background: var(--accent-s); color: var(--accent); }
.b-life { background: var(--green-s); color: var(--green); }

/* ── OPTIONS GRID ── */
.opts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media(max-width:480px){ .opts-grid{ grid-template-columns:1fr; } }
.opt-card {
  border: 1px solid var(--border2); border-radius: 10px; padding: 12px;
  cursor: pointer; transition: all 0.18s; background: var(--surface2); user-select: none;
}
.opt-card.on { border-color: var(--accent); background: var(--accent-s); }
.opt-card:hover:not(.on) { border-color: rgba(37,99,235,0.3); }
.opt-card-emoji { font-size: 22px; margin-bottom: 6px; }
.opt-card-label { font-size: 12px; font-weight: 600; margin-bottom: 2px; }
.opt-card-desc  { font-size: 11px; color: var(--text2); }

/* ── QUALITY / STYLE SELECTS ── */
.select-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media(max-width:480px){ .select-row{ grid-template-columns:1fr; } }

/* ── GEN BUTTON ── */
.gen-btn {
  width: 100%; padding: 16px 24px; border: none; border-radius: 12px;
  background: var(--accent); color: white; font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  box-shadow: 0 4px 20px rgba(37,99,235,0.3);
  margin-top: 20px;
}
.gen-btn:hover:not(:disabled) {
  background: var(--accent-h); transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(37,99,235,0.35);
}
.gen-btn:active:not(:disabled) { transform: none; }
.gen-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
.spin {
  width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white; border-radius: 50%;
  animation: rot 0.7s linear infinite;
}
@keyframes rot { to { transform: rotate(360deg); } }

/* ── COUNT BADGE ── */
.count-badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 20px; border-radius: 100px; padding: 0 6px;
  background: var(--accent); color: white; font-size: 11px; font-weight: 700;
}

/* ── ERR / WARN ── */
.err-box {
  background: var(--red-s); border: 1px solid rgba(220,38,38,0.2);
  border-radius: 10px; padding: 12px 16px; color: var(--red);
  font-size: 13px; margin-top: 14px; display: flex; align-items: flex-start; gap: 8px;
}

/* ── PROGRESS ── */
.prog-wrap { margin-top: 20px; }
.prog-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
.prog-label { font-size: 12px; font-weight: 600; color: var(--text2); }
.prog-pct   { font-size: 12px; font-weight: 700; color: var(--accent); }
.prog-bar   { height: 4px; background: var(--border2); border-radius: 100px; overflow: hidden; margin-bottom: 14px; }
.prog-fill  { height: 100%; background: var(--accent); border-radius: 100px; transition: width 0.4s ease; }
.prog-items { display: flex; flex-direction: column; gap: 6px; }
.prog-item  {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; border-radius: 8px; background: var(--surface2);
  border: 1px solid var(--border); font-size: 12px;
}
.prog-item.done  { border-color: rgba(22,163,74,0.25); background: var(--green-s); }
.prog-item.active{ border-color: rgba(37,99,235,0.25); background: var(--accent-s); }
.prog-item.error { border-color: rgba(220,38,38,0.2); background: var(--red-s); }
.pdot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.pdot.idle    { background: var(--border2); }
.pdot.loading { background: var(--accent); animation: pulse 1s ease-in-out infinite; }
.pdot.done    { background: var(--green); }
.pdot.error   { background: var(--red); }
@keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.2;} }
.prog-name { flex: 1; font-weight: 500; }
.prog-st   { font-size: 11px; color: var(--text2); }
.prog-st.done  { color: var(--green); font-weight: 600; }
.prog-st.error { color: var(--red); }

/* ── RIGHT COLUMN ── */
.right-col { display: flex; flex-direction: column; gap: 20px; }

/* ── RESULTS ── */
.results-panel {
  background: var(--surface); border-radius: 16px;
  border: 1px solid var(--border); box-shadow: var(--shadow); overflow: hidden;
}
.results-head {
  padding: 18px 20px; border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.results-title { font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 10px; }
.results-meta  { font-size: 12px; color: var(--text2); }
.results-grid  {
  padding: 16px;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px;
}

.res-card {
  border-radius: 12px; border: 1px solid var(--border);
  background: var(--surface2); overflow: hidden; transition: all 0.2s;
}
.res-card:hover { border-color: var(--border2); box-shadow: var(--shadow); transform: translateY(-2px); }

.res-img { aspect-ratio: 1; background: var(--bg2); position: relative; overflow: hidden; }
.res-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

.res-spinner-wrap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
}
.res-big-spin {
  width: 32px; height: 32px; border: 2px solid var(--border2);
  border-top-color: var(--accent); border-radius: 50%;
  animation: rot 0.8s linear infinite;
}
.res-spin-lbl { font-size: 11px; color: var(--text2); font-weight: 500; }

.res-err-wrap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 16px; gap: 8px; background: var(--red-s);
}
.res-err-icon { font-size: 24px; }
.res-err-txt  { font-size: 11px; color: var(--red); text-align: center; line-height: 1.5; }

.res-info { padding: 12px 14px; }
.res-name  { font-size: 13px; font-weight: 700; margin-bottom: 2px; }
.res-sub   { font-size: 11px; color: var(--text2); margin-bottom: 10px; line-height: 1.4; }
.res-actions { display: flex; gap: 8px; }
.dl-btn, .copy-btn {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px;
  padding: 8px 10px; border-radius: 8px; font-size: 11px; font-weight: 600;
  cursor: pointer; text-decoration: none; transition: all 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif; border: 1px solid var(--border2);
}
.dl-btn   { background: var(--accent); color: white; border-color: var(--accent); }
.dl-btn:hover { background: var(--accent-h); }
.copy-btn { background: var(--surface); color: var(--text); }
.copy-btn:hover { border-color: var(--accent); color: var(--accent); }

/* ── EMPTY STATE ── */
.empty-state {
  padding: 60px 20px; text-align: center;
}
.empty-icon { font-size: 48px; margin-bottom: 14px; opacity: 0.4; }
.empty-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
.empty-sub   { font-size: 13px; color: var(--text2); line-height: 1.5; max-width: 320px; margin: 0 auto; }

/* ── HOW IT WORKS ── */
.how-panel {
  background: var(--surface); border-radius: 16px;
  border: 1px solid var(--border); box-shadow: var(--shadow); padding: 20px;
}
.how-title { font-size: 13px; font-weight: 700; margin-bottom: 14px; color: var(--text2); text-transform: uppercase; letter-spacing: 1px; }
.how-steps { display: flex; flex-direction: column; gap: 12px; }
.how-step  { display: flex; align-items: flex-start; gap: 12px; }
.how-num   {
  width: 24px; height: 24px; border-radius: 50%; background: var(--accent);
  color: white; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.how-text  { font-size: 13px; color: var(--text2); line-height: 1.45; padding-top: 2px; }
.how-text strong { color: var(--text); }

/* ── FOOTER ── */
.footer {
  margin-top: 60px; padding-top: 20px; border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
}
.footer-logo { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; }
.footer-note { font-size: 11px; color: var(--text2); }

/* ── DIVIDER ── */
.divider { height: 1px; background: var(--border); margin: 16px 0; }

/* ── SELALL BTN ── */
.sel-all-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.sel-all-btn { font-size: 12px; color: var(--accent); background: none; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; }

/* ── SCROLL LOCK ── */
.scroll-hint { font-size: 11px; color: var(--text2); text-align: center; margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 6px; }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   SHOT DEFINITIONS
═══════════════════════════════════════════════════════════════════════════ */
function buildShots(name, desc, style, background, aspect) {
  const brand   = `${name}${desc ? ` — ${desc}` : ""}`;
  const styleMap = {
    "hyperrealistic": "hiper-realistyczny, fotograficzny, bardzo szczegółowy",
    "cinematic":      "kinematograficzny, dramatyczne oświetlenie, filmowy styl",
    "minimal":        "minimalistyczny, czyste tło, studio lighting",
    "editorial":      "editorialowy, magazynowy, ekspresyjny",
    "ecommerce":      "e-commerce, białe tło, czyste ujęcie produktowe",
  };
  const bgMap = {
    "natural":     "naturalne, realistyczne środowisko pasujące do produktu",
    "studio":      "studio fotograficzne, neutralne tło",
    "outdoor":     "plener, świeże powietrze, naturalne światło słoneczne",
    "home":        "wnętrze domowe, ciepłe i przytulne otoczenie",
    "luxury":      "luksusowe, eleganckie otoczenie z detalami premium",
    "urban":       "miejskie, nowoczesne, uliczne otoczenie",
  };
  const aspectMap = { "1:1": "1:1", "4:5": "4:5 (pionowe)", "16:9": "16:9 (poziome)" };
  const styleTxt = styleMap[style] || styleMap["hyperrealistic"];
  const bgTxt    = bgMap[background] || bgMap["natural"];
  const aspTxt   = aspectMap[aspect] || "1:1";

  const base = `Popraw jakość tego zdjęcia produktowego by wyglądało profesjonalnie i nadawało się na marketplace. Produkt: ${brand}. Styl: ${styleTxt}. Tło/otoczenie: ${bgTxt}. Produkt dobrze oświetlony, przeniesiony bardzo starannie 1:1, umieszczony centralnie, wyraźne detale. Zachowaj ujęcie i kadr. Proporcje: ${aspTxt}. Rozdzielczość 4K.`;

  return [
    {
      id: "hero",
      label: "Główne ujęcie produktu",
      type: "gpt", badge: "GPT-4o",
      desc: "Pełna prezentacja z profesjonalnym tłem",
      prompt: base,
    },
    {
      id: "detail1",
      label: "Zbliżenie — detale",
      type: "gpt", badge: "GPT-4o",
      desc: "Makro ujęcie na fakturę i wykończenie",
      prompt: base + " Ujęcie z bardzo bliska na kluczowe detale, fakturę i jakość materiału produktu.",
    },
    {
      id: "action",
      label: "Produkt w użyciu",
      type: "gpt", badge: "GPT-4o",
      desc: "Funkcjonalność i działanie produktu",
      prompt: base + " Ujęcie dynamiczne pokazujące produkt w aktywnym użyciu i jego główną funkcję.",
    },
    {
      id: "feature",
      label: "Kluczowa cecha produktu",
      type: "gpt", badge: "GPT-4o",
      desc: "Wyróżnik / USP produktu wizualnie",
      prompt: base + " Ujęcie eksponujące najważniejszą cechę lub przewagę produktu (np. wodoodporność, wytrzymałość, innowację).",
    },
    {
      id: "angle2",
      label: "Alternatywna perspektywa",
      type: "gpt", badge: "GPT-4o",
      desc: "Inne ujęcie kąta lub widoku produktu",
      prompt: base + " Ujęcie produktu z innej, ciekawej perspektywy lub kąta (widok z góry, z boku, pod kątem 45°).",
    },
    {
      id: "lifestyle1",
      label: "Lifestyle — z osobą",
      type: "lifestyle", badge: "Lifestyle",
      desc: "Osoba korzystająca w naturalnym otoczeniu",
      prompt: `Professional lifestyle product photography. Product: ${brand}. Show a real person naturally using the product in a beautiful aspirational setting. ${styleTxt} style. Warm authentic lighting. Editorial magazine feel. ${aspTxt} format. 4K.`,
    },
    {
      id: "lifestyle2",
      label: "Lifestyle — scena",
      type: "lifestyle", badge: "Lifestyle",
      desc: "Produkt w pięknej scenografii bez ludzi",
      prompt: `Premium lifestyle product photography. Product: ${brand}. Beautifully styled scene, no people. ${bgTxt} atmosphere. ${styleTxt} style. Luxury brand campaign look. ${aspTxt} format. 4K.`,
    },
    {
      id: "packshot",
      label: "Packshot — na białym tle",
      type: "gpt", badge: "GPT-4o",
      desc: "Klasyczny packshot jak Amazon/Allegro",
      prompt: `Professional product packshot photography. Product: ${brand}. Pure white background, perfect studio lighting, product perfectly centered and sharp. E-commerce standard. ${aspTxt} format. 4K.`,
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════════════════
   API CALL
═══════════════════════════════════════════════════════════════════════════ */
async function generateImage(imgB64, prompt, apiKey) {
  const mime    = (imgB64.match(/^data:([^;]+);/) || [])[1] || "image/png";
  const bytes   = atob(imgB64.split(",")[1]);
  const arr     = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  const blob    = new Blob([arr], { type: mime });

  // Try gpt-image-1 first
  const tryAPI = async (model, promptText) => {
    const fd = new FormData();
    fd.append("image",  blob, "product.png");
    fd.append("prompt", promptText);
    fd.append("model",  model);
    fd.append("size",   "1024x1024");
    fd.append("n",      "1");
    const r = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: fd,
    });
    const d = await r.json();
    if (d.error) throw new Error(d.error.message);
    if (d.data?.[0]?.b64_json) return "data:image/png;base64," + d.data[0].b64_json;
    if (d.data?.[0]?.url)      return d.data[0].url;
    throw new Error("Brak odpowiedzi z API.");
  };

  try {
    return await tryAPI("gpt-image-1", prompt);
  } catch (e) {
    // Fallback to dall-e-2
    if (e.message.match(/model|not.found|not.exist|access|permission/i)) {
      return await tryAPI("dall-e-2", prompt.substring(0, 950));
    }
    throw e;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [apiKey,  setApiKey]  = useState("");
  const [showKey, setShowKey] = useState(false);
  const [imgPrev, setImgPrev] = useState(null);
  const [imgB64,  setImgB64]  = useState(null);
  const [name,    setName]    = useState("");
  const [desc,    setDesc]    = useState("");
  const [style,   setStyle]   = useState("hyperrealistic");
  const [bg,      setBg]      = useState("natural");
  const [aspect,  setAspect]  = useState("1:1");
  const [drag,    setDrag]    = useState(false);
  const [sel,     setSel]     = useState([0,1,2,5,6]);
  const [jobs,    setJobs]    = useState([]);
  const [running, setRunning] = useState(false);
  const [err,     setErr]     = useState("");
  const [copied,  setCopied]  = useState(null);
  const fileRef = useRef();

  const shots = buildShots(name || "produkt", desc, style, bg, aspect);
  const doneJobs  = jobs.filter(j => j.status === "done").length;
  const totalJobs = jobs.length;
  const pct = totalJobs ? Math.round((doneJobs / totalJobs) * 100) : 0;

  /* IMAGE UPLOAD — fixed: handles File objects properly */
  const loadFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setErr("Dozwolone formaty: JPG, PNG, WEBP, GIF."); return; }
    if (file.size > 20 * 1024 * 1024)    { setErr("Plik za duży — max 20MB."); return; }
    setErr("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPrev(reader.result);
      setImgB64(reader.result);
    };
    reader.onerror = () => setErr("Błąd wczytywania pliku. Spróbuj innego.");
    reader.readAsDataURL(file);
  };

  const onInputChange = (e) => loadFile(e.target.files?.[0]);
  const onDrop = useCallback((e) => {
    e.preventDefault(); setDrag(false);
    loadFile(e.dataTransfer.files?.[0]);
  }, []);
  const onDragOver  = (e) => { e.preventDefault(); setDrag(true); };
  const onDragLeave = ()  => setDrag(false);

  const toggleSel = (i) =>
    setSel(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  const allSel = sel.length === shots.length;

  const generate = async () => {
    if (!apiKey.trim())   { setErr("Wklej klucz OpenAI API."); return; }
    if (!imgB64)          { setErr("Wgraj zdjęcie produktu."); return; }
    if (!name.trim())     { setErr("Podaj nazwę produktu."); return; }
    if (sel.length === 0) { setErr("Wybierz min. 1 ujęcie."); return; }
    setErr(""); setRunning(true);

    const ordered = [...sel].sort((a, b) => a - b);
    const init = ordered.map(i => ({ ...shots[i], status: "pending", url: null, error: null }));
    setJobs(init);

    for (let i = 0; i < ordered.length; i++) {
      setJobs(p => p.map((j, x) => x === i ? { ...j, status: "loading" } : j));
      try {
        const url = await generateImage(imgB64, shots[ordered[i]].prompt, apiKey.trim());
        setJobs(p => p.map((j, x) => x === i ? { ...j, status: "done", url } : j));
      } catch (e) {
        setJobs(p => p.map((j, x) => x === i ? { ...j, status: "error", error: e.message } : j));
      }
    }
    setRunning(false);
  };

  const copyImg = async (url, id) => {
    try {
      const r = await fetch(url);
      const blob = await r.blob();
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      setCopied(id); setTimeout(() => setCopied(null), 2000);
    } catch { setCopied(id); setTimeout(() => setCopied(null), 2000); }
  };

  const dotCls  = s => ({ loading:"loading", done:"done", error:"error" })[s] || "idle";
  const itemCls = s => ({ loading:"active", done:"done", error:"error" })[s] || "";
  const stTxt   = s => ({ loading:"Generuję…", done:"✓ Gotowe", error:"Błąd", pending:"Oczekuje" })[s] || "";
  const stCls   = s => ({ done:"done", error:"error" })[s] || "";

  const hasResults = jobs.some(j => j.status !== "pending");

  return (
    <>
      <style>{CSS}</style>
      <div className="wrap">

        {/* TOPBAR */}
        <div className="topbar">
          <div className="logo"><span className="logo-dot"/>PhotoAI Studio</div>
          <div className="topbar-badge">GPT-4o · Beta</div>
        </div>

        {/* HERO */}
        <div className="hero">
          <div>
            <div className="hero-label">AI Product Photography</div>
            <h1>Profesjonalne<br/>zdjęcia <span>produktowe</span><br/>w minutę</h1>
            <p className="hero-sub">
              Wgraj jedno zdjęcie — aplikacja automatycznie generuje kompletny
              zestaw fotografii na Allegro, Amazon, Instagram i inne platformy.
              Napędzane przez GPT-4o.
            </p>
          </div>
          <div className="hero-stats hero-right">
            <div className="stat-pill"><span className="stat-pill-icon">⚡</span> GPT-image-1 / DALL-E 2</div>
            <div className="stat-pill"><span className="stat-pill-icon">📦</span> Do 8 ujęć naraz</div>
            <div className="stat-pill"><span className="stat-pill-icon">💾</span> Pobieranie PNG</div>
          </div>
        </div>

        {/* MAIN 2-COL GRID */}
        <div className="main-grid">

          {/* ─── LEFT COLUMN — CONTROLS ─── */}
          <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>

            {/* API KEY */}
            <div className="panel">
              <div className="panel-head">
                <div className="panel-icon">🔑</div>
                <div>
                  <div className="panel-title">OpenAI API Key</div>
                  <div className="panel-subtitle">Wymagany do generowania</div>
                </div>
              </div>
              <div className="panel-body">
                <div className="api-row">
                  <input
                    type={showKey ? "text" : "password"}
                    placeholder="sk-proj-..."
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    disabled={running}
                  />
                  <button className="eye-btn" onClick={() => setShowKey(s => !s)}>{showKey ? "🙈" : "👁"}</button>
                </div>
                {apiKey.length > 20 && (
                  <div className="api-ok">✓ Klucz wpisany — tylko w Twojej przeglądarce</div>
                )}
                <p style={{fontSize:11,color:"var(--text2)",marginTop:8,lineHeight:1.5}}>
                  Utwórz klucz: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" style={{color:"var(--accent)"}}>platform.openai.com/api-keys</a>
                </p>
              </div>
            </div>

            {/* UPLOAD */}
            <div className="panel">
              <div className="panel-head">
                <div className="panel-icon">🖼</div>
                <div>
                  <div className="panel-title">Zdjęcie produktu</div>
                  <div className="panel-subtitle">JPG, PNG, WEBP — max 20MB</div>
                </div>
              </div>
              <div className="panel-body">
                {!imgPrev ? (
                  <div
                    className={`upload-zone ${drag ? "drag" : ""}`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={onInputChange}
                      ref={fileRef}
                    />
                    <span className="upload-emoji">📂</span>
                    <div className="upload-main">Przeciągnij tu zdjęcie</div>
                    <div className="upload-sub">lub kliknij przycisk poniżej</div>
                    <div className="upload-btn-hint">
                      <span>📁</span> Wybierz plik
                    </div>
                  </div>
                ) : (
                  <div className="preview-box">
                    <img src={imgPrev} className="preview-img" alt="Podgląd produktu"/>
                    <div className="preview-overlay">
                      <button className="change-btn" onClick={() => { setImgPrev(null); setImgB64(null); }}>
                        ✕ Zmień zdjęcie
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="panel">
              <div className="panel-head">
                <div className="panel-icon">📝</div>
                <div>
                  <div className="panel-title">Informacje o produkcie</div>
                  <div className="panel-subtitle">Nazwa + opis</div>
                </div>
              </div>
              <div className="panel-body">
                <div className="field">
                  <label className="field-label">Nazwa produktu *</label>
                  <input type="text"
                    placeholder="np. Żywołapka, buty trekkingowe, kawa..."
                    value={name} onChange={e => setName(e.target.value)} disabled={running}/>
                </div>
                <div className="field">
                  <label className="field-label">Dodatkowy opis (opcjonalny)</label>
                  <textarea
                    placeholder="np. Wodoodporna, czarna, stal nierdzewna, dla dzieci..."
                    value={desc} onChange={e => setDesc(e.target.value)} disabled={running}/>
                </div>
              </div>
            </div>

            {/* STYLE OPTIONS */}
            <div className="panel">
              <div className="panel-head">
                <div className="panel-icon">🎨</div>
                <div>
                  <div className="panel-title">Opcje generowania</div>
                  <div className="panel-subtitle">Styl, tło, proporcje</div>
                </div>
              </div>
              <div className="panel-body">
                <div className="field">
                  <label className="field-label">Styl fotograficzny</label>
                  <select value={style} onChange={e => setStyle(e.target.value)} disabled={running}>
                    <option value="hyperrealistic">🔆 Hiper-realistyczny (domyślny)</option>
                    <option value="cinematic">🎬 Kinematograficzny</option>
                    <option value="minimal">⬜ Minimalistyczny</option>
                    <option value="editorial">📰 Editorialowy / magazynowy</option>
                    <option value="ecommerce">🛒 E-commerce (czyste tło)</option>
                  </select>
                </div>
                <div className="field">
                  <label className="field-label">Typ tła / otoczenia</label>
                  <select value={bg} onChange={e => setBg(e.target.value)} disabled={running}>
                    <option value="natural">🌿 Naturalne otoczenie</option>
                    <option value="studio">💡 Studio (neutralne)</option>
                    <option value="outdoor">🏔 Plener / outdoor</option>
                    <option value="home">🏠 Wnętrze domowe</option>
                    <option value="luxury">✨ Luksusowe</option>
                    <option value="urban">🏙 Miejskie / urban</option>
                  </select>
                </div>
                <div className="field" style={{marginBottom:0}}>
                  <label className="field-label">Proporcje kadru</label>
                  <div className="opts-grid">
                    {[
                      {v:"1:1",  e:"⬜", l:"1:1",  d:"Instagram / Allegro"},
                      {v:"4:5",  e:"📱", l:"4:5",  d:"Instagram pionowe"},
                      {v:"16:9", e:"🖥",  l:"16:9", d:"Banner / WWW"},
                    ].map(o => (
                      <div key={o.v} className={`opt-card ${aspect===o.v?"on":""}`} onClick={() => !running && setAspect(o.v)}>
                        <div className="opt-card-emoji">{o.e}</div>
                        <div className="opt-card-label">{o.l}</div>
                        <div className="opt-card-desc">{o.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SHOT SELECTOR */}
            <div className="panel">
              <div className="panel-head">
                <div className="panel-icon">📸</div>
                <div>
                  <div className="panel-title">Ujęcia do wygenerowania</div>
                  <div className="panel-subtitle">Wybierz co chcesz</div>
                </div>
              </div>
              <div className="panel-body">
                <div className="sel-all-row">
                  <span style={{fontSize:12,color:"var(--text2)"}}>
                    Zaznaczono: <span className="count-badge">{sel.length}</span> / {shots.length}
                  </span>
                  <button className="sel-all-btn" onClick={() => setSel(allSel ? [] : shots.map((_,i)=>i))}>
                    {allSel ? "Odznacz wszystkie" : "Zaznacz wszystkie"}
                  </button>
                </div>
                <div className="shots-grid">
                  {shots.map((s, i) => (
                    <div key={s.id} className={`shot-item ${sel.includes(i)?"on":""}`}
                      onClick={() => !running && toggleSel(i)}>
                      <div className={`shot-cb`}>{sel.includes(i)?"✓":""}</div>
                      <div className="shot-info">
                        <div className="shot-name">{s.label}</div>
                        <div className="shot-desc">{s.desc}</div>
                      </div>
                      <span className={`shot-badge ${s.type==="gpt"?"b-gpt":"b-life"}`}>{s.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ERROR */}
            {err && <div className="err-box"><span>⚠️</span> {err}</div>}

            {/* GENERATE BUTTON */}
            <button className="gen-btn" onClick={generate} disabled={running || !apiKey || !imgB64 || !name}>
              {running
                ? <><div className="spin"/> Generuję… {pct}%</>
                : <>✦ Wygeneruj {sel.length} zdjęć</>
              }
            </button>

            {/* PROGRESS */}
            {running && jobs.length > 0 && (
              <div className="panel">
                <div className="panel-body">
                  <div className="prog-wrap" style={{marginTop:0}}>
                    <div className="prog-header">
                      <span className="prog-label">Postęp</span>
                      <span className="prog-pct">{doneJobs} / {totalJobs}</span>
                    </div>
                    <div className="prog-bar">
                      <div className="prog-fill" style={{width:`${pct}%`}}/>
                    </div>
                    <div className="prog-items">
                      {jobs.map((j,i) => (
                        <div key={i} className={`prog-item ${itemCls(j.status)}`}>
                          <div className={`pdot ${dotCls(j.status)}`}/>
                          <span className="prog-name">{j.label}</span>
                          <span className={`prog-st ${stCls(j.status)}`}>{stTxt(j.status)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ─── RIGHT COLUMN — RESULTS ─── */}
          <div className="right-col">

            {/* HOW IT WORKS */}
            {!hasResults && (
              <div className="how-panel">
                <div className="how-title">Jak to działa</div>
                <div className="how-steps">
                  {[
                    ["Wklej klucz OpenAI API", "Potrzebujesz dostępu do gpt-image-1 lub DALL-E 2."],
                    ["Wgraj zdjęcie produktu", "Najlepiej białe tło lub czyste ujęcie produktu."],
                    ["Podaj nazwę i opis", "Im dokładniej opiszesz, tym lepszy wynik."],
                    ["Wybierz styl i ujęcia", "8 rodzajów ujęć, 5 stylów, 3 typy proporcji."],
                    ["Kliknij Wygeneruj", "Każde zdjęcie generuje się osobno, widzisz postęp."],
                    ["Pobierz PNG", "Gotowe zdjęcia możesz od razu pobrać i użyć."],
                  ].map(([t,d],i) => (
                    <div className="how-step" key={i}>
                      <div className="how-num">{i+1}</div>
                      <div className="how-text"><strong>{t}</strong> — {d}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RESULTS */}
            {hasResults && (
              <div className="results-panel">
                <div className="results-head">
                  <div className="results-title">
                    Wygenerowane zdjęcia
                    <span className="count-badge">{doneJobs}</span>
                  </div>
                  <div className="results-meta">{running ? "Generuję…" : "Gotowe"}</div>
                </div>
                <div className="results-grid">
                  {jobs.map((j, i) => (
                    <div key={i} className="res-card">
                      <div className="res-img">
                        {(j.status === "pending" || j.status === "loading") ? (
                          <div className="res-spinner-wrap">
                            <div className="res-big-spin"/>
                            <span className="res-spin-lbl">{j.status==="loading"?"Generuję…":"Oczekuje…"}</span>
                          </div>
                        ) : j.status === "error" ? (
                          <div className="res-err-wrap">
                            <div className="res-err-icon">⚠️</div>
                            <div className="res-err-txt">{j.error}</div>
                          </div>
                        ) : (
                          <img src={j.url} alt={j.label}/>
                        )}
                      </div>
                      <div className="res-info">
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                          <div className="res-name">{j.label}</div>
                          <span className={`shot-badge ${j.type==="gpt"?"b-gpt":"b-life"}`} style={{marginBottom:0,fontSize:"9px"}}>{j.badge}</span>
                        </div>
                        <div className="res-sub">{j.desc}</div>
                        {j.url && (
                          <div className="res-actions">
                            <a href={j.url} download={`${name.replace(/\s+/g,"_")}_${j.id}.png`}
                              className="dl-btn" target="_blank" rel="noreferrer">
                              ↓ Pobierz
                            </a>
                            <button className="copy-btn" onClick={() => copyImg(j.url, j.id)}>
                              {copied===j.id ? "✓ Skopiowano" : "📋 Kopiuj"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMPTY RESULTS PLACEHOLDER */}
            {!hasResults && !running && (
              <div className="results-panel">
                <div className="empty-state">
                  <div className="empty-icon">🖼️</div>
                  <div className="empty-title">Tu pojawią się Twoje zdjęcia</div>
                  <div className="empty-sub">Uzupełnij formularz po lewej i kliknij "Wygeneruj" — zdjęcia będą pojawiać się jedno po drugim.</div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <div className="footer-logo">PhotoAI Studio</div>
          <div className="footer-note">Twój klucz API nigdy nie opuszcza przeglądarki · Napędzane przez OpenAI</div>
        </div>

      </div>
    </>
  );
}
