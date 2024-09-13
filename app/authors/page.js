import Link from 'next/link'
import Image from 'next/image'
import { getAuthors } from '@/lib/contentful'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center">Our Authors</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => (
          <Card key={author.slug}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                <Link href={`/authors/${author.slug}`} className="hover:text-primary transition-colors duration-200">
                  {author.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">{author.name[0]}</span>
                  </div>
                )}
                <p className="text-muted-foreground">{author.bio}</p>
              </div>
              <h3 className="font-semibold mb-2">Recent Posts:</h3>
              <ul className="list-disc list-inside">
                {author.recentPosts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors duration-200">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
