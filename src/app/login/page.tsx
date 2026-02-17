
"use client"

import { createClient } from "@/lib/supabase-browser"

export default function LoginPage() {
  const supabase = createClient()

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={login}
        className="px-6 py-3 bg-black text-white rounded cursor-pointer hover:bg-gray-800 transition-colors"
      >
        Sign in with Google
      </button>
    </div>
  )
}
