import Image from 'next/image'
import Link from 'next/link'
import { getBlogPost, getBlogPosts } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, UserIcon } from "lucide-react"
import BlogInteractions from '@/components/BlogInteractions/BlogInteractions'
import styles from './page.module.css'

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
    return <div className={styles.postNotFound}>Post not found</div>
  }

  const relatedPosts = await getBlogPosts(3)

  return (
    <article className={`${styles.container} ${styles.article}`}>
      <Card>
        <CardHeader className={styles.header}>
          <CardTitle className={styles.title}>{post.title}</CardTitle>
          <div className={styles.metaInfo}>
            {post.author && (
              <div className={styles.authorLink}>
                <UserIcon className={styles.icon} />
                <span>{post.author.name}</span>
              </div>
            )}
            <div className={styles.authorLink}>
              <CalendarIcon className={styles.icon} />
              <span>{new Date(post.publishedOn).toLocaleDateString()}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className={styles.content}>
          {post.heroImage && (
            <div className={styles.heroImage}>
              <Image 
                src={post.heroImage}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          {post.categories && post.categories.length > 0 && (
            <div className={styles.tags}>
              {post.categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
          <div className={styles.prose}>
            {documentToReactComponents(post.content)}
          </div>
          <BlogInteractions />
          <Separator />
          <div>
            <h3 className={styles.sectionTitle}>Tags</h3>
            <div className={styles.tags}>
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
                <h3 className={styles.sectionTitle}>About the Author</h3>
                <Card>
                  <CardContent className={styles.authorInfo}>
                    {post.author.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={80}
                        height={80}
                        className={styles.authorAvatar}
                      />
                    ) : (
                      <div className={styles.authorAvatar}>
                        <UserIcon className={styles.icon} />
                      </div>
                    )}
                    <div>
                      <h4 className={styles.authorName}>{post.author.name}</h4>
                      <p className={styles.authorBio}>{post.author.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Separator />
            </>
          )}
          <div>
            <h3 className={styles.sectionTitle}>Related Posts</h3>
            <div className={styles.relatedPosts}>
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug}>
                  <Link href={`/posts/${relatedPost.slug}`}>
                    <CardHeader>
                      <CardTitle className={styles.relatedPostTitle}>{relatedPost.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={styles.relatedPostExcerpt}>{relatedPost.excerpt}</p>
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