import { createClient } from 'contentful'

// const client = createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
// })

const client = createClient({
  space: 'vnogkj8p0t2g',
  accessToken: '7Ep3lweqoIhowtHxIxsnLAefnFJK7bVu6OJlbBZJVdU',
})

export async function getBlogPosts(limit = 100, categorySlug = null) {
  const query = {
    content_type: 'blogPost',
    order: '-fields.publishedOn',
    limit,
  }

  if (categorySlug) {
    query['fields.category.sys.contentType.sys.id'] = 'category'
    query['fields.category.fields.slug'] = categorySlug
  }

  try {
    const response = await client.getEntries(query)
    return response.items.map(mapPostFields)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPost(slug) {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })

    if (!response.items.length) {
      return null
    }

    return mapPostFields(response.items[0])
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getCategories() {
  try {
    const response = await client.getEntries({
      content_type: 'category',
    })

    return response.items.map(mapCategoryFields)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

function mapPostFields(item) {
  const heroImageUrl = item.fields.heroImage?.fields?.file?.url
  const absoluteHeroImageUrl = heroImageUrl ? `https:${heroImageUrl}` : null

  return {
    title: item.fields.title || '',
    slug: item.fields.slug || '',
    content: item.fields.content || {},
    excerpt: item.fields.excerpt || (item.fields.content ? item.fields.content.content[0]?.content[0]?.value?.slice(0, 150) + '...' : ''),
    heroImage: absoluteHeroImageUrl,
    author: item.fields.author ? mapAuthorFields(item.fields.author) : null,
    category: item.fields.category ? mapCategoryFields(item.fields.category) : null,
    publishedOn: item.fields.publishedOn || new Date().toISOString(),
    tags: item.fields.tags || [],
  }
}

function mapAuthorFields(item) {
  if (!item || !item.fields) return null

  const avatarUrl = item.fields.avatar?.fields?.file?.url
  const absoluteAvatarUrl = avatarUrl ? `https:${avatarUrl}` : null

  return {
    name: item.fields.name || '',
    slug: item.fields.slug || '',
    bio: item.fields.bio || '',
    avatar: absoluteAvatarUrl,
  }
}

function mapCategoryFields(item) {
  if (!item || !item.fields) return null

  return {
    name: item.fields.name || '',
    slug: item.fields.slug || '',
    description: item.fields.description || '',
  }
}