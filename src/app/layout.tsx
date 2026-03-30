import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DieNo — 삶은 소중하다",
  description: "DieNo(다이노) — 다이노의 큐레이션된 생각의 아카이브. 창업, AI, 신앙, 가족, 학습, 스포츠에 대한 학문적 깊이와 진정성.",
  keywords: ["DieNo", "다이노", "창업지원", "AI", "신앙", "가족", "학습", "NBA"],
  openGraph: {
    title: "DieNo — 삶은 소중하다",
    description: "어려움 속에서도 배우고, 배운 것을 나누며, 나누면서 성장하는 삶의 기록",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ backgroundColor: '#F9F9F7', color: '#1A1C1B' }}>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
