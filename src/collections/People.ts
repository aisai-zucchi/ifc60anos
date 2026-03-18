import type { CollectionConfig } from 'payload'
import { deleteMediaAfterDelete } from '../hooks/deleteMedia'

export const People: CollectionConfig = {
  slug: 'people',
  labels: { singular: 'Personagem', plural: 'Personagens' },
  admin: {
    useAsTitle: 'name',
    description: 'Cadastro de pessoas, ex-alunos e professores que fazem parte da história do IFC.',
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nome Completo' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL Amigável (Slug)', admin: { description: 'Identificador único na URL do site.' } },
    { name: 'biography', type: 'richText', label: 'Biografia / História', admin: { description: 'Conte a trajetória desta pessoa no campus.' } },
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
