import Link from 'next/link'
import { Bot } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-transparent border-b border-stone-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-400 to-blue-500">
              AI-Verse
            </span>
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="text-blue-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-blue-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

