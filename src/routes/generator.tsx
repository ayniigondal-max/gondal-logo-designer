import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/generator")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
  head: () => ({
    meta: [
      { title: "AI Logo Generator — Gondal AI" },
      { name: "description", content: "Create your logo with the Gondal AI Logo Generator." },
      { property: "og:title", content: "AI Logo Generator — Gondal AI" },
      { property: "og:description", content: "Create your own brand logo with guided styles and colors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
