import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import MemoriasGrid from "@/components/features/memorias/MemoriasGrid";
import { getPayload } from "payload";
import config from "@payload-config";

export const metadata: Metadata = {
  title: "Memórias",
  description: "Relatos e vivências que moldaram o IFC Campus Concórdia.",
};

export default async function MemoriasPage() {
  const payload = await getPayload({ config });
  const { docs: memorias } = await payload.find({
    collection: "memories" as any,
    where: {
      status: { equals: "Publicado" },
    },
    sort: 'ranking',
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      author: true,
      about: true,
      ranking: true,
      status: true,
    },
  });

  return (
    <>
      <PageHero
        bgImage="/imagens/imagens-galeria/formaturaPrimeiraTurma (1).jpg"
        eyebrow="Relatos e Vivências"
        title="Textos de"
        titleEm="Memórias"
      />
      <div className="section-intro">
        <p>
          Uma coleção de perspectivas sobre o cotidiano, os desafios e as
          conquistas que moldaram o campus ao longo de seis décadas.
        </p>
      </div>
      <MemoriasGrid initialMemorias={memorias as any} />
      <style>{`
        .section-intro {
          padding: 5rem 5rem 3rem;
          max-width: 680px;
        }
        .section-intro p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--color-muted);
        }
        @media (max-width: 900px) {
          .section-intro { padding: 3rem 2rem 2rem; }
        }
      `}</style>
    </>
  );
}
