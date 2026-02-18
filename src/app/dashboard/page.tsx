
"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase-browser"
import { useBookmarksRealtime } from "@/hooks/useBookmarksRealtime"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { EditBookmarkDialog } from "@/components/edit-bookmark-dialog"
import { ExternalLink, LayoutGrid, Loader2, LogOut, Pencil, Plus, Search, Trash2 } from "lucide-react"

export default function Dashboard() {
  const supabase = createClient()
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Edit Dialog State
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedBookmark, setSelectedBookmark] = useState<any>(null)

  const fetchBookmarks = useCallback(async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    setBookmarks(data || [])
  }, []) 

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

  // Realtime subscription with Payload Handling
  useBookmarksRealtime((payload) => {
      // console.log("Realtime event:", payload)
      const { eventType, new: newRecord, old: oldRecord } = payload

      if (eventType === 'INSERT') {
          setBookmarks((prev) => [newRecord, ...prev])
      } else if (eventType === 'DELETE') {
          setBookmarks((prev) => prev.filter((b) => b.id !== oldRecord.id))
      } else if (eventType === 'UPDATE') {
          setBookmarks((prev) => prev.map((b) => b.id === newRecord.id ? newRecord : b))
      }
  })

  const addBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title') as string
    const url = formData.get('url') as string
    
    if (!title || !url || !user) return

    // Optimistic update could go here, but Realtime is fast enough for now
    await supabase.from('bookmarks').insert({ 
        title, 
        url, 
        user_id: user.id 
    })
    form.reset()
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id)
  }
  
  const handleEdit = (bookmark: any) => {
      setSelectedBookmark(bookmark)
      setEditDialogOpen(true)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
      return (
        <div className="flex justify-center items-center h-screen bg-neutral-50">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
        </div>
      )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-neutral-50/50">
      
      {/* Edit Dialog */}
      {selectedBookmark && (
        <EditBookmarkDialog 
            open={editDialogOpen} 
            onOpenChange={setEditDialogOpen} 
            bookmark={selectedBookmark} 
        />
      )}
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-neutral-900">
                <LayoutGrid className="h-6 w-6" />
                <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-500 hidden sm:inline-block truncate max-w-[200px]">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={signOut} className="text-neutral-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Input Area - Boxy & Horizontal */}
        <div className="bg-white rounded-xl border shadow-sm p-1">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold tracking-tight text-neutral-900 flex items-center gap-2">
                        <Plus className="h-5 w-5 text-neutral-500" />
                        Add New Bookmark
                    </h2>
                    <p className="text-neutral-500 text-sm">Paste a URL and give it a title to save it to your collection.</p>
                </div>
                
                <form onSubmit={addBookmark} className="flex flex-col md:flex-row gap-4 items-start md:items-end w-full">
                    <div className="grid w-full gap-2">
                        <Label htmlFor="title" className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Title</Label>
                        <Input 
                            name="title" 
                            id="title" 
                            placeholder="e.g. My Favorite Blog" 
                            required 
                            className="bg-neutral-50 border-neutral-200 focus:bg-white transition-all h-11"
                        />
                    </div>
                    <div className="grid w-full gap-2">
                        <Label htmlFor="url" className="text-xs font-medium text-neutral-500 uppercase tracking-wider">URL</Label>
                        <Input 
                            name="url" 
                            id="url" 
                            type="url" 
                            placeholder="https://example.com" 
                            required 
                            className="bg-neutral-50 border-neutral-200 focus:bg-white transition-all h-11"
                        />
                    </div>
                    <Button type="submit" className="w-full md:w-auto h-11 px-8 font-medium bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm whitespace-nowrap">
                        Save Bookmark
                    </Button>
                </form>
            </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight text-neutral-900">
                    Your Bookmarks <span className="ml-2 text-sm font-normal text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">{bookmarks.length}</span>
                </h3>
                {/* Search placeholder - visual only for now */}
                {bookmarks.length > 0 && (
                     <div className="relative w-full max-w-xs hidden sm:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
                        <Input 
                            type="search" 
                            placeholder="Search bookmarks..." 
                            className="w-full bg-white pl-9 h-9 text-sm"
                            disabled
                        />
                    </div>
                )}
            </div>

            {bookmarks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {bookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="group relative bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between h-40">
                             <div>
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="h-8 w-8 rounded bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold text-xs shrink-0 uppercase">
                                        {bookmark.title.substring(0,2)}
                                    </div>
                                    <div className="flex gap-1 -mr-2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 text-neutral-300 hover:text-blue-500 hover:bg-blue-50"
                                            onClick={() => handleEdit(bookmark)}
                                            title="Edit"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 text-neutral-300 hover:text-red-500 hover:bg-red-50"
                                            onClick={() => deleteBookmark(bookmark.id)}
                                            title="Delete"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                                <h4 className="font-semibold text-neutral-900 truncate pr-4" title={bookmark.title}>{bookmark.title}</h4>
                                <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-primary hover:underline truncate block mt-1">
                                    {bookmark.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                </a>
                             </div>
                             
                             <div className="flex items-center justify-between pt-4 mt-auto border-t border-neutral-50">
                                <span className="text-[10px] text-neutral-400 font-medium">
                                    {new Date(bookmark.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                                <a 
                                    href={bookmark.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-medium text-neutral-500 flex items-center gap-1 hover:text-neutral-900 transition-colors"
                                >
                                    OPEN <ExternalLink className="h-3 w-3" />
                                </a>
                             </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-12 text-center">
                    <div className="mx-auto h-12 w-12 text-neutral-300 mb-4 bg-white rounded-full flex items-center justify-center border">
                        <Plus className="h-6 w-6" />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-neutral-900">No bookmarks added</h3>
                    <p className="mt-1 text-sm text-neutral-500">Get started by creating a new bookmark above.</p>
                </div>
            )}
        </div>

      </main>
    </div>
  )
}
