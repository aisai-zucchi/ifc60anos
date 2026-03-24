"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./GalleryClient.module.css";

interface GalleryImage {
  src: string;
  year: number;
  desc: string;
  tags: string[];
}

const IMAGES: GalleryImage[] = [
  {
    src: "/imagens/imagens-galeria/EAgrotecnica.jpg",
    year: 1999,
    desc: "Várias pessoas e uma bandeirona do Brasil",
    tags: ["Alunos", "Eventos"],
  },
  {
    src: "/imagens/imagens-galeria/depenandoGalinha1969 (1).jpg",
    year: 1979,
    desc: "Crianças depenando galinhas",
    tags: ["Alunos"],
  },
  {
    src: "/imagens/imagens-galeria/refeitorio.jpg",
    year: 1969,
    desc: "Refeitório do IFC",
    tags: ["Infraestrutura"],
  },
  {
    src: "/imagens/imagens-galeria/inauguracaoCampo.jpg",
    year: 1969,
    desc: "Inauguração do Campo do IFC Concórdia",
    tags: ["Infraestrutura", "Eventos"],
  },
  {
    src: "/imagens/imagens-galeria/formaturaPrimeiraTurma (1).jpg",
    year: 1969,
    desc: "Primeira turma a se formar no IFC Concórdia",
    tags: ["Alunos", "Eventos"],
  },
];

const TAGS = ["Desfiles", "Infraestrutura", "Alunos", "Eventos"];

export default function GalleryClient() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const containerRef = useRef<HTMLDivElement>(null);
  const observerTargetRef = useRef<HTMLDivElement>(null);

  const filtered = IMAGES.filter((img) => {
    if (!activeTag) return true;
    return img.tags.includes(activeTag);
  }).sort((a, b) => a.year - b.year);

  const currentlyVisible = filtered.slice(0, visibleCount);

  // Reset infinite scroll taking into account tags
  useEffect(() => {
    setVisibleCount(12);
  }, [activeTag]);

  // Infinite scroll observer
  useEffect(() => {
    const target = observerTargetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [filtered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.08 }
    );

    const items = container.querySelectorAll(`.${styles.item}`);
    items.forEach((el) => {
      el.classList.remove(styles.visible);
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, [currentlyVisible]);

  return (
    <>
      <div className={styles.filters}>
        <span className={styles.filtersLabel}>Filtrar por:</span>
        <div className={styles.tagsArea}>
          {TAGS.map((tag) => (
            <button
              key={tag}
              className={`${styles.tag} ${activeTag === tag ? styles.ativo : ""}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.container} ref={containerRef}>
          {currentlyVisible.map((img, i) => (
            <div 
              key={`${img.src}-${i}`} 
              className={styles.item}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img.src}
                alt={img.desc}
                width={600}
                height={400}
                sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw"
                style={{ width: "100%", height: "auto" }}
              />
              <div className={styles.overlay}>
                <span className={styles.fotoTag}>
                  {img.year} — {img.tags.join(" · ")}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {visibleCount < filtered.length && (
          <div ref={observerTargetRef} className={styles.observerTarget}>
            <div className={styles.loadMore}>Carregando mais imagens...</div>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <div className={styles.lightboxClose}>&times;</div>
          <div className={styles.lightboxContent}>
            <Image 
              src={selectedImage.src} 
              alt={selectedImage.desc}
              fill
              style={{ objectFit: 'contain' }}
              sizes="100vw"
            />
            <div className={styles.lightboxDesc}>
              {selectedImage.year} — {selectedImage.desc}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
