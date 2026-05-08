import type { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image = "/uicode.jpeg",
  url = "",
}: SEOProps): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://uicode.site${url}`,
      siteName: "UiCode.site",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `https://uicode.site${url}`,
    },
  };
}