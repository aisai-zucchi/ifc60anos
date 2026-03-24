import type { CollectionConfig } from 'payload'
import { deleteMediaAfterDelete } from '../hooks/deleteMedia'

export const Memories: CollectionConfig = {
  slug: 'memories',
  labels: { singular: 'Memória', plural: 'Memórias' },
  defaultSort: 'rank',
  admin: {
    useAsTitle: 'title',
    description: '📜 MEMÓRIAS: Relatos e vivências que moldaram o IFC Campus Concórdia. Use o editor para o texto completo.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título da Memória',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Amigável (Slug)',
    },
    {
      name: 'category',
      type: 'select',
      options: ['Cotidiano', 'Legado', 'Trabalho'],
      required: true,
      label: 'Categoria',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Autor(a)',
    },
    {
      name: 'about',
      type: 'text',
      label: 'Sobre (Breve descrição)',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Conteúdo Completo',
    },
    { name: 'rank', type: 'number', label: 'Ranking (Menor = Primeiro)', defaultValue: 100, admin: { position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      options: ['Rascunho', 'Publicado'],
      defaultValue: 'Rascunho',
      label: 'Status',
    },
  ],
  hooks: {
    afterDelete: [deleteMediaAfterDelete],
  },
}
