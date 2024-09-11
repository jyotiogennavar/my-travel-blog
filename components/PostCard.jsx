import Link from 'next/link'
import Image from 'next/image'

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="block">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <Image src={post.featuredImage.url} alt={post.title} width={400} height={200} className="w-full" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600">{post.excerpt}</p>
        </div>
      </div>
    </Link>
  )
}