import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleReader from "@/components/features/memorias/ArticleReader";
import { getPayload } from "payload";
import config from "@payload-config";

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const { docs: memorias } = await payload.find({
    collection: "memories" as any,
    limit: 100,
    select: {
      slug: true,
    } as any,
  });

  return memorias.map((m: any) => ({ slug: m.slug }));
}

// Removed generateStaticParams from here for multi_replace logic

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "memories" as any,
    where: {
      slug: { equals: slug },
    },
  });

  const memoria = docs[0];

  return {
    title: memoria ? (memoria as any).title : "Texto de Memória",
  };
}

export default async function MemoriaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "memories" as any,
    where: {
      slug: { equals: slug },
    },
  });

  const memoria = docs[0] as any;

  if (!memoria) notFound();

  return (
    <ArticleReader
      title={memoria.title}
      author={memoria.author}
      about={memoria.about || ""}
      content={memoria.content}
    />
  );
}
