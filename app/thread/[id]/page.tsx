'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TailSpin } from 'react-loader-spinner'

export default function ThreadPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [thread, setThread] = useState<Thread | null>(null)
  const [postContent, setPostContent] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return;
    fetch(`/api/thread/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setThread(data)
        }
      })
      .catch(() => setError('Failed to fetch thread'))
  }, [id])

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!thread) return
    const res = await fetch('/api/post/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId: thread.id, content: postContent }),
    })
    const newPost = await res.json()
    setThread({ ...thread, posts: [...thread.posts, newPost] })
    setPostContent('')
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!thread) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  const convertNewlinesToBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{thread.title}</h1>
      <p className="text-gray-500 text-sm">{new Date(thread.createdAt).toLocaleString()}</p>
      <p className="text-gray-700 mb-2">{convertNewlinesToBreaks(thread.content)}</p>

      <div className="my-2">
        <form onSubmit={handlePostSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="レスを追加"
            required
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">
            レス
          </button>
        </form>
      </div>
      <div className="mt-6">
        {thread.posts.map((post, index) => (
          <div key={post.id} className="border-b border-gray-300 mb-4 pb-2">
            <p className="text-gray-500">
              <span className="pe-3">{index + 1}.</span>
              <span className="text-sm">{new Date(post.createdAt).toLocaleString()}</span>
            </p>
            <p className="text-gray-800">
              {convertNewlinesToBreaks(post.content)}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}
