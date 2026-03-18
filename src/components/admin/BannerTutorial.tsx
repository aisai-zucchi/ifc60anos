import React from 'react';

export default function BannerTutorial() {
  return (
    <div style={{ 
      padding: '24px', 
      background: 'linear-gradient(135deg, #1a3c2e 0%, #0e2a1f 100%)', 
      color: '#f5f0e8',
      borderRadius: '12px',
      marginBottom: '32px',
      borderLeft: '8px solid #b8943f',
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ 
          margin: '0 0 12px 0', 
          color: '#b8943f', 
          fontSize: '1.4rem', 
          fontFamily: 'serif',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          ✨ Tutorial: Gestão de Banners
        </h3>
        <p style={{ margin: '0 0 16px 0', lineHeight: '1.6', fontSize: '1rem', opacity: 0.9 }}>
          Os banners que você adicionar abaixo aparecerão na página inicial como uma <strong>faixa horizontal (strip)</strong> logo abaixo do carrossel principal.
        </p>
        <ul style={{ paddingLeft: '20px', margin: '0', lineHeight: '1.8', fontSize: '0.95rem' }}>
          <li><strong>Proporção:</strong> Use imagens horizontais (ex: 1920x400 ou similares).</li>
          <li><strong>Links:</strong> Você pode adicionar um link facultativo em cada imagem.</li>
          <li><strong>Ordem:</strong> Arraste os itens para reorganizar a sequência de exibição.</li>
          <li><strong>Remoção:</strong> Ao excluir um banner aqui, o arquivo de imagem será removido do servidor automaticamente.</li>
        </ul>
      </div>
      
      {/* Subtle background decoration */}
      <div style={{ 
        position: 'absolute', 
        top: '-20px', 
        right: '-20px', 
        fontSize: '100px', 
        opacity: 0.1, 
        transform: 'rotate(15deg)',
        pointerEvents: 'none'
      }}>
        🖼️
      </div>
    </div>
  );
}
