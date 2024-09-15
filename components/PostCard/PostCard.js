"use client";
import Link from "next/link";
import Image from "next/image";
import styles from './PostCard.module.css';

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.slug}`} className={styles.card}>
      <div className={styles.cardInner}>
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            width={400}
            height={200}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>
            No image available
          </div>
        )}
        <div className={styles.content}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.excerpt}>{post.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}