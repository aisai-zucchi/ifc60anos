import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configurações do Site',
  fields: [
    { name: 'seoTitle', type: 'text', defaultValue: ' | IFC 60 Anos' },
    { name: 'seoDescription', type: 'textarea' },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
