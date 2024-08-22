import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import GoogleAdsense from "@/components/GoogleAdsense";
import Link from "next/link";

export const metadata: Metadata = {
  title: "전략적 팀 전투 빌더",
  description: "전략적팀전투(롤토체스) 플레이에 도움을 주는 빌더입니다.",
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
        <header>
          <div className="inner py-sm semi-bold text-main-text text-nowrap">
            <Link className="" href={"/"}>
              <h1>TFT BUILDER</h1>
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </body>
      <GoogleAnalytics gaId={GA_ID} />
      <GoogleAdsense adsenseId={ADSENSE_ID} />
    </html>
  );
}
