import React from 'react';
import '../../styles/admin.css';

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img
        src="/imagens/logoprojeto.png"
        alt="IFC 60 Anos"
        style={{ height: '40px', width: 'auto' }}
      />
      <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f5f0e8' }}>
        IFC 60 ANOS
      </span>
    </div>
  );
}
