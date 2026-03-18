import configPromise from '@payload-config';
import { getPayload } from 'payload';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/common/ScrollReveal';

export default async function NoticiaDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'news' as any,
    where: {
      slug: { equals: slug },
      status: { equals: 'Publicado' },
    },
  }) as any;

  if (!result.docs.length) {
    return notFound();
  }

  const noticia = result.docs[0];

  return (
    <article className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem', maxWidth: '800px' }}>
      <ScrollReveal>
        <div style={{ marginBottom: '2rem' }}>
           <span style={{ color: 'var(--color-gold)', fontSize: '0.9rem', fontWeight: 500 }}>
             {new Date(noticia.publishDate).toLocaleDateString('pt-BR')}
           </span>
           <h1 style={{ marginTop: '1rem', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>{noticia.title}</h1>
           <p style={{ fontSize: '1.2rem', opacity: 0.8, marginTop: '1.5rem', fontStyle: 'italic' }}>{noticia.excerpt}</p>
        </div>

        {noticia.coverImage && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem' }}>
            <Image
              src={typeof noticia.coverImage !== 'string' ? noticia.coverImage?.url : ''}
              alt={noticia.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        <div className="prose" style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          {/* Note: Payload 3 Rich Text (Lexical) needs a proper renderer. 
              As a simple implementation, we'll render some text if content exists. */}
          {noticia.content ? "Conteúdo da notícia disponível no Payload." : "Sem conteúdo adicional."}
        </div>
      </ScrollReveal>
    </article>
  );
}
