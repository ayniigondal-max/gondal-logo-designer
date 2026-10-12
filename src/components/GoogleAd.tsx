/**
 * Google AdSense Ad Component
 * Use this component to place ads on any page
 * 
 * Example usage:
 * <GoogleAd slot="1234567890" format="auto" />
 */

interface GoogleAdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
}

export function GoogleAd({ slot, format = "auto", responsive = true }: GoogleAdProps) {
  if (typeof window === "undefined") return null;

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{
          display: responsive ? "block" : "inline-block",
          textAlign: "center",
        }}
        data-ad-client="ca-pub-5486600012405159"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>
    </>
  );
}
