import React from 'react';

export default function BannerTutorial() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'rgba(184, 148, 63, 0.1)', 
      borderLeft: '4px solid #b8943f',
      borderRadius: '8px',
      marginBottom: '20px',
      color: '#1a3c2e'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>💡 Tutorial: Banners da Home</h3>
      <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', lineHeight: '1.5' }}>
        Estes banners aparecem como <strong>"faixas"</strong> logo abaixo do carrossel principal (Hero).
      </p>
      <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '0.85rem' }}>
        <li><strong>Imagens:</strong> Use imagens horizontais (tipo faixa). O carrossel se ajusta à altura da imagem.</li>
        <li><strong>Links:</strong> Se preencher o campo 'Link', a faixa inteira vira um botão clicável.</li>
        <li><strong>Ordem:</strong> Você pode arrastar os banners para mudar a ordem no site.</li>
      </ul>
    </div>
  );
}
