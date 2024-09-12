import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/lib/contentful'

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="block">
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {post.heroImage ? (
                <Image 
                  src={post.heroImage} 
                  alt={post.title} 
                  width={400} 
                  height={200} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {category}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  By {post.author} on {new Date(post.publishedOn).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}