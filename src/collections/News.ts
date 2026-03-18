import type { CollectionConfig } from 'payload'
import { deleteMediaAfterDelete } from '../hooks/deleteMedia'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Notícia', plural: 'Notícias' },
  admin: {
    useAsTitle: 'title',
    description: 'Gerenciamento de notícias e artigos do portal. Lembre-se de definir o status como "Publicado" para que a notícia apareça no site.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título da Notícia', admin: { description: 'O título principal que aparece na listagem e na página da notícia.' } },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL Amigável (Slug)', admin: { description: 'Gerado automaticamente, mas pode ser editado. Ex: minha-noticia-importante' } },
    { name: 'excerpt', type: 'textarea', label: 'Resumo / Olho da Notícia' },
    { name: 'content', type: 'richText', label: 'Conteúdo Completo' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Imagem de Destaque' },
    { name: 'publishDate', type: 'date', label: 'Data de Publicação' },
    { name: 'status', type: 'select', options: ['Rascunho', 'Publicado'], defaultValue: 'Rascunho', label: 'Status' },
  ],
  hooks: {
    afterDelete: [deleteMediaAfterDelete],
  },
}
