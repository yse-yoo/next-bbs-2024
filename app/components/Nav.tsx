import Link from 'next/link';
import React from 'react';

function Nav() {
    return (
        <nav className="bg-blue-500 p-4 flex items-center">
            <Link href="/" passHref>
                <span className="text-2xl text-white hover:text-gray-200">Next BBS</span>
            </Link>
            <ul className="flex space-x-4 mx-3">
                <li>
                    <Link href="/thread/" passHref>
                        <span className="text-white hover:text-gray-200">スレッド</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;