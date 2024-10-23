import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import YandexMetrikaContainer from "~/app/_components/YandexMetrikaContainer";

const analyticsEnabled = !!(process.env.NODE_ENV === "production");

export const metadata: Metadata = {
  title:
    "Богдан - Fullstack Web Разработчик | Профессиональная Разработка Сайтов",
  description:
    "Профессиональная разработка сайтов любой сложности: от фронтенда до бэкенда. Опытный fullstack веб-разработчик предлагает качественные услуги по созданию современных и адаптивных веб-приложений.",
  keywords:
    "веб-разработчик, fullstack, разработка сайтов, фронтенд, бэкенд, программирование, услуги разработки",
  authors: [{ name: "Богдан", url: "https://t.me/pbgal" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Богдан - Fullstack Web Разработчик",
    description:
      "Профессиональная разработка сайтов любой сложности: от фронтенда до бэкенда.",
    url: "https://bgalin.ru", // замените на URL вашего сайта
    images: [
      {
        url: "https://bgalin.ru/favicon.ico", // замените на изображение для Open Graph
        width: 1200,
        height: 630,
        alt: "Богдан - Fullstack Web Разработчик",
      },
    ],
    siteName: "Богдан",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={GeistSans.className}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <YandexMetrikaContainer enabled={analyticsEnabled} />
      </body>
    </html>
  );
}
