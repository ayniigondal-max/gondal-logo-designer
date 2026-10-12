/**
 * Google Ads Conversion Tracking Helper
 * Use these functions in your button click handlers and form submissions
 */

import { trackLogoDownload, trackPayment, trackEvent } from "@/lib/gtag";

export function useGoogleAdsTracking() {
  return {
    /**
     * Call when user downloads a logo
     * @param plan - The plan they're using (free, starter, pro, business)
     */
    onLogoDownload: (plan: string) => {
      trackLogoDownload(plan);
    },

    /**
     * Call when user makes a payment
     * @param plan - Plan name
     * @param amount - Amount in USD
     */
    onPayment: (plan: string, amount: number) => {
      trackPayment(plan, amount);
    },

    /**
     * Call when user generates a logo
     * @param style - Logo style used
     */
    onLogoGenerate: (style: string) => {
      trackEvent("logo_generated", {
        style: style,
        timestamp: new Date().toISOString(),
      });
    },

    /**
     * Call when user signs up or creates account
     */
    onSignUp: () => {
      trackEvent("sign_up", {
        method: "email",
        timestamp: new Date().toISOString(),
      });
    },

    /**
     * Call for custom events
     */
    trackCustom: (eventName: string, data: Record<string, any>) => {
      trackEvent(eventName, data);
    },
  };
}
