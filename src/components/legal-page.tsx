import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export default function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <Sparkles className="size-5 text-accent" />
            Gondal AI Logo Generator
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-glass-border bg-glass px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> Back to generator
          </Link>
        </header>

        <main className="mt-10 rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl sm:p-10">
          <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-xs text-muted-foreground">Last updated: {updated}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{intro}</p>
          {children}
        </main>

        <footer className="mt-8 border-t border-glass-border pt-6 text-center text-xs text-muted-foreground">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/about" className="hover:text-foreground">About Us</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms of Use</Link>
          </nav>
          <p className="mt-3">Gondal AI Logo Generator · Every package is free ($0) — no payment needed, ever.</p>
        </footer>
      </div>
    </div>
  );
}
