import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import ThemeToggle from "@/components/ThemeToggle";

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
            <div className="container m-auto flex h-14 w-full max-w-5xl items-center justify-between p-4 lg:px-0">
              <h1 className="sr-only">Devlog AI</h1>
              <div className="flex cursor-default items-center gap-2 select-none">
                <span draggable={false} className="font-bold">
                  Devlog AI
                </span>
                <Image src="/logo_m.png" alt="Devlog AI Logo" width={26} height={26} draggable={false} priority />
              </div>
              <ThemeToggle />
            </div>
          </header>
          <main className="z-1 flex flex-1 flex-col">
            <div className="container m-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-start p-4 lg:p-0">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
