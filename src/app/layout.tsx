import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DieNo — 삶은 소중하다",
  description: "DieNo(다이노) — Sungwan의 개인 블로그. 창업, AI, 신앙, 가족, 학습, 스포츠에 대한 진정성 있는 이야기.",
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
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
