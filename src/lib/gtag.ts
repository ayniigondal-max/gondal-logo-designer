/**
 * Google Ads & Analytics Configuration
 * Replace the placeholder IDs with your actual values from Google Ads / GA4 / GTM
 */

// ============================================
// 🔴 REPLACE THESE WITH YOUR REAL IDS:
// ============================================

// 1. Get from: https://analytics.google.com → Admin → GA4 Property → Data Streams
export const GA_ID = "G-XXXXXXXXXX";

// 2. Get from: https://tagmanager.google.com → Admin → Containers
export const GTM_ID = "GTM-XXXXXXXX";

// 3. Get from: https://ads.google.com → Settings → Conversion Tracking → Website
export const ADS_CONVERSION_ID = "AW-XXXXXXXXXX";

// 4. Get from: https://search.google.com/search-console → Domain verification
export const GOOGLE_SITE_VERIFICATION = "YOUR_GOOGLE_VERIFICATION_CODE";

// ============================================
// Tracking Functions (DO NOT MODIFY)
// ============================================

// PageView event
export const pageview = (path: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_ID, {
      page_path: path,
      page_title: title,
    });
  }
};

// Track conversion events (for Google Ads)
export const trackConversion = (
  conversionLabel: string,
  value?: number,
  currency?: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      allow_custom_scripts: true,
      send_to: `${ADS_CONVERSION_ID}/${conversionLabel}`,
      value: value || 1,
      currency: currency || "USD",
    });
    console.log(`[Google Ads] Conversion tracked: ${conversionLabel}`);
  }
};

// Track specific events (for GA4 & GTM)
export const trackEvent = (
  eventName: string,
  eventData: Record<string, any> = {}
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventData);
    console.log(`[GA4] Event tracked: ${eventName}`, eventData);
  }
};

// Logo generation event
export const trackLogoGenerated = (style: string) => {
  trackEvent("logo_generated", {
    style: style,
    timestamp: new Date().toISOString(),
  });
};

// Logo download event (PRIMARY CONVERSION for Ads)
export const trackLogoDownload = (plan: string) => {
  // Send to Google Ads
  trackConversion("logo_download", 1, "USD");
  // Also track in GA4
  trackEvent("logo_downloaded", {
    plan: plan,
    timestamp: new Date().toISOString(),
  });
};

// Payment event
export const trackPayment = (plan: string, amount: number) => {
  trackConversion("purchase", amount, "USD");
  trackEvent("purchase", {
    plan: plan,
    amount: amount,
    timestamp: new Date().toISOString(),
  });
};

declare global {
  interface Window {
    gtag: any;
    dataLayer: any[];
  }
}
