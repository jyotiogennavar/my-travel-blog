"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Sun, Search } from "lucide-react";
import styles from './Header.module.css';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Home</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/authors">Authors</Link>
        </nav>
        <div className={styles.spacer} />
        <div className={styles.actions}>
          {isSearchOpen ? (
            <Input
              type="search"
              placeholder="Search..."
              className={styles.searchInput}
            />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className={styles.themeIcon} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className={`${styles.themeIcon} ${styles.sunIcon}`} />
            <Moon className={`${styles.themeIcon} ${styles.moonIcon}`} />
            {/* <span className="sr-only">Toggle theme</span> */}
          </Button>
        </div>
      </div>
    </header>
  );
}