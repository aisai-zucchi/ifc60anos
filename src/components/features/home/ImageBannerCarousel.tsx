"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ImageBannerCarousel.module.css";

export default function ImageBannerCarousel({ banners }: { banners?: any[] }) {
  const [current, setCurrent] = useState(0);

  const SLIDES = banners && banners.length > 0 ? banners.map(b => ({
    src: (b.image && typeof b.image !== 'string' && b.image.url) ? b.image.url : '',
    alt: (b.image && typeof b.image !== 'string' && b.image.alt) || b.title || 'Banner',
    width: (b.image && typeof b.image !== 'string' && b.image.width) || 1200,
    height: (b.image && typeof b.image !== 'string' && b.image.height) || 400,
    ctaLink: b.ctaLink,
  })).filter(s => s.src) : [];

  const isCarousel = SLIDES.length > 1;

  const goTo = useCallback((n: number) => {
    if (SLIDES.length === 0) return;
    setCurrent((n + SLIDES.length) % SLIDES.length);
  }, [SLIDES.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (!isCarousel) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isCarousel]);

  if (!SLIDES.length) return null;

  return (
    <section className={styles.hero}>
      <div className={styles.slides}>
        {SLIDES.map((slide, i) => {
          const SlideContent = (
            <div
              key={i}
              className={`${styles.slide} ${i === current ? styles.active : ""}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority={i === 0}
              />
            </div>
          );

          if (slide.ctaLink) {
            return (
              <Link href={slide.ctaLink} key={i} passHref legacyBehavior>
                <a style={{ display: 'contents' }}>
                  {SlideContent}
                </a>
              </Link>
            );
          }

          return SlideContent;
        })}
      </div>

      {isCarousel && (
        <>
          <button className={styles.arrowLeft} onClick={prev} aria-label="Banner anterior">
            →
          </button>
          <button className={styles.arrowRight} onClick={next} aria-label="Próximo banner">
            →
          </button>
          
          <div className={styles.indicators}>
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i === current ? styles.activeDot : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
