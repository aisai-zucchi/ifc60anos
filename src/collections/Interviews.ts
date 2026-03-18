import type { CollectionConfig } from 'payload'

export const Interviews: CollectionConfig = {
  slug: 'interviews',
  labels: { singular: 'Entrevista', plural: 'Entrevistas' },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título da Entrevista' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL Amigável (Slug)' },
    { name: 'person', type: 'relationship', relationTo: 'people' as any, required: true, label: 'Entrevistado' },
    { name: 'type', type: 'select', options: ['Áudio', 'Vídeo'], required: true, label: 'Formato da Entrevista' },
    { name: 'videoUrl', type: 'text', label: 'Link do Vídeo (YouTube/Vimeo)' },
    { name: 'audioFile', type: 'upload', relationTo: 'media', label: 'Arquivo de Áudio Bruto' },
    { name: 'transcription', type: 'richText', label: 'Transcrição em Texto' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', label: 'Imagem de Capa' },
    { name: 'dateRecorded', type: 'date', label: 'Data de Gravação' },
    { name: 'status', type: 'select', options: ['Rascunho', 'Publicado'], defaultValue: 'Rascunho', label: 'Status' },
  ],
}
