import {
  Sparkles, Mic, MicOff, ImagePlus, BadgeCheck, Download, ArrowLeft, ArrowRight,
  Globe2, CheckCircle2, X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  INDUSTRIES, PALETTES, STYLES, buildLogo, customPalette, downloadBlob, svgToPng,
  type Dimension, type Industry, type LogoInput, type Palette, type Style,
} from "@/lib/logo-engine";
import { COUNTRIES, detectCountry, localPrice, type Country } from "@/lib/currency";

const TIERS = [
  { id: "basic", name: "Basic", price: 0, features: ["High-quality PNG (1000px)", "Clean white background", "Personal use license", "No watermark"] },
  { id: "standard", name: "Standard", price: 0, popular: true, features: ["High-Res PNG (2000px)", "Transparent background", "Commercial rights", "No watermark"] },
  { id: "premium", name: "Premium", price: 0, features: ["Vector SVG source files", "High-Res transparent PNG", "Social Media Kit (post + banner)", "Full commercial rights", "No watermark"] },
] as const;
type Tier = (typeof TIERS)[number];

const SAMPLE_NAMES: Record<Industry, string[]> = {
  cafe: ["Brew Haven", "Tandoor Co", "Slice Lab", "Chai Corner", "Grill Hub", "Bean Street"],
  fashion: ["Velora", "Threadly", "Noor Wear", "Atelier K", "Silk Lane", "Urban Kurta"],
  tech: ["Nexify", "Cloudbit", "Quantra", "Pixelforge", "Orbitly", "Codewave"],
  shop: ["Fresh Mart", "City Store", "Daily Needs", "Green Basket", "Kiryana Plus", "Handy Shop"],
  education: ["Bright Minds", "Scholars Academy", "Iqra School", "Learnly", "Future Campus", "Alpha College"],
  corporate: ["Apex Group", "Summit Corp", "Vertex", "Crestline", "Pillar & Co", "Meridian"],
  multinational: ["Globalis", "Transcend", "Unitex", "Worldline", "Omnicore", "Interra"],
  international: ["Aurelia", "Monarch", "Lumière", "Royale", "Zenith", "Elysian"],
};
const STYLE_IDS: Style[] = ["minimalist", "modest", "modern", "premium", "luxury"];

export default function LogoGenerator() {
  const [country, setCountry] = useState<Country | null>(null);
  const [countryPopup, setCountryPopup] = useState(false);
  const [phase, setPhase] = useState<"create" | "loading" | "results">("create");
  const [result, setResult] = useState<LogoInput | null>(null);
  const [selected, setSelected] = useState(0);
  const studioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("gondal-country");
    const found = COUNTRIES.find((c) => c.code === saved);
    if (found) setCountry(found);
    else {
      setCountry(detectCountry());
      setCountryPopup(true);
    }
  }, []);

  function chooseCountry(c: Country) {
    setCountry(c);
    localStorage.setItem("gondal-country", c.code);
    setCountryPopup(false);
  }

  function onGenerate(input: LogoInput) {
    setPhase("loading");
    setResult(input);
    setSelected(0);
    studioRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setPhase("results"), 1800);
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-background font-body text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="float-a absolute -top-24 -left-20 size-96 rounded-full bg-primary/35 blur-3xl" />
        <div className="float-b absolute top-1/3 -right-24 size-[28rem] rounded-full bg-accent/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <header className="flex items-center justify-between gap-3 py-5">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Gondal AI home">
            <div className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent font-display text-sm font-bold text-primary-foreground">G</div>
            <span className="font-display text-sm font-semibold">Gondal AI</span>
          </a>
          <label className="flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1.5 text-xs">
            <Globe2 aria-hidden className="size-3.5 text-accent" />
            <select aria-label="Select your country" className="bg-transparent outline-none"
              value={country?.code ?? ""} onChange={(e) => { const c = COUNTRIES.find((x) => x.code === e.target.value); if (c) chooseCountry(c); }}>
              <option value="" className="bg-popover">Country</option>
              {COUNTRIES.map((c) => <option key={c.code} value={c.code} className="bg-popover">{c.name} ({c.currency})</option>)}
            </select>
          </label>
        </header>

        <Showcase onStart={() => studioRef.current?.scrollIntoView({ behavior: "smooth" })} />

        <div ref={studioRef} className="scroll-mt-6 pb-20">
          {phase === "create" ? (
            <Stepper onGenerate={onGenerate} initial={result} />
          ) : phase === "loading" ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 rounded-lg border border-glass-border bg-glass p-8 backdrop-blur-xl">
              <div className="relative size-20">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-glass-border border-t-accent" />
                <div className="absolute inset-3 animate-spin rounded-full border-4 border-glass-border border-b-highlight [animation-direction:reverse]" />
              </div>
              <p className="animate-pulse text-sm text-muted-foreground">Crafting your premium concepts…</p>
            </div>
          ) : result ? (
            <Results input={result} selected={selected} setSelected={setSelected} onEdit={() => setPhase("create")} />
          ) : null}
        </div>

        <footer className="border-t border-glass-border py-8 text-center text-xs text-muted-foreground">
          <nav className="mb-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/about" className="font-medium hover:text-foreground">About Us</Link>
            <Link to="/privacy" className="font-medium hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="font-medium hover:text-foreground">Terms of Use</Link>
          </nav>
          Gondal AI Logo Generator · Every package is free ($0) — no payment needed.
        </footer>
      </div>

      {countryPopup ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-4 backdrop-blur-sm sm:items-center">
          <div role="dialog" aria-modal className="animate-rise w-full max-w-md rounded-2xl border border-glass-border-strong bg-popover p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl font-bold">Select your country</h2>
                <p className="mt-1 text-xs text-muted-foreground">We'll show an estimate in your local currency next to our US Dollar prices.</p>
              </div>
              <button aria-label="Close" onClick={() => setCountryPopup(false)} className="text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
            </div>
            <div className="mt-5 grid max-h-72 grid-cols-2 gap-2 overflow-y-auto">
              {COUNTRIES.map((c) => (
                <button key={c.code} onClick={() => chooseCountry(c)}
                  className={`rounded-xl border p-2.5 text-left text-xs transition-colors ${country?.code === c.code ? "border-accent bg-accent/10" : "border-glass-border bg-glass hover:bg-glass-strong"}`}>
                  <span className="font-semibold">{c.name}</span>
                  <span className="block text-muted-foreground">{c.currency}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- Showcase ---------------- */

function Showcase({ onStart }: { onStart: () => void }) {
  const [cat, setCat] = useState<Industry>("cafe");
  const [page, setPage] = useState(0);
  const cardsPerPage = 4;
  const cards = useMemo(() => {
    const ind = INDUSTRIES.find((i) => i.id === cat);
    if (!ind) return [];
    return SAMPLE_NAMES[cat].map((name, i) => {
      const palette = PALETTES[(i + INDUSTRIES.indexOf(ind)) % PALETTES.length];
      if (!palette) throw new Error("A showcase palette is required.");
      return {
        name,
        svg: buildLogo({
        name,
        tagline: "",
        prompt: cat === "cafe" ? "vibrant detailed restaurant badge with fire, chef details and utensils" : `premium detailed ${ind.label} identity`,
        industry: cat,
        style: STYLE_IDS[i % STYLE_IDS.length] ?? "modern",
        palette,
        dimension: i % 2 ? "3d" : "2d",
        tags: [ind.tags[i % ind.tags.length] ?? ind.tags[0] ?? "Brand"],
        }, i % 3),
      };
    });
  }, [cat]);
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const visibleCards = cards.slice(page * cardsPerPage, (page + 1) * cardsPerPage);

  function selectCategory(category: Industry) {
    setCat(category);
    setPage(0);
  }

  return (
    <section id="top" className="pt-6 pb-14">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-accent" /> Premium AI logo studio
      </div>
      <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
        Logos worthy of{" "}
        <span className="bg-gradient-to-r from-primary via-highlight to-accent bg-clip-text text-transparent">global brands.</span>
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Explore what our generator can create for every industry — then describe your idea, speak it, or upload a sketch to get your own.
      </p>
      <Button onClick={onStart} className="mt-6 h-12 rounded-lg bg-gradient-to-r from-primary to-accent px-6 font-semibold shadow-lg shadow-primary/30">
        <Sparkles aria-hidden /> Create my logo
      </Button>

      <div className="mt-10 overflow-hidden rounded-xl border border-glass-border-strong bg-glass shadow-xl shadow-background/30 backdrop-blur-xl">
        <div className="border-b border-glass-border p-3 sm:p-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <h2 className="truncate font-display text-sm font-semibold">Logo showcase</h2>
              <p className="mt-0.5 text-[11px] text-muted-foreground">Browse sample concepts by category</p>
            </div>
            <span className="shrink-0 rounded-md border border-glass-border bg-background/40 px-2 py-1 text-[10px] font-medium text-muted-foreground">
              {cards.length} samples
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2" aria-label="Logo categories">
            {INDUSTRIES.map((industry) => (
              <Button
                key={industry.id}
                type="button"
                variant="ghost"
                onClick={() => selectCategory(industry.id)}
                aria-pressed={cat === industry.id}
                className={`h-auto min-w-0 justify-start rounded-md border px-2.5 py-2 text-left text-[10px] font-medium leading-tight sm:text-xs ${
                  cat === industry.id
                    ? "border-accent/60 bg-accent/15 text-foreground"
                    : "border-glass-border bg-background/25 text-muted-foreground hover:border-glass-border-strong hover:bg-glass-strong hover:text-foreground"
                }`}
              >
                <span className="truncate">{industry.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 p-3 sm:grid-cols-4 sm:gap-3 sm:p-4">
          {visibleCards.map((card, index) => (
            <div
              key={`${cat}-${card.name}`}
              className="animate-rise group relative aspect-[4/3] min-w-0 overflow-hidden rounded-lg border border-glass-border bg-background/35 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md hover:shadow-background/40 motion-reduce:transform-none"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div
                className="logo-frame size-full p-3 sm:p-4"
                dangerouslySetInnerHTML={{ __html: card.svg }}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-t border-glass-border p-3 sm:p-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Previous page"
            disabled={page === 0}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            className="h-9 gap-1 rounded-md px-2 text-xs text-muted-foreground disabled:opacity-30"
          >
            <ArrowLeft aria-hidden className="size-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex min-w-0 items-center justify-center gap-1.5" aria-label={`Page ${page + 1} of ${totalPages}`}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Go to page ${index + 1}`}
                aria-current={page === index ? "page" : undefined}
                onClick={() => setPage(index)}
                className={`size-7 rounded-md text-[11px] ${page === index ? "bg-foreground text-background hover:bg-foreground/90 hover:text-background" : "text-muted-foreground hover:bg-glass-strong hover:text-foreground"}`}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Next page"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))}
            className="h-9 gap-1 rounded-md px-2 text-xs text-muted-foreground disabled:opacity-30"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Sample concepts made with Gondal AI for inspiration — not client work.</p>
    </section>
  );
}

/* ---------------- Stepper ---------------- */

const STEPS = ["Brand details", "Your idea", "Category & objects", "Style & finish"];

function Stepper({ onGenerate, initial }: { onGenerate: (i: LogoInput) => void; initial: LogoInput | null }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(initial?.name ?? "");
  const [tagline, setTagline] = useState(initial?.tagline ?? "");
  const [prompt, setPrompt] = useState(initial?.prompt ?? "");
  const [voiceDraft, setVoiceDraft] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [industry, setIndustry] = useState<Industry>(initial?.industry ?? "cafe");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [dimension, setDimension] = useState<Dimension>(initial?.dimension ?? "2d");
  const [style, setStyle] = useState<Style>(initial?.style ?? "modern");
  const [palette, setPalette] = useState<Palette>(initial?.palette ?? PALETTES[0]!);
  const [custom, setCustom] = useState("#7c5cff");
  const [error, setError] = useState("");
  const recRef = useRef<{ stop: () => void; abort?: () => void } | null>(null);
  const voiceBaseRef = useRef("");

  useEffect(() => () => recRef.current?.abort?.(), []);

  const field = "w-full rounded-xl border border-glass-border bg-glass px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 focus:outline-none";
  const ind = INDUSTRIES.find((i) => i.id === industry)!;

  function toggleVoice() {
    if (listening) { recRef.current?.stop(); return; }
    const w = window as unknown as Record<string, unknown>;
    const SR = (w["SpeechRecognition"] || w["webkitSpeechRecognition"]) as (new () => {
      lang: string; interimResults: boolean; continuous: boolean; start: () => void; stop: () => void; abort?: () => void;
      onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }> }) => void; onend: () => void; onerror: (e: { error?: string }) => void;
    }) | undefined;
    if (!SR) { setError("Voice input isn't supported in this browser. Please type your idea instead."); return; }
    const rec = new SR();
    rec.lang = navigator.language || "en-US";
    rec.interimResults = true;
    rec.continuous = true;
    voiceBaseRef.current = prompt.trim();
    rec.onresult = (e) => {
      const text = Array.from(e.results).map((r) => r[0]?.transcript ?? "").join(" ");
      const combined = [voiceBaseRef.current, text.trim()].filter(Boolean).join(" ").slice(0, 500);
      setVoiceDraft(text.trim());
      setPrompt(combined);
    };
    rec.onend = () => { setListening(false); setVoiceDraft(""); recRef.current = null; };
    rec.onerror = (event) => {
      setListening(false);
      setVoiceDraft("");
      recRef.current = null;
      setError(event.error === "not-allowed" ? "Microphone access is blocked. Allow it in your browser settings, then try again." : "Couldn't hear you clearly. Your existing description is safe—please try again.");
    };
    recRef.current = rec;
    setError("");
    setListening(true);
    rec.start();
  }

  function onImage(f: File | undefined) {
    if (!f) return;
    if (!f.type.startsWith("image/") || f.size > 5 * 1024 * 1024) { setError("Please upload an image under 5 MB."); return; }
    setError("");
    setImage(URL.createObjectURL(f));
  }

  function next(e: FormEvent) {
    e.preventDefault();
    if (step === 0 && !name.trim()) { setError("Please enter your brand name."); return; }
    setError("");
    if (step < 3) { setStep(step + 1); return; }
    onGenerate({ name: name.trim(), tagline: tagline.trim(), prompt: prompt.trim(), industry, style, palette, dimension, tags });
  }

  return (
    <form onSubmit={next} className="rounded-lg border border-glass-border bg-glass p-5 backdrop-blur-xl sm:p-8">
      <h2 className="font-display text-2xl font-bold">Create your logo</h2>
      <ol className="mt-5 grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => (
          <li key={s}>
            <button type="button" onClick={() => (i <= step || name.trim()) && setStep(i)} className="w-full text-left">
              <div className={`h-1.5 rounded-full ${i <= step ? "bg-gradient-to-r from-primary to-accent" : "bg-glass-strong"}`} />
              <p className={`mt-2 hidden text-[11px] font-medium sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{i + 1}. {s}</p>
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-muted-foreground sm:hidden">Step {step + 1} of 4 · {STEPS[step]}</p>

      <div className="mt-6 min-h-[280px] space-y-4">
        {step === 0 ? (
          <>
            <input className={field} maxLength={24} placeholder="Brand name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Brand name" autoFocus />
            <input className={field} maxLength={32} placeholder="Slogan / Tagline (optional)" value={tagline} onChange={(e) => setTagline(e.target.value)} aria-label="Tagline" />
          </>
        ) : step === 1 ? (
          <>
            <div className="relative">
              <textarea className={`${field} min-h-32 pr-14`} maxLength={500} placeholder="Describe your logo idea — e.g. a warm coffee cup with steam forming the letter B"
                value={prompt} onChange={(e) => setPrompt(e.target.value)} aria-label="Prompt / Description" />
              <button type="button" onClick={toggleVoice} aria-label={listening ? "Stop voice input" : "Voice prompt"}
                className={`absolute right-3 bottom-3 grid size-10 place-items-center rounded-full transition-colors ${listening ? "animate-pulse bg-destructive text-destructive-foreground" : "bg-gradient-to-br from-primary to-accent text-primary-foreground"}`}>
                {listening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </button>
            </div>
            <div aria-live="polite" className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-[11px] text-muted-foreground">
              <span className="min-w-0 truncate">{listening ? (voiceDraft || "Listening for your design details…") : "Your spoken description will shape objects, style, color mood, and finish."}</span>
              <span className="shrink-0">{prompt.length}/500</span>
            </div>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-glass-border bg-glass p-6 text-center hover:border-accent/50">
              {image ? (
                <img src={image} alt="Your reference" className="max-h-36 rounded-lg object-contain" />
              ) : (
                <>
                  <ImagePlus className="size-7 text-accent" />
                  <span className="text-sm font-medium">Attach a reference photo or sketch</span>
                  <span className="text-xs text-muted-foreground">PNG or JPG, up to 5 MB</span>
                </>
              )}
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => onImage(e.target.files?.[0])} />
            </label>
          </>
        ) : step === 2 ? (
          <>
            <select className={field} value={industry} aria-label="Industry"
              onChange={(e) => { setIndustry(e.target.value as Industry); setTags([]); }}>
              {INDUSTRIES.map((i) => <option key={i.id} value={i.id} className="bg-popover">{i.label}</option>)}
            </select>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Objects to include</p>
            <div className="flex flex-wrap gap-2">
              {ind.tags.map((t) => {
                const on = tags.includes(t);
                return (
                  <button type="button" key={t} onClick={() => setTags(on ? tags.filter((x) => x !== t) : [...tags, t].slice(-3))}
                    className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${on ? "border-accent bg-accent/15" : "border-glass-border bg-glass text-muted-foreground hover:text-foreground"}`}>
                    {on ? "✓ " : "+ "}{t}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-muted-foreground">Pick up to 3 — each concept features one of them.</p>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-glass-border bg-glass p-1">
              {(["2d", "3d"] as const).map((d) => (
                <button type="button" key={d} onClick={() => setDimension(d)}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition-colors ${dimension === d ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" : "text-muted-foreground"}`}>
                  {d.toUpperCase()} Logo
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {STYLES.map((s) => (
                <button type="button" key={s.id} onClick={() => setStyle(s.id)}
                  className={`rounded-xl border p-3 text-left transition-all ${style === s.id ? "border-accent bg-accent/10 ring-2 ring-accent/30" : "border-glass-border bg-glass hover:bg-glass-strong"}`}>
                  <p className="text-base" style={{ fontFamily: s.font }}>Aa</p>
                  <p className="mt-1 text-xs font-semibold">{s.label}</p>
                  <p className="text-[10px] text-muted-foreground">{s.hint}</p>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {PALETTES.map((p) => (
                <button type="button" key={p.name} onClick={() => setPalette(p)}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 transition-all ${palette.name === p.name ? "border-accent bg-accent/10 ring-2 ring-accent/30" : "border-glass-border bg-glass hover:bg-glass-strong"}`}>
                  <span className="flex">
                    {[p.primary, p.secondary, p.ink, p.bg].map((c, ci) => (
                      <span key={`${p.name}-${ci}`} className="-ml-1 size-4 rounded-full border border-glass-border-strong first:ml-0" style={{ background: c }} />
                    ))}
                  </span>
                  <span className="text-xs font-medium">{p.name}</span>
                </button>
              ))}
              <label className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 ${palette.name === "Custom" ? "border-accent bg-accent/10 ring-2 ring-accent/30" : "border-glass-border bg-glass"}`}>
                <input type="color" value={custom} aria-label="Custom primary color"
                  onChange={(e) => { setCustom(e.target.value); setPalette(customPalette(e.target.value)); }}
                  className="size-6 cursor-pointer rounded border-0 bg-transparent" />
                <span className="text-xs font-medium">Custom</span>
              </label>
            </div>
          </>
        )}
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
      </div>

      <div className="mt-6 flex gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="h-12 rounded-lg border-glass-border bg-glass"><ArrowLeft aria-hidden /> Back</Button>
        ) : null}
        <Button type="submit" className="h-12 flex-1 rounded-lg bg-gradient-to-r from-primary to-accent font-semibold shadow-lg shadow-primary/30">
          {step < 3 ? <>Next <ArrowRight aria-hidden /></> : <><Sparkles aria-hidden /> Generate logo</>}
        </Button>
      </div>
    </form>
  );
}

/* ---------------- Results + pricing + payment ---------------- */

function Price({ usd, country, big }: { usd: number; country: Country | null; big?: boolean }) {
  const local = usd > 0 ? localPrice(usd, country) : null;
  return (
    <div>
      <p className={`font-display font-bold ${big ? "text-4xl" : "text-lg"}`}>{usd === 0 ? "Free" : `$${usd}`}</p>
      {local ? <p className="text-xs text-muted-foreground">({local})</p> : null}
    </div>
  );
}

function Results({ input, selected, setSelected, onEdit }: {
  input: LogoInput; selected: number; setSelected: (n: number) => void; onEdit: () => void;
}) {
  const [tier, setTier] = useState<Tier | null>(null);
  const [downloading, setDownloading] = useState(false);

  async function download() {
    setDownloading(true);
    try {
      const isBasic = !tier || tier.id === "basic";
      const size = isBasic ? 1000 : 2000;
      const svg = buildLogo(input, selected, !isBasic);
      const png = await svgToPng(svg, size, size, isBasic ? "#ffffff" : undefined);
      const slug = input.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "gondal-logo";
      downloadBlob(png, `${slug}-logo-${size}px.png`);
      if (tier?.id === "premium") {
        downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `${slug}-logo.svg`);
      }
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-glass-border bg-glass p-5 backdrop-blur-xl sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Your logo preview</h2>
          <button onClick={onEdit} className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Edit details</button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="group relative aspect-square overflow-hidden rounded-2xl border border-glass-border">
            <div className="logo-frame size-full p-5 sm:p-8" dangerouslySetInnerHTML={{ __html: buildLogo(input, selected) }} />
            <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold backdrop-blur"><BadgeCheck className="inline size-3" />Free · no payment required</span>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {[0, 1, 2].map((v) => (
              <button key={v} type="button" onClick={() => setSelected(v)} aria-label={`Concept ${v + 1}`}
                className={`group aspect-square overflow-hidden rounded-xl border-2 p-2 transition-all ${selected === v ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <span className="logo-frame size-full" dangerouslySetInnerHTML={{ __html: buildLogo(input, v) }} />
              </button>
            ))}
          </div>
        </div>
        <Button onClick={download} disabled={downloading} className="mt-5 h-12 w-full rounded-lg bg-gradient-to-r from-primary to-accent font-semibold">
          <Download aria-hidden /> {downloading ? "Preparing your files…" : "Download logo"}
        </Button>
      </section>

      <section className="rounded-lg border border-glass-border bg-glass p-5 backdrop-blur-xl sm:p-6">
        <h2 className="font-display text-2xl font-bold">Choose your package</h2>
        <p className="mt-1 text-sm text-muted-foreground">Every package is completely free — pick the one with the extras you want and download instantly.</p>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium">
          <BadgeCheck className="size-5 shrink-0 text-accent" /> No watermark on any package — not even Basic.
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.id} className={`relative flex flex-col rounded-2xl border p-5 ${tier?.id === t.id ? "border-accent ring-2 ring-accent/40" : "popular" in t ? "border-accent/60 bg-accent/5" : "border-glass-border"}`}>
              {"popular" in t ? <span className="absolute -top-2.5 left-5 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground">MOST POPULAR</span> : null}
              <p className="font-display text-sm font-semibold">{t.name}</p>
              <div className="mt-2"><Price usd={t.price} country={null} big /></div>
              <ul className="mt-4 flex-1 space-y-2 text-xs text-muted-foreground">
                {t.features.map((f) => <li key={f} className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-accent" />{f}</li>)}
              </ul>
              <Button onClick={() => setTier(t)} className="mt-5 rounded-lg bg-gradient-to-r from-primary to-accent font-semibold">Select {t.name}</Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
