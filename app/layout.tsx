import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/app/ui/LayoutContent";
import { Provider } from "@/app/Provider";
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App } from "antd";
import type { ReactNode } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "멍패스 | 반려견을 위한 완벽한 솔루션",
  description: "견주와 애견카페 사장님을 연결하는 가장 스마트한 방법, 멍패스",
  manifest: "/manifest.json",
  metadataBase: new URL('https://mungpass.vercel.app/'),
  openGraph: {
    title: '멍패스',
    description: 'QR 체크인부터 이용 내역 관리까지 멍패스 하나로 끝내세요.',
    url: 'landingpage url',
    siteName: 'MungPass',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: '멍패스 로고'
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  },
  other: {
    "Content-Security-Policy": "upgrade-insecure-requests",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '멍패스'
  },
  icons: {
    apple: '/logo-512.png?v=4'
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,

}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/logo-512.png?v=4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel='icon' href='/favicon-icon.png' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <AntdRegistry>
            <App>
              <LayoutContent>
                {children}
              </LayoutContent>
            </App>
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}
