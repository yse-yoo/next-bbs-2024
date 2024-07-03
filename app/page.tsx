'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThreadThumb from './components/ThreadThumb'

export default function ThreadsPage() {
  const [threads, setThreads] = useState<Thread[]>([])

  useEffect(() => {
    fetch('/api/thread/latest')
      .then(response => response.json())
      .then(data => setThreads(data))
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Next BBS</h1>
      <div className="mb-6">
        <Link href="/thread/new" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          新しいスレッドを作成
        </Link>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4 text-center">新着スレッド</h3>
        {threads.map(thread => (
          <ThreadThumb thread={thread}/>
        ))}
      </div>
    </div>
  )
}