import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

// URL oficial do site.
const siteUrl = "https://uicode.site";

// Nome oficial da marca.
const siteName = "UiCode.site";

// Descrição principal usada em SEO, Google, compartilhamentos e redes sociais.
const siteDescription =
  "Criação de sites profissionais, landing pages, e-commerces e sistemas web com design premium, performance, SEO técnico e foco em conversão.";

// Palavras-chave principais.
const siteKeywords = [
  "criação de sites",
  "criação de sites profissionais",
  "landing page de alta conversão",
  "desenvolvimento web",
  "agência de sites",
  "sites para empresas",
  "e-commerce",
  "loja virtual",
  "SEO técnico",
  "design UI UX",
  "Next.js",
  "React",
  "UiCode",
  "UiCode.site",
];

// JSON-LD para dados estruturados.
// Ajuda buscadores a entenderem melhor que a UiCode.site é um negócio digital.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/uicode.jpeg`,
  image: `${siteUrl}/uicode.jpeg`,
  description: siteDescription,
  brand: {
    "@type": "Brand",
    name: siteName,
  },
  sameAs: [
    "https://instagram.com/uicode.dev",
  ],
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  serviceType: [
    "Criação de sites",
    "Landing pages",
    "E-commerce",
    "Desenvolvimento web",
    "Design UI/UX",
    "SEO técnico",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55 11 91647-4626",
    contactType: "Atendimento comercial",
    availableLanguage: ["Portuguese"],
  },
};

// Metadata principal do Next.js.
// Isso alimenta title, description, Open Graph, Twitter Card e indexação.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: siteName,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  title: {
    default: "Criação de Sites de Alta Conversão | UiCode.site",
    template: "%s | UiCode.site",
  },

  description: siteDescription,

  keywords: siteKeywords,

  authors: [
    {
      name: "UiCode.site",
      url: siteUrl,
    },
  ],

  creator: "UiCode.site",
  publisher: "UiCode.site",
  category: "technology",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "UiCode.site | Sites profissionais que vendem mais",
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/uicode.jpeg",
        width: 1200,
        height: 630,
        alt: "UiCode.site - Criação de sites profissionais",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "UiCode.site | Criação de Sites de Alta Conversão",
    description: siteDescription,
    images: ["/uicode.jpeg"],
  },

  icons: {
    icon: "/uicode.jpeg",
    shortcut: "/uicode.jpeg",
    apple: "/uicode.jpeg",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Configurações de viewport separadas.
// Forma recomendada no App Router para controlar tema e responsividade.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030303",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Dados estruturados para SEO avançado. */}
        <Script
          id="organization-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>

      <body className="min-h-screen bg-[#030303] text-white antialiased selection:bg-cyan-300 selection:text-black">
        {children}
      </body>
    </html>
  );
}