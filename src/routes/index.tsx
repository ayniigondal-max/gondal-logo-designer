import { createFileRoute } from "@tanstack/react-router";
import LogoGenerator from "@/components/logo-generator";

export const Route = createFileRoute("/")({
  component: LogoGenerator,
  head: () => ({
    meta: [
      { title: "Gondal AI Logo Generator — Create Your Logo" },
      {
        name: "description",
        content: "Create your own logo with Gondal AI. Choose your industry, style and brand colors, compare three concepts, and download your favorite.",
      },
      { property: "og:title", content: "Gondal AI Logo Generator" },
      {
        property: "og:description",
        content: "Create your own brand logo with guided styles, colors and instant concepts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
