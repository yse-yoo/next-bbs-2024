import Link from 'next/link'
import React from 'react'

interface ThreadThumbProps {
    thread: Thread;
}

function ThreadThumb(props: ThreadThumbProps) {
    const thread = props.thread;

    return (
        <div key={thread.id} className="border-b border-gray-300 mb-4 pb-2">
            <div>
                <span className="text-gray-500 text-sm me-3">{new Date(thread.createdAt).toLocaleString()}</span>
                <Link href={`/thread/${thread.id}`} className="text-blue-500 hover:underline">
                    {thread.title}
                </Link>
            </div>
        </div>
    )
}

export default ThreadThumb