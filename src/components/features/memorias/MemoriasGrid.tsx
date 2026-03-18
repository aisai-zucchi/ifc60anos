"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./MemoriasGrid.module.css";

interface Memoria {
  id: string;
  slug: string;
  category: string;
  title: string;
  author: string;
  about?: string | null;
}

interface MemoriasGridProps {
  initialMemorias: Memoria[];
}

export default function MemoriasGrid({ initialMemorias }: MemoriasGridProps) {
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.12 }
    );
    grid.querySelectorAll(`.${styles.card}`).forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  if (!initialMemorias || initialMemorias.length === 0) {
    return (
      <section className={styles.grid}>
        <p style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.5, padding: '4rem' }}>
          Nenhuma memória encontrada.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.grid} ref={gridRef}>
      {initialMemorias.map((m) => (
        <Link key={m.slug} href={`/memorias/${m.slug}`} className={styles.card}>
          <span className={styles.cat}>{m.category}</span>
          <h2 className={styles.title}>{m.title}</h2>
          <div className={styles.divider} />
          <div className={styles.meta}>
            Por: {m.author}
            {m.about && (
              <>
                <br />
                Sobre: {m.about}
              </>
            )}
          </div>
          <span className={styles.arrow}>Ler Memória →</span>
        </Link>
      ))}
    </section>
  );
}
