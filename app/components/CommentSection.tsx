"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: number
  author: string
  content: string
  timestamp: string
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "RetroGamer42",
      content: "This article blew my mind! Can't wait to try these techniques.",
      timestamp: "2 days ago",
    },
  ])
  const [newComment, setNewComment] = useState({ author: "", content: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.author && newComment.content) {
      setComments([
        ...comments,
        {
          ...newComment,
          id: Date.now(),
          timestamp: "Just now",
        },
      ])
      setNewComment({ author: "", content: "" })
    }
  }

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded-lg pixelated-border">
      <h3 className="text-2xl font-pixel mb-4">Comments</h3>

      {comments.length === 0 ? (
        <p className="text-dracula-comment font-mono mb-4">No comments yet. Be the first to share your thoughts!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="mb-4 p-3 bg-gray-700 rounded">
            <div className="flex justify-between items-center mb-2">
              <p className="font-mono text-dracula-green">{comment.author}</p>
              <span className="text-xs text-dracula-comment">{comment.timestamp}</span>
            </div>
            <p className="font-mono">{comment.content}</p>
          </div>
        ))
      )}

      <form onSubmit={handleSubmit} className="mt-6">
        <h4 className="text-lg font-pixel mb-3 text-dracula-purple">Add Your Comment</h4>
        <Input
          type="text"
          placeholder="Your name"
          value={newComment.author}
          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
          className="mb-2 font-mono"
        />
        <Textarea
          placeholder="Your comment"
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          className="mb-2 font-mono"
          rows={4}
        />
        <Button type="submit" className="font-pixel">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default CommentSection

