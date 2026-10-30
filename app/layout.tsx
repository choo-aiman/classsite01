import type { Metadata } from "next";

import { siteConfig } from "@/site.config";
import "./globals.css";

/* 모든 페이지를 감싸는 가장 바깥 틀. 보통은 수정할 일이 거의 없습니다.
   다크 모드로 시작하고 싶으면 <html> 의 className 에 "dark" 를 추가하세요. */
export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <head>
        {/* 히어로(잡지 표지) 전용 폰트: 굵은 명조(Playfair Display, Noto Serif KR) + 필기체(Great Vibes) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Noto+Serif+KR:wght@400;500;700;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
