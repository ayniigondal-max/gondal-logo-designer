import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { GoogleScripts } from "@/components/GoogleScripts";
import {
  getOrganizationSchema,
  getSoftwareApplicationSchema,
  getProductSchema,
  getFAQSchema,
} from "@/lib/schema";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gondal AI Logo Generator | Free Logo Designer" },
      {
        name: "description",
        content:
          "Create your own brand logo with a free AI logo generator. Start free, explore logo ideas, and create a professional look for your brand.",
      },
      { name: "author", content: "Gondal" },
      { property: "og:title", content: "Gondal AI Logo Generator" },
      {
        property: "og:description",
        content:
          "Free AI logo generator for startups, brands, and creators. Create polished logo concepts in seconds.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gondal-logo-designer.vercel.app" },
      { property: "og:image", content: "https://gondal-logo-designer.vercel.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gondal AI Logo Generator" },
      { name: "twitter:description", content: "Free AI logo generator for brands and creators." },
      { name: "twitter:image", content: "https://gondal-logo-designer.vercel.app/og-image.png" },
      { name: "theme-color", content: "#0f172a" },
      { name: "google-site-verification", content: "YOUR_GOOGLE_VERIFICATION_CODE" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "canonical", href: "https://gondal-logo-designer.vercel.app" },
    ],
    scripts: [
      {
        children: JSON.stringify(getOrganizationSchema()),
        type: "application/ld+json",
      },
      {
        children: JSON.stringify(getSoftwareApplicationSchema()),
        type: "application/ld+json",
      },
      {
        children: JSON.stringify(getProductSchema()),
        type: "application/ld+json",
      },
      {
        children: JSON.stringify(getFAQSchema()),
        type: "application/ld+json",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <GoogleScripts />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
