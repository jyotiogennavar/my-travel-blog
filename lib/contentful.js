import { createClient } from 'contentful'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

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
      'fields.blogSlug': slug,
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

function mapPostFields(item) {
  const heroImageUrl = item.fields.blogHeroImage?.fields?.file?.url
  const absoluteHeroImageUrl = heroImageUrl ? `https:${heroImageUrl}` : null

  return {
    title: item.fields.blogTitle || '',
    slug: item.fields.blogSlug || '',
    content: item.fields.blogContent || {},
    excerpt: item.fields.blogContent ? documentToPlainTextString(item.fields.blogContent).slice(0, 150) + '...' : '',
    heroImage: absoluteHeroImageUrl,
    author: item.fields.blogAuthor ? mapAuthorFields(item.fields.blogAuthor) : null,
    categories: item.fields.category ? item.fields.category.map(mapCategoryFields) : [],
    publishedOn: item.fields.publishedOn || new Date().toISOString(),
    tags: item.fields.tags ? item.fields.tags.map(mapTagFields) : [],
  }
}

function mapAuthorFields(item) {
  if (!item || !item.fields) return null

  const avatarUrl = item.fields.authorAvator?.fields?.file?.url
  const absoluteAvatarUrl = avatarUrl ? `https:${avatarUrl}` : null

  return {
    name: item.fields.authorName || '',
    bio: item.fields.authorBio || '',
    avatar: absoluteAvatarUrl,
  }
}

function mapCategoryFields(item) {
  if (!item || !item.fields) return null

  return {
    name: item.fields.name || '',
    slug: item.fields.slug || '',
  }
}

function mapTagFields(item) {
  if (!item || !item.fields) return null

  return item.fields.name || ''
}

export async function getAuthors() {
  try {
    const response = await client.getEntries({
      content_type: 'author',
    })
    return response.items.map((item) => ({
      name: item.fields.authorName || '',
      bio: item.fields.authorBio || '',
      avatar: item.fields.authorAvator?.fields?.file?.url 
        ? `https:${item.fields.authorAvator.fields.file.url}` 
        : null,
    }))
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}