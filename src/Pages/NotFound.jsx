import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Home, ArrowLeft, FileText } from 'lucide-react'
import Pages from '../Component/Global/Pages'

const NotFound = () => {
  const { '*': requestedPath } = useParams()

  useEffect(() => {
    document.title = '404 | Page Not Found'
  }, [])

  return (
    <Pages>
      <div className="flex items-center justify-center p-4 h-screen select-none">
        <div className="text-center max-w-lg">
          <h1 className="text-8xl md:text-9xl font-black text-secondary">
            404
          </h1>

          {/* Illustration / Emoji style accent */}
          <div className="text-8xl md:text-9xl my-6">😵‍💫</div>

          <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2 mb-4">
            Page Not Found
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Sorry, we couldn't find the page you're looking for.
            <br />
            <span className="font-mono text-sm bg-secondary text-primary px-2 py-1 rounded mt-2 inline-block">
              "{requestedPath || '/'}"
            </span>{' '}
            doesn't seem to exist.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              to='/'
              className="border-black text-white cursor-pointer p-3 rounded-2xl text-center bg-secondary flex items-center gap-1.5 shadow-lg duration-250 hover:text-secondary hover:bg-primary hover:border-2"
            >
              <Home size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Pages>
  )
}

export default NotFound