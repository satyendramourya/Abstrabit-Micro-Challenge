
"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase-browser"
import { useBookmarksRealtime } from "@/hooks/useBookmarksRealtime"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const supabase = createClient()
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchBookmarks = useCallback(async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    setBookmarks(data || [])
  }, []) // Dependency array empty as supabase client is stable or we don't care

  useEffect(() => {
    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            router.push("/login")
        } else {
            setUser(user)
            fetchBookmarks()
        }
        setLoading(false)
    }
    getUser()
  }, [router, fetchBookmarks])

  // ✅ REALTIME MAGIC
  // We use useCallback for fetchBookmarks so it doesn't change on every render, preventing re-subscription loop
  useBookmarksRealtime(fetchBookmarks)


  const addBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title') as string
    const url = formData.get('url') as string
    
    if (!title || !url || !user) return

    await supabase.from('bookmarks').insert({ 
        title, 
        url, 
        user_id: user.id 
    })
    // UI updates automatically via Realtime subscription!
    form.reset()
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id)
    // UI updates automatically via Realtime subscription!
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user.email}</p>
          </div>
          <button 
            onClick={signOut}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium"
          >
            Sign Out
          </button>
        </header>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Bookmark</h2>
            <form onSubmit={addBookmark} className="flex flex-col md:flex-row gap-4">
                <input 
                    name="title" 
                    placeholder="Site Title" 
                    required
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <input 
                    name="url" 
                    type="url" 
                    placeholder="https://example.com" 
                    required
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
                    Add Bookmark
                </button>
            </form>
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Bookmarks</h2>
            {bookmarks && bookmarks.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {bookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="group bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative">
                            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="block">
                                <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors">{bookmark.title}</h3>
                                <p className="text-gray-500 text-sm truncate">{bookmark.url}</p>
                            </a>
                            <button 
                                onClick={() => deleteBookmark(bookmark.id)} 
                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-600" 
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className="mt-4 text-xs text-gray-400">
                                Added {new Date(bookmark.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
                    <p className="text-gray-500">No bookmarks yet. Add one above!</p>
                </div>
            )}
        </section>
      </div>
    </div>
  )
}
