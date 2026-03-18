import type { CollectionConfig } from 'payload'

export const People: CollectionConfig = {
  slug: 'people',
  labels: { singular: 'Personagem', plural: 'Personagens' },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nome Completo' },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, label: 'URL Amigável (Slug)' },
    { name: 'bio', type: 'richText', label: 'Biografia' },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Foto Oficial' },
    { 
      name: 'role', 
      type: 'select', 
      options: ['Aluno', 'Servidor', 'Comunidade', 'Diretor'],
      label: 'Função / Papel'
    },
    { name: 'campus', type: 'relationship', relationTo: 'campuses' as any, label: 'Campus de Vínculo' },
    { 
      name: 'status', 
      type: 'select', 
      options: ['Rascunho', 'Publicado'],
      defaultValue: 'Rascunho',
      label: 'Status de Publicação'
    },
  ],
}
