import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devlog AI",
  description: "Devlog AI - 기술 블로그 컨텐츠 자동 생성 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="relative flex min-h-screen flex-col">
          <div className="fixed-center circle-blur" />
          <header className="app-shadow app-blur sticky top-0 z-50 w-full border-b bg-white/5">
            <div className="container m-auto h-14 w-full max-w-5xl p-4 lg:px-0">
              <h1 className="sr-only">Devlog AI</h1>
              <span className="font-bold">LOGO</span>
            </div>
          </header>
          <main className="z-1 flex flex-1 flex-col">
            <div className="container m-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center p-4 lg:p-0">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
