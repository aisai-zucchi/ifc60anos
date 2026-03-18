import type { GlobalConfig } from 'payload'

export const HomeInterface: GlobalConfig = {
  slug: 'home-interface',
  label: 'Interface da Home',
  admin: {
    description: 'Nesta seção você gerencia os elementos visuais da página inicial, como os banners principais (faixas).',
  },
  fields: [
    {
      name: 'bannerTutorial',
      type: 'ui',
      admin: {
        components: {
          Field: './components/admin/BannerTutorial#default',
        },
      },
    },
    {
      name: 'heroBanners',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        { name: 'ctaLink', type: 'text' },
      ],
    },
    {
      name: 'highlightStats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'featuredHistory',
      type: 'relationship',
      relationTo: ['interviews', 'gallery'] as any,
      hasMany: true,
    },
  ],
}
