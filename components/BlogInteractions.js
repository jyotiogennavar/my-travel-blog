'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ThumbsUpIcon, ShareIcon, MessageSquareIcon } from "lucide-react"

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
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Button variant="outline" onClick={handleLike}>
          <ThumbsUpIcon className="mr-2 h-4 w-4" />
          Like ({likes})
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <ShareIcon className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" onClick={() => setShowComments(!showComments)}>
          <MessageSquareIcon className="mr-2 h-4 w-4" />
          Comments
        </Button>
      </div>
      {showComments && (
        <div className="space-y-2">
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
