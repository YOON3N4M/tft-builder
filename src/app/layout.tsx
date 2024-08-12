import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import GoogleAdsense from "@/components/GoogleAdsense";

export const metadata: Metadata = {
  title: "롤체 도우미",
  description: "전략적팀전투(롤토체스) 플레이에 도움을 주는 웹앱입니다.",
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

//ga
const GA_ID = process.env.GA_ID as string;
//adsense
const ADSENSE_ID = process.env.ADSENSE_ID as string;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body>
        <main>{children}</main>
      </body>
      <GoogleAnalytics gaId={GA_ID} />
      <GoogleAdsense adsenseId={ADSENSE_ID} />
    </html>
  );
}
