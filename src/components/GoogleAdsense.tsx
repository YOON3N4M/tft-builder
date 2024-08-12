import Script from "next/script";

type NodeEnv = "dev" | "production";

interface GoogleAdsenseProps {
  adsenseId: string;
}

const NODE_ENV: NodeEnv = process.env.ENV as NodeEnv;

function GoogleAdsense(props: GoogleAdsenseProps) {
  const { adsenseId } = props;

  if (NODE_ENV === "dev") return;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${adsenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

export default GoogleAdsense;
