import type { CollectionConfig } from 'payload'
import { deleteMediaAfterDelete } from '../hooks/deleteMedia'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Notícia', plural: 'Notícias' },
  defaultSort: 'rank',
  admin: {
    useAsTitle: 'title',
    description: '📰 NOTÍCIAS: Aqui você gerencia o portal de novidades. Use o editor para inserir fotos/áudios no corpo do texto. Lembre-se de definir como "Publicado" para aparecer no site.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título da Notícia', admin: { description: 'O título principal que aparece na listagem e na página da notícia.' } },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL Amigável (Slug)', admin: { description: 'Gerado automaticamente, mas pode ser editado. Ex: minha-noticia-importante' } },
    { name: 'excerpt', type: 'textarea', label: 'Resumo / Olho da Notícia' },
    { name: 'content', type: 'richText', label: 'Conteúdo Completo' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Imagem de Destaque' },
    { name: 'publishDate', type: 'date', label: 'Data de Publicação' },
    { name: 'rank', type: 'number', label: 'Ranking (Menor = Primeiro)', defaultValue: 100, admin: { position: 'sidebar' } },
    { name: 'status', type: 'select', options: ['Rascunho', 'Publicado'], defaultValue: 'Rascunho', label: 'Status' },
  ],
  hooks: {
    afterDelete: [deleteMediaAfterDelete],
  },
}
