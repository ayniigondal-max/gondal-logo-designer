// Minimal GoogleScripts component — keeps the import satisfied and avoids SSR issues.
// If you want GA/GTM scripts server-rendered, replace the body with proper <script> tags.

export function GoogleScripts() {
  // Return null so server-side rendering doesn't inject scripts unexpectedly.
  // This file exists to satisfy imports during build. Add scripts here only after
  // confirming the correct GA/GTM IDs and intended server/client behavior.
  return null;
}
