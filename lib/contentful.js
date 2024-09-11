import { createClient } from 'contentful'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getBlogPosts() {
  const response = await client.getEntries({
    content_type: 'blogPost',
    order: '-sys.createdAt',
  })

  return response.items.map((item) => ({
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    featuredImage: item.fields.featuredImage.fields.file,
  }))
}

export async function getBlogPost(slug) {
  const response = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  })

  const post = response.items[0]

  return post ? {
    title: post.fields.title,
    content: post.fields.content,
    featuredImage: post.fields.featuredImage.fields.file,
    author: post.fields.author.fields.name,
  } : null
}

export async function getBlogPostSlugs() {
  const response = await client.getEntries({
    content_type: 'blogPost',
    select: 'fields.slug',
  })

  return response.items.map((item) => item.fields.slug)
}