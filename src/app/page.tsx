


import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to <a className="text-blue-600" href="#">My App</a>
        </h1>

        <div className="flex gap-4">
          {user ? (
            <Link 
              href="/dashboard"
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link 
              href="/login"
              className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        <div className="mt-8 text-sm text-gray-500">
           Supabase connection established.
        </div>
      </main>
    </div>
  )
}
