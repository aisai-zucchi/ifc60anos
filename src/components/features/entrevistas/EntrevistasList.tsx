"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./EntrevistasList.module.css";

interface EntrevistasListProps {
  interviews?: any[];
}

export default function EntrevistasList({ interviews = [] }: EntrevistasListProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.1 }
    );
    section
      .querySelectorAll(`.${styles.item}`)
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [interviews]);

  if (interviews.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
         <div style={{ padding: '6rem 3rem', background: 'rgba(255,255,255,0.3)', borderRadius: '24px', border: '1px dashed var(--color-gold)', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', opacity: 0.6 }}>Nenhuma entrevista publicada ainda.</p>
         </div>
      </div>
    );
  }

  return (
    <section className={styles.list} ref={sectionRef}>
      {interviews.map((e, index) => {
        const invert = index % 2 !== 0;
        const featuredImage = typeof e.featuredImage !== 'string' ? e.featuredImage?.url : null;
        const personName = typeof e.person !== 'string' ? e.person?.name : '';

        return (
          <div
            key={e.id}
            className={`${styles.item} ${invert ? styles.invert : ""}`}
          >
            <div className={styles.text}>
              <span className={styles.num}>{(index + 1).toString().padStart(2, '0')}</span>
              <h2 className={styles.title}>{e.title}</h2>
              {personName && <span className="eyebrow" style={{ marginTop: '-0.5rem', marginBottom: '1rem', display: 'block' }}>{personName}</span>}
              <div className={styles.desc}>
                 {/* Note: Transcription/Content is rich text. Showing a snippet here. */}
                 {e.transcription ? "Entrevista disponível para leitura." : "Explore as memórias em áudio/vídeo abaixo."}
              </div>
              
              <LinkButton href={`/entrevistas/${e.slug}`} label="Ver Detalhes" />
            </div>
            
            <div className={styles.media}>
              {featuredImage && (
                <div className={styles.mediaImg}>
                  <Image
                    src={featuredImage}
                    alt={e.title}
                    width={800}
                    height={450}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </div>
              )}
              {e.videoUrl && (
                <div className={styles.mediaImg}>
                  <iframe
                    src={e.videoUrl?.replace('watch?v=', 'embed/')}
                    allowFullScreen
                    title={e.title}
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      border: "none",
                    }}
                  />
                </div>
              )}
              {e.audioFile && typeof e.audioFile !== 'string' && (
                <div className={styles.audioWrapper} style={{ marginTop: '1.5rem' }}>
                  <span className="eyebrow">Arquivo de Áudio</span>
                  <audio controls className={styles.audioPlayer} style={{ width: '100%' }}>
                    <source src={e.audioFile.url} type="audio/mpeg" />
                  </audio>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function LinkButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className={styles.btnTranscricao} style={{ marginTop: '2rem' }}>
      {label} →
    </a>
  );
}
