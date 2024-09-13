'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Handle subscription logic here
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to our newsletter</DialogTitle>
          <DialogDescription>
            Get the latest posts delivered right to your inbox.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <Input type="email" placeholder="Enter your email" required />
          <Button type="submit">Subscribe</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
