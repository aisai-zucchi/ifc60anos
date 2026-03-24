import type { CollectionConfig } from 'payload'
import { deleteMediaAfterDelete } from '../hooks/deleteMedia'

export const Interviews: CollectionConfig = {
  slug: 'interviews',
  labels: { singular: 'Entrevista', plural: 'Entrevistas' },
  defaultSort: 'rank',
  admin: {
    useAsTitle: 'title',
    description: '🎙️ VOZES DO CAMPUS: Cole o link do YouTube para vídeos ou suba o arquivo de áudio. IMPORTANTE: Cada entrevista deve ser vinculada a uma "Pessoa" cadastrada previamente.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título da Entrevista' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL Amigável (Slug. Ex: entrevista-nome-sobrenome)' },
    { name: 'person', type: 'relationship', relationTo: 'people' as any, required: true, label: 'Entrevistado' },
    { name: 'type', type: 'select', options: ['Áudio', 'Vídeo', 'Texto'], required: true, label: 'Formato da Entrevista' },
    { name: 'videoUrl', type: 'text', label: 'Link do Vídeo (YouTube/Vimeo)' },
    { name: 'audioFile', type: 'upload', relationTo: 'media', label: 'Arquivo de Áudio Bruto' },
    { name: 'transcription', type: 'richText', label: 'Transcrição em Texto' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', label: 'Imagem de Capa' },
    { name: 'dateRecorded', type: 'date', label: 'Data de Gravação' },
    { name: 'rank', type: 'number', label: 'Ranking (Menor = Primeiro)', defaultValue: 100, admin: { position: 'sidebar' } },
    { name: 'status', type: 'select', options: ['Rascunho', 'Publicado'], defaultValue: 'Rascunho', label: 'Status' },
  ],
  hooks: {
    afterDelete: [deleteMediaAfterDelete],
  },
}
