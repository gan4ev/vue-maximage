import { useHead } from '@vueuse/head'

export function useSeo({ title, description, keywords, image, url }) {
  const siteName = 'MaxImages'
  const defaultDescription = 'Create stunning AI-generated images with MaxImages. Transform your ideas into beautiful visuals using our advanced AI image generation tools.'
  const defaultImage = '/og-image.jpg' // You'll need to add this image to your public folder
  const baseUrl = 'https://maximage.com' // Replace with your actual domain

  useHead({
    title: title ? `${title} | ${siteName}` : siteName,
    meta: [
      {
        name: 'description',
        content: description || defaultDescription,
      },
      {
        name: 'keywords',
        content: keywords?.join(', ') || 'AI image generation, AI art, digital art, image creation, MaxImages',
      },
      // Open Graph
      {
        property: 'og:title',
        content: title ? `${title} | ${siteName}` : siteName,
      },
      {
        property: 'og:description',
        content: description || defaultDescription,
      },
      {
        property: 'og:image',
        content: image || `${baseUrl}${defaultImage}`,
      },
      {
        property: 'og:url',
        content: url || baseUrl,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      // Twitter
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: title ? `${title} | ${siteName}` : siteName,
      },
      {
        name: 'twitter:description',
        content: description || defaultDescription,
      },
      {
        name: 'twitter:image',
        content: image || `${baseUrl}${defaultImage}`,
      },
      // Additional SEO tags
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        'http-equiv': 'Content-Type',
        content: 'text/html; charset=utf-8',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: url || baseUrl,
      },
    ],
  })
}
