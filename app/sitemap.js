// Тиждень 13: sitemap.xml через convention Next.js
import dbConnect from "@/lib/db";
import Table from "@/lib/models/Table";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const staticRoutes = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/tables`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  let dynamicRoutes = [];
  try {
    await dbConnect();
    const tables = await Table.find().select("_id updatedAt").lean();
    dynamicRoutes = tables.map((t) => ({
      url: `${siteUrl}/tables/${t._id}`,
      lastModified: t.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // якщо база недоступна під час білда — повертаємо лише статичні маршрути
  }

  return [...staticRoutes, ...dynamicRoutes];
}
