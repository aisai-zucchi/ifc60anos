import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Notícia', plural: 'Notícias' },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título da Notícia' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL Amigável (Slug)' },
    { name: 'excerpt', type: 'textarea', label: 'Resumo / Olho da Notícia' },
    { name: 'content', type: 'richText', label: 'Conteúdo Completo' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Imagem de Destaque' },
    { name: 'publishDate', type: 'date', label: 'Data de Publicação' },
    { name: 'status', type: 'select', options: ['Rascunho', 'Publicado'], defaultValue: 'Rascunho', label: 'Status' },
  ],
}
