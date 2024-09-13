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

export async function getBlogPosts(limit = 100, category = null) {
  const query = {
    content_type: 'blogPost',
    order: '-fields.publishedOn',
    limit,
  }

  if (category) {
    query['fields.category.sys.contentType.sys.id'] = 'category'
    query['fields.category.fields.name'] = category
  }

  const response = await client.getEntries(query)

  return response.items.map(mapPostFields)
}

export async function getBlogPost(slug) {
  const response = await client.getEntries({
    content_type: 'blogPost',
    'fields.blogSlug': slug,
    limit: 1,
  })

  if (!response.items.length) {
    return null
  }

  return mapPostFields(response.items[0])
}

export async function getAuthors() {
  const response = await client.getEntries({
    content_type: 'author',
  })

  return response.items.map(mapAuthorFields)
}

function mapPostFields(item) {
  return {
    title: item.fields.blogTitle,
    slug: item.fields.blogSlug,
    content: item.fields.blogContent,
    excerpt: item.fields.blogContent ? item.fields.blogContent.content[0].content[0].value.slice(0, 150) + '...' : '',
    heroImage: item.fields.blogHeroImage?.fields?.file?.url,
    author: mapAuthorFields(item.fields.blogAuthor),
    categories: item.fields.category?.map(mapCategoryFields) || [],
    publishedOn: item.fields.publishedOn,
    tags: item.fields.tags?.map((tag) => tag.fields.tag) || [],
  }
}

function mapAuthorFields(item) {
  return {
    name: item.fields.authorName,
    slug: item.fields.authorSlug,
    bio: item.fields.authorBio,
    avatar: item.fields.authorAvatar?.fields?.file?.url,
    recentPosts: item.fields.recentPosts?.map(mapPostFields) || [],
  }
}

function mapCategoryFields(item) {
  return {
    name: item.fields.categoryName,
    description: item.fields.categoryDesc,
  }
}