import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import PageHero from "@/components/layout/PageHero";
import RichText from '@/components/common/RichText';

export const revalidate = 3600; // Recarrega a cada 1 hora

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const interviews = await payload.find({
    collection: 'interviews' as any,
    where: {
      status: { equals: 'Publicado' },
    },
    limit: 100,
  });

  return interviews.docs.map((doc: any) => ({
    slug: doc.slug,
  }));
}

export default async function EntrevistaInternaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });

  // Busca dados
  const result = await payload.find({
    collection: 'interviews' as any,
    where: {
      slug: { equals: slug },
      status: { equals: 'Publicado' },
    },
  });

  const entrevista = result.docs[0] as any;

  if (!entrevista) return notFound(); 

  return (
    <article className="min-h-screen bg-white">
      <PageHero
        bgImage={entrevista.featuredImage?.url || "/imagens/imagens-galeria/inauguracaoCampo.jpg"}
        eyebrow="Entrevista"
        title={entrevista.title}
      />
      
      <div className="container py-20">
        <div className="max-w-4xl mx-auto">
          
          {/*informações e a data*/}
          <div className="mb-10 border-b border-stone-200 pb-6 flex justify-between items-end">
            <div>
              {entrevista.dateRecorded && (
                <p className="text-lg font-medium text-green-800">
                  Realizada em: {new Date(entrevista.dateRecorded).toLocaleDateString('pt-BR')}
                </p>
              )}
              <p className="text-stone-500 italic">Formato: {entrevista.type}</p>
            </div>
            
            {/* Tag de Cargo */}
            {entrevista.person?.role && (
              <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold uppercase">
                {entrevista.person.role}
              </span>
            )}
          </div>

          {/*Audio*/}
          {entrevista.audioFile?.url && (
            <div className="mb-12 p-8 bg-stone-50 rounded-2xl border border-stone-200 shadow-sm">
              <h3 className="mb-4 font-bold text-stone-700">Ouvir Relato:</h3>
              <audio controls className="w-full">
                <source src={entrevista.audioFile.url} type="audio/mpeg" />
              </audio>
            </div>
          )}

          {/*Conteudo em escrito*/}
          <div className="max-w-none">
            <h2 className="text-3xl font-serif font-bold mb-8 text-stone-900 border-l-4 border-green-700 pl-4">
              Transcrição
            </h2>
            
            <div className="leading-relaxed text-stone-800 text-lg">
              {entrevista.transcription ? (
                <RichText content={entrevista.transcription} />
              ) : (
                <p className="italic text-stone-400">Sem transcrição.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}