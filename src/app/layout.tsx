import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import RQProviders from "@/_utils/reactQuery/RQProviders";
import { UserStoreProvider } from "@/_utils/zustand/userStoreProvider";
import Header from "@/_components/layout/Header";
import Footer from "@/_components/layout/Footer";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap"
});

export const metadata: Metadata = {
  title: "불멍 스팟",
  description: "불멍 스팟 - 캠핑장을 검색해보세요"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>
        <UserStoreProvider>
          <Suspense fallback={<></>}>
            <RQProviders>
              <Header />
              <div className="min-h-[calc(100vh-80px)] pt-[80px]">
                {children}
              </div>
              <Footer />
            </RQProviders>
          </Suspense>
        </UserStoreProvider>
      </body>
    </html>
  );
}
