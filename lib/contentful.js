import { createClient } from 'contentful'

// const client = createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
// });

const client = createClient({
  space: 'vnogkj8p0t2g',
  accessToken: '7Ep3lweqoIhowtHxIxsnLAefnFJK7bVu6OJlbBZJVdU',
})

// console.log('Space ID:', process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
// console.log('Access Token:', process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN)

function ensureAbsoluteUrl(url) {
  if (url.startsWith('//')) {
    return `https:${url}`
  }
  return url
}

export async function getBlogPosts() {
  const response = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.publishedOn',
  })

  return response.items.map((item) => ({
    title: item.fields.blogTitle,
    slug: item.fields.blogSlug,
    excerpt: item.fields.blogContent ? item.fields.blogContent.content[0].content[0].value.slice(0, 150) + '...' : '',
    heroImage: item.fields.blogHeroImage?.fields?.file?.url ? ensureAbsoluteUrl(item.fields.blogHeroImage.fields.file.url) : null,
    author: item.fields.blogAuthor?.fields?.name,
    categories: item.fields.category?.map(cat => cat.fields.name) || [],
    publishedOn: item.fields.publishedOn,
    tags: item.fields.tags?.map(tag => tag.fields.name) || [],
  }))
}

export async function getBlogPost(slug) {
  const response = await client.getEntries({
    content_type: 'blogPost',
    'fields.blogSlug': slug,
    limit: 1,
  })

  const post = response.items[0]

  if (!post) return null

  return {
    title: post.fields.blogTitle,
    content: post.fields.blogContent,
    heroImage: post.fields.blogHeroImage?.fields?.file?.url ? ensureAbsoluteUrl(post.fields.blogHeroImage.fields.file.url) : null,
    author: post.fields.blogAuthor?.fields?.name,
    categories: post.fields.category?.map(cat => cat.fields.name) || [],
    publishedOn: post.fields.publishedOn,
    tags: post.fields.tags?.map(tag => tag.fields.name) || [],
  }
}
export async function getBlogPostSlugs() {
  const response = await client.getEntries({
    content_type: 'blogPost',
    select: 'fields.blogSlug',
  })

  return response.items.map((item) => item.fields.blogSlug)
}

export default client