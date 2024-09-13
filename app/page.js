import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/lib/contentful'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, UserIcon } from "lucide-react"

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getBlogPosts()
      setPosts(fetchedPosts)
    }
    
    fetchPosts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center">
        Welcome to Our Modern Blog
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col">
            <Link href={`/posts/${post.slug}`}>
              <div className="relative h-48 w-full">
                {post.heroImage ? (
                  <Image 
                    src={post.heroImage} 
                    alt={post.title} 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-lg">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold hover:text-primary transition-colors duration-200">
                  {post.title}
                </CardTitle>
              </CardHeader>
            </Link>
            <CardContent>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{new Date(post.publishedOn).toLocaleDateString()}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
