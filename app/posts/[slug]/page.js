import Image from 'next/image'
import Link from 'next/link'
import { getBlogPost, getBlogPosts } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, UserIcon } from "lucide-react"
import BlogInteractions from '@/components/BlogInteractions'

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.heroImage ? [{ url: post.heroImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.heroImage ? [post.heroImage] : [],
    },
  }
}

export default async function BlogPost({ params }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return <div className="container mx-auto px-4 py-12 text-center text-2xl text-muted-foreground">Post not found</div>
  }

  const relatedPosts = await getBlogPosts(3, post.category?.slug)

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle className="text-4xl font-extrabold">{post.title}</CardTitle>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.author && (
              <div className="flex items-center">
                <UserIcon className="mr-2 h-4 w-4" />
                <Link href={`/authors/${post.author.slug}`} className="hover:text-primary transition-colors duration-200">
                  {post.author.name}
                </Link>
              </div>
            )}
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{new Date(post.publishedOn).toLocaleDateString()}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {post.heroImage && (
            <div className="relative h-[60vh] rounded-lg overflow-hidden">
              <Image 
                src={post.heroImage}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          {post.category && (
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {post.category.name}
              </Badge>
            </div>
          )}
          <div className="prose dark:prose-invert max-w-none">
            {documentToReactComponents(post.content)}
          </div>
          <BlogInteractions />
          <Separator />
          <div>
            <h3 className="text-2xl font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Separator />
          {post.author && (
            <>
              <div>
                <h3 className="text-2xl font-semibold mb-4">About the Author</h3>
                <Card>
                  <CardContent className="flex items-center space-x-4 py-4">
                    {post.author.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                        <UserIcon className="h-10 w-10" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-lg">{post.author.name}</h4>
                      <p className="text-muted-foreground">{post.author.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Separator />
            </>
          )}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Related Posts</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug}>
                  <Link href={`/posts/${relatedPost.slug}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{relatedPost.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  )
}