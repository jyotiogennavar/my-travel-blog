'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ThumbsUpIcon, ShareIcon, MessageSquareIcon } from "lucide-react"
import styles from './BlogInteractions.module.css'

export default function BlogInteractions() {
  const [likes, setLikes] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')

  const handleLike = () => {
    setLikes(likes + 1)
  }

  const handleShare = () => {
    // Implement share functionality
    alert('Share functionality to be implemented')
  }

  const handleComment = () => {
    // Implement comment submission
    console.log('Comment submitted:', comment)
    setComment('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button variant="outline" onClick={handleLike} className={styles.button}>
          <ThumbsUpIcon className={styles.icon} />
          Like ({likes})
        </Button>
        <Button variant="outline" onClick={handleShare} className={styles.button}>
          <ShareIcon className={styles.icon} />
          Share
        </Button>
        <Button variant="outline" onClick={() => setShowComments(!showComments)} className={styles.button}>
          <MessageSquareIcon className={styles.icon} />
          Comments
        </Button>
      </div>
      {showComments && (
        <div className={styles.commentSection}>
          <Textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleComment}>Submit Comment</Button>
        </div>
      )}
    </div>
  )
}