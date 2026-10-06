import { WeddingSite } from "@/components/site/WeddingSite";
import { getSiteContent } from "@/lib/content-storage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function Home() {
  const content = await getSiteContent();
  return <WeddingSite content={content} />;
}
