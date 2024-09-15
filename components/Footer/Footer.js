import Link from "next/link";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
            Modern Blog
          </Link>
          <p className={styles.text}>
            Built with Next.js and Contentful. Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Vercel
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}