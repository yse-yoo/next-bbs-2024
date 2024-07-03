import Link from 'next/link'
import React from 'react'

interface ThreadThumbProps {
    thread: Thread;
}

function ThreadThumb(props:ThreadThumbProps) {
    const thread = props.thread;

    return (
        <div key={thread.id} className="border-b border-gray-300 mb-4 pb-2">
            <p className="text-xl font-semibold">
                <Link href={`/thread/${thread.id}`} className="text-blue-500 hover:underline">
                    {thread.title}
                </Link>
            </p>
            <p className="text-gray-700">{thread.content}</p>
            <p className="text-gray-500 text-sm">{new Date(thread.createdAt).toLocaleString()}</p>
        </div>
    )
}

export default ThreadThumb