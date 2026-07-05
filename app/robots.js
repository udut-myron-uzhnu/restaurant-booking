// Тиждень 13: robots.txt через convention Next.js
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/auth/login", "/auth/register"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
