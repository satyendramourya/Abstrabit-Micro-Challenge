

"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase-browser"
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js"

export function useBookmarksRealtime(
  onChange: (payload: RealtimePostgresChangesPayload<any>) => void
) {
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
        (payload) => {
          onChange(payload)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [onChange])
}
