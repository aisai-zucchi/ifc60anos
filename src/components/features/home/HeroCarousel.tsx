"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./HeroCarousel.module.css";

const SLIDES_FALLBACK = [
  {
    src: "/imagens/imagens-galeria/depenandoGalinha1969 (1).jpg",
    alt: "Alunos do IFC em 1969",
    title: "Legado em Evolução",
    subtitle: "Sessenta anos formando profissionais, transformando o Oeste Catarinense e construindo um futuro com raízes firmes.",
    ctaLink: "/historia",
  },
  {
    src: "/imagens/imagens-galeria/formaturaPrimeiraTurma (1).jpg",
    alt: "Formatura da primeira turma",
    title: "Campus Concórdia",
    subtitle: "Uma história de lutas e vitórias.",
    ctaLink: "/historia",
  },
];

export default function HeroCarousel({ banners }: { banners?: any[] }) {
  const [current, setCurrent] = useState(0);

  const SLIDES = banners && banners.length > 0 ? banners.map(b => ({
    src: (b.image && b.image.url) ? b.image.url : '/imagens/imagens-galeria/EAgrotecnica.jpg',
    alt: b.title || 'IFC 60 Anos',
    title: b.title,
    subtitle: b.subtitle,
    ctaLink: b.ctaLink,
  })) : SLIDES_FALLBACK;

  const isCarousel = SLIDES.length > 1;
  const currentSlide = SLIDES[current];

  const goTo = useCallback((n: number) => {
    setCurrent((n + SLIDES.length) % SLIDES.length);
  }, [SLIDES.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (!isCarousel) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isCarousel]);

  return (
    <section className={styles.hero}>
      <div className={styles.slides}>
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.active : ""}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span>1964 — 2024 · Campus Concórdia</span>
        </div>
        
        {/* Usamos key no h1 para forçar o React a re-animar o texto se usarmos CSS animations futuramente */}
        <h1 key={currentSlide.title}>
          {currentSlide.title}
        </h1>
        
        {currentSlide.subtitle && (
          <p className={styles.desc} key={`desc-${current}`}>
            {currentSlide.subtitle}
          </p>
        )}
        
        {currentSlide.ctaLink && (
          <a href={currentSlide.ctaLink} className={styles.cta}>
            Explorar a história
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>

      {isCarousel && (
        <>
          <div className={styles.indicators}>
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i === current ? styles.activeDot : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button className={styles.arrowRight} onClick={() => goTo(current + 1)}>
            →
          </button>
        </>
      )}
    </section>
  );
}
