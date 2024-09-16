import Image from "next/image";
import { getAuthors } from "@/lib/contentful";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./page.module.css";

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Authors</h1>
      <div className={styles.grid}>
        {authors.map((author, index) => (
          <Card key={index} className={styles.authorCard}>
            <CardContent>
              <div className={styles.authorInfo}>
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name || "Author"}
                    width={100}
                    height={100}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.noAvatar}>
                    <span className={styles.noAvatarText}>
                      {author.name ? author.name[0] : "?"}
                    </span>
                  </div>
                )}
                <CardHeader className={styles.authorContent}>
                  <CardTitle className={styles.authorName}>
                    {author.name || "Unknown Author"}
                  </CardTitle>
                  <p className={styles.bio}>{author.bio || "No bio available"}</p>
                </CardHeader>
               
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
