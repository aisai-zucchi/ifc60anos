import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: { singular: 'Foto do Acervo', plural: 'Galeria' },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título da Imagem' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Arquivo da Imagem' },
    { name: 'year', type: 'number', label: 'Ano do Registro' },
    { 
      name: 'decade', 
      type: 'select', 
      options: ['1960', '1970', '1980', '1990', '2000', '2010', '2020'],
      label: 'Década'
    },
    { name: 'campus', type: 'relationship', relationTo: 'campuses' as any, label: 'Campus Relacionado' },
    { name: 'tags', type: 'relationship', relationTo: 'tags' as any, hasMany: true, label: 'Categorias (Tags)' },
    { name: 'credits', type: 'text', label: 'Créditos / Autor da Foto' },
  ],
}
