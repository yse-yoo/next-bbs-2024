'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ThreadsPage() {
  const [threads, setThreads] = useState<Thread[]>([])

  useEffect(() => {
    fetch('/api/thread/get')
      .then(response => response.json())
      .then(data => setThreads(data))
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">スレッド一覧</h1>
      <div className="mb-6">
        <Link href="/thread/new" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          新しいスレッドを作成
        </Link>
      </div>
      <div>
        {threads.map(thread => (
          <div key={thread.id} className="border-b border-gray-300 mb-4 pb-2">
            <h2 className="text-2xl font-semibold">
              <Link href={`/thread/${thread.id}`} className="text-blue-500 hover:underline">
                {thread.title}
              </Link>
            </h2>
            <p className="text-gray-700">{thread.content}</p>
            <p className="text-gray-500 text-sm">{new Date(thread.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}