
import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { UserJourneyCarousel } from '@/components/user-journey-carousel'
import { GoogleSignInButton } from '@/components/google-sign-in-button'
import { Button } from "@/components/ui/button"

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-primary-foreground font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold tracking-tight">Abstrabit</span>
            </div>
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Link href="/how-it-works">How it Works</Link>
            </Button>
            {user && (
              <Button asChild variant="ghost">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full gap-16 lg:gap-24 relative">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 opacity-50" />
        
        {/* Left: Content & CTA */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-10 w-full max-w-2xl">
            <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    New Feature: Realtime Sync
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                    Simplify Your <br className="hidden lg:block"/>
                    Workflow <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Today.</span>
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground/90 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    Manage your links, collaborate with your team, and access your resources from anywhere seamlessly.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
                {user ? (
                    <Button asChild size="lg" className="w-full sm:w-auto text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                ) : (
                    <GoogleSignInButton />
                )}
            </div>
            
            <p className="text-sm text-muted-foreground">
                No credit card required. Start free forever.
            </p>
        </div>

        {/* Right: Infinite Carousel */}
        <div className="flex-1 w-full max-w-md lg:max-w-full flex justify-center items-center relative">
            {/* Carousel Container Decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-blue-500/10 rounded-3xl transform rotate-3 scale-105 blur-xl -z-10" />
            <div className="w-full bg-card rounded-2xl border shadow-2xl p-8 backdrop-blur-sm bg-background/50">
                <UserJourneyCarousel />
            </div>
        </div>
        
      </main>

      <footer className="border-t py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Abstrabit. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
        </div>
      </footer>
    </div>
  )
}
