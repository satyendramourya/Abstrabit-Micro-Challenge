
"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase-browser"

export function useBookmarksRealtime(onChange: () => void) {
  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT, DELETE, UPDATE
          schema: "public",
          table: "bookmarks",
        },
        () => {
          onChange() // refetch bookmarks
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [onChange])
}
