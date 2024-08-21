'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(path => path)

  // Only show breadcrumbs on specific nested pages
  if (paths.length !== 2 || !['anime', 'manga', 'meme'].includes(paths[0])) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 py-2">
      <ol className="flex items-center">
        <li>
          <Link href="/" className="hover:text-blue-500 transition-colors">
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-2">/</span>
          <Link href={`/${paths[0]}`} className="hover:text-blue-500 transition-colors">
            {paths[0].charAt(0).toUpperCase() + paths[0].slice(1)}
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">{paths[1]}</span>
        </li>
      </ol>
    </nav>
  )
}