import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import EntrevistasList from "@/components/features/entrevistas/EntrevistasList";
import configPromise from '@payload-config';
import { getPayload } from 'payload';

export const revalidate = 3600; // Recarrega a cada 1 hora

export const metadata: Metadata = {
  title: "Vozes",
  description: "Testemunhos de quem ajudou a construir a história do IFC Campus Concórdia.",
};

export default async function EntrevistasPage() {
  const payload = await getPayload({ config: configPromise });
  const interviewsRes = await payload.find({
    collection: 'interviews' as any,
    where: {
      status: { equals: 'Publicado' },
    },
    sort: ['ranking', '-dateRecorded'],
  }) as any;

  return (
    <>
      <PageHero
        bgImage="/imagens/imagens-galeria/inauguracaoCampo.jpg"
        eyebrow="Relatos"
        title="Vozes do"
        titleEm="Campus"
      />
      <div className="section-intro container">
        <p>
          Testemunhos emocionantes de quem ajudou a construir a história de seis
          décadas do IFC Campus Concórdia.
        </p>
      </div>
      <EntrevistasList interviews={interviewsRes.docs} />
      <style>{`
        .section-intro {
          padding-top: 5rem;
          padding-bottom: 3rem;
          max-width: 800px;
        }
        .section-intro p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--color-muted);
        }
      `}</style>
    </>
  );
}
