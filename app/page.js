import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/lib/contentful'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, UserIcon } from "lucide-react"
import styles from './page.module.css'

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to Our Travel Blog. Start Exploring!
      </h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Card key={post.slug} className={styles.card}>
            <Link href={`/posts/${post.slug}`}>
              <div className={styles.imageContainer}>
                {post.heroImage ? (
                  <Image 
                    src={post.heroImage} 
                    alt={post.title} 
                    layout="fill"
                    objectFit="cover"
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.noImage}>
                    <span className={styles.noImageText}>No image available</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className={styles.cardTitle}>
                  {post.title}
                </CardTitle>
              </CardHeader>
            </Link>
            <CardContent>
              <p className={styles.excerpt}>{post.excerpt}</p>
              {post.categories && post.categories.length > 0 && (
                <div className={styles.tags}>
                  {post.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className={styles.cardFooter}>
              {post.author && (
                <div className={styles.footerItem}>
                  <UserIcon className={styles.footerIcon} />
                  <span>{post.author.name}</span>
                </div>
              )}
              <div className={styles.footerItem}>
                <CalendarIcon className={styles.footerIcon} />
                <span>{new Date(post.publishedOn).toLocaleDateString()}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}