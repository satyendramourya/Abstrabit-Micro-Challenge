
"use client"

import { createClient } from "@/lib/supabase-browser"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function GoogleSignInButton() {
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
    <Button 
        onClick={login} 
        size="lg" 
        className="w-full sm:w-auto text-lg px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
    >
      Sign in with Google <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  )
}
