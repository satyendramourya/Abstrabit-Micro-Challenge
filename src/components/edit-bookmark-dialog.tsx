
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase-browser"

interface EditBookmarkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookmark: any
}

export function EditBookmarkDialog({ open, onOpenChange, bookmark }: EditBookmarkDialogProps) {
  const [loading, setLoading] = React.useState(false)
  const supabase = createClient()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const url = formData.get("url") as string

    const { error } = await supabase
      .from("bookmarks")
      .update({ title, url })
      .eq("id", bookmark.id)

    setLoading(false)
    
    if (!error) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bookmark</DialogTitle>
          <DialogDescription>
            Make changes to your bookmark here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue={bookmark?.title}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                name="url"
                defaultValue={bookmark?.url}
                className="col-span-3"
                type="url"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
