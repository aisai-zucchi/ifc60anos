import type { CollectionConfig } from 'payload'
import { deleteMediaAfterDelete } from '../hooks/deleteMedia'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: { singular: 'Foto do Acervo', plural: 'Galeria' },
  defaultSort: 'ranking',
  admin: {
    useAsTitle: 'title',
    description: '🖼️ RELICÁRIO: Fotos para a Galeria e Memórias. Use legendas descritivas. Ao excluir, o arquivo físico também sai do servidor.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título da Imagem', admin: { description: 'Breve descrição da foto para identificação.' } },
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Arquivo da Imagem', admin: { description: 'Faça o upload da foto original. O sistema gerará versões otimizadas automaticamente.' } },
    { name: 'year', type: 'number', label: 'Ano do Registro', admin: { description: 'Ano em que a foto foi tirada (Ex: 1964).' } },
    {
      name: 'decade',
      type: 'select',
      options: ['1960', '1970', '1980', '1990', '2000', '2010', '2020'],
      label: 'Década'
    },
    { name: 'campus', type: 'relationship', relationTo: 'campuses' as any, label: 'Campus Relacionado' },
    { name: 'tags', type: 'relationship', relationTo: 'tags' as any, hasMany: true, label: 'Categorias (Tags)' },
    { name: 'credits', type: 'text', label: 'Créditos / Autor da Foto' },
    { name: 'ranking', type: 'number', label: 'Ranking (Menor = Primeiro)', defaultValue: 100, admin: { position: 'sidebar' } },
  ],
  hooks: {
    afterDelete: [deleteMediaAfterDelete],
  },
}
