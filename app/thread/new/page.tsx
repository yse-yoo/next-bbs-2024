'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewThreadPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/thread/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
    if (res.ok) {
      router.push('/')
    } else {
      console.error('Failed to create thread')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">新しいスレッドを作成</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="w-full p-2 border border-gray-300 rounded mb-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          required
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="内容"
          required
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">
          作成
        </button>
        <Link href="/thread/" className="inline-block bg-white py-2 px-4 rounded hover:bg-gray-100">
          もどる
        </Link>
      </form>
    </div>
  )
}