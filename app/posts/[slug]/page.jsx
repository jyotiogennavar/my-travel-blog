import Image from 'next/image'
import { getBlogPost } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.content ? post.content.content[0].content[0].value.slice(0, 150) + '...' : '',
    openGraph: {
      title: post.title,
      description: post.content ? post.content.content[0].content[0].value.slice(0, 150) + '...' : '',
      images: post.heroImage ? [{ url: post.heroImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content ? post.content.content[0].content[0].value.slice(0, 150) + '...' : '',
      images: post.heroImage ? [post.heroImage] : [],
    },
  }
}

export default async function BlogPost({ params }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.heroImage ? (
        <Image 
          src={post.heroImage} 
          alt={post.title} 
          width={1200} 
          height={600} 
          className="w-full h-[60vh] object-cover mb-8"
        />
      ) : (
        <div className="w-full h-[60vh] bg-gray-200 flex items-center justify-center mb-8">
          <span className="text-gray-500">No image available</span>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.categories.map((category, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
            {category}
          </span>
        ))}
      </div>
      <p className="text-gray-600 mb-8">
        By {post.author} on {new Date(post.publishedOn).toLocaleDateString()}
      </p>
      <div className="prose lg:prose-xl">
        {documentToReactComponents(post.content)}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}