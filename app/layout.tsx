import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://uicode.site"),

  title: {
    default:
      "Criação de Sites de Alta Conversão | UiCode.site",
    template: "%s | UiCode.site",
  },

  description:
    "Agência premium especializada em criação de sites profissionais, landing pages, e-commerce e apps.",

  keywords: [
    "criação de sites",
    "landing page",
    "e-commerce",
    "desenvolvimento web",
    "seo",
  ],

  openGraph: {
    title: "UiCode.site",
    description:
      "Sites profissionais com foco em conversão.",
    url: "https://uicode.site",
    siteName: "UiCode.site",
    locale: "pt_BR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}