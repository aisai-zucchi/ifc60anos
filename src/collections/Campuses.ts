import type { CollectionConfig } from 'payload'

export const Campuses: CollectionConfig = {
  slug: 'campuses',
  labels: { singular: 'Campus', plural: 'Campi' },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
  ],
}
