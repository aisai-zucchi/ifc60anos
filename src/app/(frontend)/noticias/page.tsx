import configPromise from '@payload-config';
import { getPayload } from 'payload';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/common/ScrollReveal';

export const revalidate = 3600; // Recarrega a cada 1 hora

export default async function NoticiaPage() {
  const payload = await getPayload({ config: configPromise });
  const news = await payload.find({
    collection: 'news' as any,
    where: {
      status: { equals: 'Publicado' },
    },
    sort: '-publishDate',
  }) as any;

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container">
        <ScrollReveal>
          <h1 style={{ marginBottom: '3rem' }}>Notícias</h1>
        </ScrollReveal>

        {news.docs.length === 0 ? (
          <ScrollReveal>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8rem 2rem',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '24px',
              border: '1px dashed var(--color-gold)',
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.3 }}>
                📰
              </div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-green)', marginBottom: '1rem' }}>
                Novidades em Breve
              </h2>
              <p style={{ maxWidth: '500px', opacity: 0.6, lineHeight: 1.6 }}>
                Ainda não temos notícias publicadas nesta seção. Fique atento às nossas atualizações sobre as comemorações dos 60 anos do IFC Campus Concórdia.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {news.docs.map((doc: any) => (
              <Link key={doc.id} href={`/noticias/${doc.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ cursor: 'pointer', background: 'var(--color-surface)', borderRadius: '12px', overflow: 'hidden', transition: 'transform 0.3s' }}>
                  <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                    <Image
                      src={typeof doc.coverImage !== 'string' ? doc.coverImage?.url || '/imagens/logoprojeto.png' : '/imagens/logoprojeto.png'}
                      alt={doc.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {new Date(doc.publishDate).toLocaleDateString('pt-BR')}
                    </span>
                    <h3 style={{ margin: '0.5rem 0 1rem', fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>{doc.title}</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.6 }}>{doc.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}