import { createClient } from 'contentful'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

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
    name: item.fields.categoryName || '',
    slug: item.fields.categoryName.toLowerCase().replace(/\s+/g, '-') || '',
  }
}

function mapTagFields(item) {
  if (!item || !item.fields) return null

  return item.fields.tag || ''
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