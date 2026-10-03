export type Industry =
  | "cafe"
  | "fashion"
  | "tech"
  | "shop"
  | "education"
  | "corporate"
  | "multinational"
  | "international";
export type Style = "minimalist" | "modest" | "modern" | "premium" | "luxury";
export type Dimension = "2d" | "3d";
export type Palette = { name: string; primary: string; secondary: string; ink: string; bg: string };

export const INDUSTRIES: { id: Industry; label: string; tags: string[] }[] = [
  { id: "cafe", label: "Cafes & Restaurants", tags: ["Coffee", "Burger", "Pizza", "Cold Drink", "Car", "Chef Hat"] },
  { id: "fashion", label: "Clothing & Fashion Brands", tags: ["Hanger", "Crown", "Diamond", "Star", "Leaf"] },
  { id: "tech", label: "Tech Startups", tags: ["Bolt", "Rocket", "Chip", "Globe", "Star"] },
  { id: "shop", label: "Local Shops", tags: ["Bag", "Car", "Leaf", "Heart", "Star"] },
  { id: "education", label: "Educational Institutions", tags: ["Book", "Cap", "Star", "Leaf", "Globe"] },
  { id: "corporate", label: "Corporate Identities", tags: ["Shield", "Bolt", "Globe", "Diamond", "Star"] },
  { id: "multinational", label: "Multinational Corporations", tags: ["Globe", "Shield", "Diamond", "Rocket", "Crown"] },
  { id: "international", label: "International Brands", tags: ["Globe", "Crown", "Diamond", "Star", "Heart"] },
];

export const STYLES: { id: Style; label: string; hint: string; font: string }[] = [
  { id: "minimalist", label: "Minimalist", hint: "Clean & airy", font: "Helvetica, Arial, sans-serif" },
  { id: "modest", label: "Modest", hint: "Calm & classic", font: "Georgia, 'Times New Roman', serif" },
  { id: "modern", label: "Modern", hint: "Geometric", font: "'Trebuchet MS', 'Segoe UI', sans-serif" },
  { id: "premium", label: "Premium", hint: "Strong & bold", font: "'Arial Black', Impact, sans-serif" },
  { id: "luxury", label: "Luxury", hint: "Refined & spaced", font: "Didot, 'Bodoni MT', Georgia, serif" },
];

export const PALETTES: Palette[] = [
  { name: "Pastel", primary: "#f4a7b9", secondary: "#a7c7e7", ink: "#4a4458", bg: "#fdf7f2" },
  { name: "Neon", primary: "#ff2fb3", secondary: "#22e4ff", ink: "#f5f5ff", bg: "#0d0b1f" },
  { name: "Earthy", primary: "#b5651d", secondary: "#6b8e23", ink: "#3b2a1a", bg: "#f3ead8" },
  { name: "Monochrome", primary: "#111111", secondary: "#777777", ink: "#111111", bg: "#ffffff" },
  { name: "Royal Gold", primary: "#c9a227", secondary: "#1f3a5f", ink: "#14213d", bg: "#fbf8ef" },
  { name: "Ocean", primary: "#0077b6", secondary: "#00b4d8", ink: "#03045e", bg: "#f1fbff" },
];

export function customPalette(hex: string): Palette {
  return { name: "Custom", primary: hex, secondary: shade(hex, -40), ink: "#1a1a1a", bg: "#ffffff" };
}

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, v + amt)).toString(16).padStart(2, "0");
  return `#${c(n >> 16)}${c((n >> 8) & 255)}${c(n & 255)}`;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** 48x48 icon paths for object tags. */
function tagIcon(tag: string, c: string, c2: string): string | null {
  switch (tag) {
    case "Coffee":
      return industryIcon("cafe", c, c2);
    case "Burger":
      return `<path d="M6 22a18 12 0 0 1 36 0z" fill="${c}"/><rect x="5" y="25" width="38" height="5" rx="2.5" fill="${c2}"/><path d="M6 33h36v3a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="${c}"/>`;
    case "Pizza":
      return `<path d="M24 44L6 10a40 20 0 0 1 36 0z" fill="${c}"/><circle cx="20" cy="20" r="3" fill="${c2}"/><circle cx="28" cy="26" r="3" fill="${c2}"/><circle cx="23" cy="33" r="2.5" fill="${c2}"/>`;
    case "Cold Drink":
      return `<path d="M12 14h24l-3 30H15z" fill="${c}"/><path d="M26 14l4-10h5" stroke="${c2}" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="10" y="10" width="28" height="5" rx="2" fill="${c2}"/>`;
    case "Car":
      return `<path d="M4 30l5-11a4 4 0 0 1 4-3h22a4 4 0 0 1 4 3l5 11v8H4z" fill="${c}"/><circle cx="14" cy="38" r="5" fill="${c2}"/><circle cx="34" cy="38" r="5" fill="${c2}"/>`;
    case "Chef Hat":
      return `<path d="M14 30a8 8 0 0 1-2-15 10 10 0 0 1 24 0 8 8 0 0 1-2 15z" fill="${c}"/><rect x="14" y="32" width="20" height="8" rx="2" fill="${c2}"/>`;
    case "Hanger":
      return industryIcon("fashion", c, c2);
    case "Crown":
      return `<path d="M6 36L4 12l11 10 9-14 9 14 11-10-2 24z" fill="${c}"/><rect x="6" y="38" width="36" height="5" rx="2" fill="${c2}"/>`;
    case "Diamond":
      return `<path d="M12 8h24l8 12-20 22L4 20z" fill="${c}"/><path d="M4 20h40M18 8l-4 12 10 22 10-22-4-12" stroke="${c2}" stroke-width="2" fill="none"/>`;
    case "Star":
      return `<path d="M24 4l6 13 14 2-10 10 2 14-12-7-12 7 2-14L4 19l14-2z" fill="${c}"/>`;
    case "Leaf":
      return `<path d="M8 40C8 18 22 6 42 6c0 22-12 34-34 34z" fill="${c}"/><path d="M8 40L30 18" stroke="${c2}" stroke-width="3" stroke-linecap="round"/>`;
    case "Bolt":
      return `<path d="M28 2L8 28h14l-4 18 22-28H26z" fill="${c}"/>`;
    case "Rocket":
      return `<path d="M24 2c10 8 12 20 8 32H16C12 22 14 10 24 2z" fill="${c}"/><circle cx="24" cy="18" r="4" fill="${c2}"/><path d="M16 30l-8 8 9-1M32 30l8 8-9-1" fill="${c2}"/><path d="M20 38h8l-4 8z" fill="${c2}"/>`;
    case "Chip":
      return industryIcon("tech", c, c2);
    case "Globe":
      return `<circle cx="24" cy="24" r="19" fill="none" stroke="${c}" stroke-width="3.5"/><ellipse cx="24" cy="24" rx="8" ry="19" fill="none" stroke="${c2}" stroke-width="2.5"/><path d="M5 24h38M9 14h30M9 34h30" stroke="${c}" stroke-width="2"/>`;
    case "Bag":
      return `<path d="M8 16h32l-3 28H11z" fill="${c}"/><path d="M17 20v-6a7 7 0 0 1 14 0v6" stroke="${c2}" stroke-width="3" fill="none"/>`;
    case "Heart":
      return `<path d="M24 42S4 30 4 17a10 10 0 0 1 20-3 10 10 0 0 1 20 3c0 13-20 25-20 25z" fill="${c}"/>`;
    case "Book":
      return `<path d="M4 10c8-3 14-1 20 3v30c-6-4-12-6-20-3z" fill="${c}"/><path d="M44 10c-8-3-14-1-20 3v30c6-4 12-6 20-3z" fill="${c2}"/>`;
    case "Cap":
      return `<path d="M24 8L2 18l22 10 22-10z" fill="${c}"/><path d="M12 23v10c6 6 18 6 24 0V23l-12 5z" fill="${c2}"/><path d="M42 20v12" stroke="${c}" stroke-width="2.5"/>`;
    case "Shield":
      return `<path d="M24 4l18 6v12c0 12-8 20-18 24C14 42 6 34 6 22V10z" fill="${c}"/><path d="M16 24l6 6 10-12" stroke="${c2}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    default:
      return null;
  }
}

function industryIcon(ind: Industry, c: string, c2: string): string {
  switch (ind) {
    case "cafe":
      return `<path d="M8 18h26v10a12 12 0 0 1-12 12h-2A12 12 0 0 1 8 28z" fill="${c}"/><path d="M34 21h3a5 5 0 0 1 0 10h-3" stroke="${c}" stroke-width="3" fill="none"/><path d="M16 5c-2 3 2 5 0 8M24 5c-2 3 2 5 0 8" stroke="${c2}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    case "fashion":
      return `<path d="M20 12a4 4 0 1 1 4 4c-1.5 0-2 1-2 2.5V20L5 36h38L22 20" stroke="${c}" stroke-width="3.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/><circle cx="24" cy="40" r="2.5" fill="${c2}"/>`;
    case "tech":
      return `<path d="M24 4l17 10v20L24 44 7 34V14z" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="24" r="6" fill="${c2}"/><path d="M24 4v14M24 30v14M7 14l12 7M29 27l12 7" stroke="${c}" stroke-width="2"/>`;
    case "shop":
      return `<path d="M6 18l4-10h28l4 10z" fill="${c}"/><path d="M9 20v20h30V20" fill="none" stroke="${c}" stroke-width="3"/><rect x="20" y="28" width="8" height="12" fill="${c2}"/>`;
    case "education":
      return tagIcon("Book", c, c2)!;
    case "corporate":
      return `<rect x="8" y="24" width="8" height="16" rx="1" fill="${c2}"/><rect x="20" y="14" width="8" height="26" rx="1" fill="${c}"/><rect x="32" y="6" width="8" height="34" rx="1" fill="${c}"/>`;
    case "multinational":
      return tagIcon("Globe", c, c2)!;
    case "international":
      return tagIcon("Diamond", c, c2)!;
  }
}

export type LogoInput = {
  name: string;
  tagline: string;
  prompt: string;
  industry: Industry;
  style: Style;
  palette: Palette;
  dimension?: Dimension;
  tags?: string[];
};

const PROMPT_TAGS: Record<string, string[]> = {
  Coffee: ["coffee", "cup", "mug", "steam", "chai", "tea"],
  Burger: ["burger", "hamburger", "bun"],
  Pizza: ["pizza", "slice"],
  "Cold Drink": ["drink", "soda", "juice", "glass", "straw"],
  "Chef Hat": ["chef", "cook", "kitchen", "hat"],
  Hanger: ["hanger", "dress", "clothing", "fashion"],
  Crown: ["crown", "royal", "king", "queen"],
  Diamond: ["diamond", "gem", "jewel"],
  Leaf: ["leaf", "organic", "natural", "eco"],
  Bolt: ["bolt", "lightning", "energy", "fast"],
  Rocket: ["rocket", "launch", "space"],
  Chip: ["chip", "circuit", "processor", "digital"],
  Globe: ["globe", "world", "global", "international"],
  Bag: ["bag", "shopping", "retail"],
  Heart: ["heart", "love", "care"],
  Book: ["book", "reading", "learn", "school"],
  Cap: ["cap", "graduation", "university", "college"],
  Shield: ["shield", "secure", "protection", "trust"],
};

function promptIncludes(prompt: string, words: string[]) {
  return words.some((word) => prompt.includes(word));
}

function resolvePrompt(input: LogoInput) {
  const prompt = input.prompt.trim().toLowerCase();
  const requestedTags = Object.entries(PROMPT_TAGS)
    .filter(([, words]) => promptIncludes(prompt, words))
    .map(([tag]) => tag);
  const tags = [...requestedTags, ...(input.tags ?? [])].filter((tag, index, all) => all.indexOf(tag) === index);
  const requestedStyle: Style | undefined = promptIncludes(prompt, ["luxury", "elegant", "refined", "exclusive"])
    ? "luxury"
    : promptIncludes(prompt, ["premium", "bold", "strong"])
      ? "premium"
      : promptIncludes(prompt, ["minimal", "simple", "clean"])
        ? "minimalist"
        : promptIncludes(prompt, ["classic", "modest", "traditional"])
          ? "modest"
          : promptIncludes(prompt, ["modern", "sleek", "geometric"])
            ? "modern"
            : undefined;

  return {
    prompt,
    tags,
    style: requestedStyle ?? input.style,
    vivid: promptIncludes(prompt, ["vibrant", "colorful", "bright", "lively", "neon"]),
    fire: promptIncludes(prompt, ["fire", "flame", "flaming", "hot", "spicy"]),
    utensils: promptIncludes(prompt, ["utensil", "fork", "spoon", "knife", "restaurant", "food"]),
    circular: promptIncludes(prompt, ["badge", "seal", "round", "circular", "emblem"]),
    dimensional: input.dimension === "3d" || promptIncludes(prompt, ["3d", "dimensional", "embossed", "raised"]),
  };
}

function hashId(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  return `lg${hash.toString(36)}`;
}

function richDetails(input: LogoInput, primary: string, secondary: string, ink: string, bg: string, variant: number) {
  const design = resolvePrompt(input);
  const food = input.industry === "cafe";
  const fire = food && design.fire
    ? `<g class="logo-detail logo-flame" transform="translate(${variant === 0 ? 52 : 176} ${variant === 0 ? 126 : 54})"><path d="M24 48C5 34 14 17 26 2c-1 14 12 16 7 31 8-6 9-14 8-20 15 18 12 38-8 43-12 3-21-1-25-8 7 3 12 2 16 0z" fill="${secondary}"/><path d="M25 49c-8-8-2-16 5-24 0 8 7 9 4 17 4-2 6-6 5-10 7 10 3 20-7 22z" fill="${bg}"/></g>`
    : "";
  const utensils = food && design.utensils
    ? `<g class="logo-detail logo-utensils" stroke="${ink}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".78"><path d="M${variant === 0 ? 42 : 116} ${variant === 0 ? 236 : 112}v54M${variant === 0 ? 34 : 108} ${variant === 0 ? 236 : 112}v18c0 9 16 9 16 0v-18M${variant === 0 ? 94 : 284} ${variant === 0 ? 236 : 112}v54M${variant === 0 ? 86 : 276} ${variant === 0 ? 236 : 112}c18 5 18 25 0 31"/></g>`
    : "";
  const sparkles = `<g class="logo-detail logo-sparkles" fill="${secondary}" opacity=".9"><path d="M74 82l4 9 9 4-9 4-4 9-4-9-9-4 9-4z"/><circle cx="${variant === 0 ? 340 : 320}" cy="${variant === 0 ? 126 : 76}" r="5"/><path d="M${variant === 0 ? 326 : 302} ${variant === 0 ? 286 : 316}l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></g>`;
  const orbit = design.circular || input.industry === "tech" || input.industry === "multinational"
    ? `<g class="logo-detail logo-orbit" fill="none" stroke="${primary}" opacity=".42"><ellipse cx="200" cy="200" rx="164" ry="112" stroke-width="2" stroke-dasharray="7 9"/><circle cx="348" cy="184" r="6" fill="${secondary}" stroke="none"/></g>`
    : "";
  return `${orbit}${fire}${utensils}${sparkles}`;
}

/** Returns a standalone SVG string (400x400). variant 0 = horizontal, 1 = stacked, 2 = emblem. */
export function buildLogo(input: LogoInput, variant: number, transparent = false): string {
  const { palette: p } = input;
  const design = resolvePrompt(input);
  const style = design.style;
  const tags = design.tags;
  const icon = (c: string, c2: string) => {
    const t = tags[variant % Math.max(tags.length, 1)];
    return (t && tagIcon(t, c, c2)) || industryIcon(input.industry, c, c2);
  };
  const font = STYLES.find((item) => item.id === style)?.font ?? "Arial, sans-serif";
  const name = esc(style === "luxury" || style === "premium" ? input.name.toUpperCase() : input.name);
  const tag = esc(input.tagline);
  const weight = style === "premium" ? 900 : style === "minimalist" ? 300 : style === "luxury" ? 400 : 700;
  const spacing = style === "luxury" ? 8 : style === "minimalist" ? 2 : 0;
  const len = Math.max(input.name.length, 3);
  const bg = transparent ? "" : `<rect class="logo-background" width="400" height="400" fill="${p.bg}"/>`;
  const ic = icon(p.primary, p.secondary);
  const initial = esc(input.name.trim().charAt(0).toUpperCase() || "G");
  let body = "";

  if (variant === 0) {
    const fs = Math.min(42, 238 / (len * (style === "luxury" ? 0.95 : 0.68)));
    const mark =
      style === "modern" || style === "premium"
        ? `<rect x="0" y="0" width="64" height="64" rx="${style === "modern" ? 16 : 32}" fill="${p.primary}"/><g transform="translate(8 8)">${icon(p.bg, p.secondary)}</g>`
        : `<g transform="translate(0 4) scale(1.2)">${ic}</g>`;
    body = `<g class="logo-mark" transform="translate(36 158)">${mark}</g>
<text class="logo-wordmark" x="112" y="${tag ? 196 : 202}" font-family="${font}" font-size="${fs}" font-weight="${weight}" letter-spacing="${spacing}" fill="${p.ink}">${name}</text>
${tag ? `<text x="118" y="222" font-family="${font}" font-size="12" letter-spacing="3" fill="${p.secondary}">${tag.toUpperCase()}</text>` : ""}`;
  } else if (variant === 1) {
    const fs = Math.min(48, 340 / (len * (style === "luxury" ? 0.95 : 0.62)));
    const deco =
      style === "modest" || style === "luxury"
        ? `<line x1="110" y1="${tag ? 296 : 290}" x2="290" y2="${tag ? 296 : 290}" stroke="${p.primary}" stroke-width="1.5"/>`
        : "";
    body = `<g class="logo-mark" transform="translate(160 80) scale(1.7)">${ic}</g>
<text class="logo-wordmark" x="200" y="${tag ? 260 : 270}" text-anchor="middle" font-family="${font}" font-size="${fs}" font-weight="${weight}" letter-spacing="${spacing}" fill="${p.ink}">${name}</text>
${deco}
${tag ? `<text x="200" y="322" text-anchor="middle" font-family="${font}" font-size="13" letter-spacing="4" fill="${p.secondary}">${tag.toUpperCase()}</text>` : ""}`;
  } else {
    const rings =
      style === "modest"
        ? `<circle cx="200" cy="200" r="150" fill="none" stroke="${p.primary}" stroke-width="6"/><circle cx="200" cy="200" r="136" fill="none" stroke="${p.primary}" stroke-width="1.5" stroke-dasharray="4 5"/>`
        : style === "luxury"
          ? `<path d="M200 50L350 200 200 350 50 200z" fill="none" stroke="${p.primary}" stroke-width="2"/><path d="M200 66L334 200 200 334 66 200z" fill="none" stroke="${p.primary}" stroke-width="0.8"/>`
          : style === "premium"
            ? `<circle cx="200" cy="200" r="150" fill="${p.primary}"/><circle cx="200" cy="200" r="150" fill="none" stroke="${p.ink}" stroke-width="8"/>`
            : style === "modern"
              ? `<rect x="60" y="60" width="280" height="280" rx="70" fill="${p.primary}"/>`
              : `<circle cx="200" cy="200" r="140" fill="none" stroke="${p.primary}" stroke-width="2"/>`;
    const filled = style === "premium" || style === "modern";
    const txt = filled ? p.bg : p.ink;
    const fs = Math.min(30, 220 / (len * 0.62));
    body = `<g class="logo-emblem">${rings}</g>
<text class="logo-initial" x="200" y="215" text-anchor="middle" font-family="${font}" font-size="110" font-weight="${weight}" fill="${filled ? p.bg : p.primary}" opacity="0.95">${initial}</text>
<text class="logo-wordmark" x="200" y="265" text-anchor="middle" font-family="${font}" font-size="${fs}" font-weight="${weight}" letter-spacing="${spacing / 2 + 2}" fill="${txt}">${name}</text>
${tag ? `<text x="200" y="290" text-anchor="middle" font-family="${font}" font-size="10" letter-spacing="3" fill="${filled ? p.bg : p.secondary}">${tag.toUpperCase()}</text>` : ""}
<g class="logo-mark" transform="translate(182 100) scale(0.75)">${icon(filled ? p.bg : p.secondary, filled ? p.secondary : p.primary)}</g>`;
  }

  const id = hashId(`${input.name}-${input.prompt}-${variant}-${p.primary}`);
  const glow = design.vivid ? `<filter id="${id}g" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="7" flood-color="${p.secondary}" flood-opacity=".55"/></filter>` : "";
  const depth = design.dimensional ? `<filter id="${id}d" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="2" stdDeviation="0" flood-color="${shade(p.primary, -60)}"/><feDropShadow dx="0" dy="5" stdDeviation="0" flood-color="${shade(p.primary, -90)}" flood-opacity=".85"/><feDropShadow dx="0" dy="12" stdDeviation="9" flood-color="#000" flood-opacity=".32"/></filter>` : "";
  const details = richDetails(input, p.primary, p.secondary, p.ink, p.bg, variant);
  if (glow || depth) {
    body = `<defs>${glow}${depth}</defs><g class="logo-art"${design.dimensional ? ` filter="url(#${id}d)"` : ""}>${details}<g${design.vivid ? ` filter="url(#${id}g)"` : ""}>${body}</g></g>`;
  } else {
    body = `<g class="logo-art">${details}${body}</g>`;
  }
  return `<svg class="generated-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" preserveAspectRatio="xMidYMid meet">${bg}${body}</svg>`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function svgToPng(svg: string, w: number, h: number, fill?: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas export is unavailable"));
        return;
      }
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fillRect(0, 0, w, h);
      }
      const s = Math.min(w, h);
      ctx.drawImage(img, (w - s) / 2, (h - s) / 2, s, s);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), "image/png");
    };
    img.onerror = reject;
    img.src = url;
  });
}
