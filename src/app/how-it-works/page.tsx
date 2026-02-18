
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2, Code2, Database, ShieldCheck, Zap } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                A
              </div>
              Abstrabit
            </Link>
          </div>
          <nav>
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">Internal Documentation</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight lg:text-6xl">
            How Abstrabit Works
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A deep dive into our application's user journey and the modern technical architecture enabling it.
          </p>
        </section>

        {/* Section 1: App Walkthrough */}
        <section id="walkthrough" className="space-y-12">
          <div className="border-l-4 border-primary pl-6 py-2">
             <h2 className="text-3xl font-bold tracking-tight">Part 1: The User Journey</h2>
             <p className="text-muted-foreground mt-2 text-lg">Experience the flow from landing to dashboard.</p>
          </div>

          <div className="grid gap-16 md:gap-24">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">1</div>
                <h3 className="text-2xl font-bold">Landing & Authentication</h3>
                <p className="text-muted-foreground text-lg">
                  Users land on a clean, modern interface showcasing the value proposition. We've simplified the entry point by integrating Google Sign-In directly, reducing friction and increasing conversion rates.
                </p>
                <ul className="space-y-2 pt-2">
                  <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Auto-playing feature carousel
                  </li>
                   <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> One-click Google Authentication
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden aspect-video relative group">
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground text-sm">
                   {/* Placeholder for Image 1 */}
                   <Image 
                      src="/image1.png" 
                      alt="Landing Page" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="order-2 md:order-1 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden aspect-video relative group">
                 <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground text-sm">
                   <Image 
                      src="/image2.png" 
                      alt="Dashboard View" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                </div>
              </div>
              <div className="space-y-4 order-1 md:order-2">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">2</div>
                <h3 className="text-2xl font-bold">Personalized Dashboard</h3>
                <p className="text-muted-foreground text-lg">
                  Upon login, users are greeted with a personalized dashboard. This hub aggregates all their key metrics, resources, and collaborations in one intuitive view.
                </p>
                 <ul className="space-y-2 pt-2">
                  <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Real-time data fetching
                  </li>
                   <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> User-specific content
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">3</div>
                <h3 className="text-2xl font-bold">Core Functionality</h3>
                <p className="text-muted-foreground text-lg">
                  Deep dive into the application's main features. Whether it's managing tasks, exploring content, or tracking progress, every interaction is designed for speed and clarity.
                </p>
              </div>
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden aspect-video relative group">
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground text-sm">
                   <Image 
                      src="/image3.png" 
                      alt="Core Features" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                </div>
              </div>
            </div>

             {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="order-2 md:order-1 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden aspect-video relative group">
                 <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground text-sm">
                   <Image 
                      src="/image4.png" 
                      alt="Settings & Profile" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                </div>
              </div>
              <div className="space-y-4 order-1 md:order-2">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">4</div>
                <h3 className="text-2xl font-bold">Profile & Settings</h3>
                <p className="text-muted-foreground text-lg">
                  Users retain full control over their account and preferences. Our settings panel allows for easy customization and account management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Implementation Details */}
        <section id="implementation" className="space-y-12">
           <div className="border-l-4 border-blue-600 pl-6 py-2">
             <h2 className="text-3xl font-bold tracking-tight">Part 2: Technical Implementation</h2>
             <p className="text-muted-foreground mt-2 text-lg">Under the hood of Abstrabit.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader>
                    <Code2 className="h-8 w-8 text-blue-500 mb-2" />
                    <CardTitle>Next.js 14</CardTitle>
                    <CardDescription>App Router & Server Actions</CardDescription>
                </CardHeader>
                <CardContent>
                    We leverage the latest Next.js features for optimal performance, including Server Components for faster initial loads and SEO, and Server Actions for simplified data mutations.
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <Database className="h-8 w-8 text-green-500 mb-2" />
                    <CardTitle>Supabase</CardTitle>
                    <CardDescription>Database & Auth</CardDescription>
                </CardHeader>
                <CardContent>
                    A robust backend-as-a-service providing a PostgreSQL database with Row Level Security (RLS) and seamless Google Authentication integration.
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                    <CardTitle>Tailwind CSS</CardTitle>
                    <CardDescription>Styling & Design System</CardDescription>
                </CardHeader>
                <CardContent>
                    Utility-first CSS framework combined with shadcn/ui components ensures a consistent, responsive, and accessible design system across the entire application.
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <ShieldCheck className="h-8 w-8 text-purple-500 mb-2" />
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Middleware & RLS</CardDescription>
                </CardHeader>
                <CardContent>
                    Protected routes via Next.js middleware and database-level security policies ensure that user data remains private and secure at all times.
                </CardContent>
            </Card>
          </div>

          <div className="bg-muted/30 p-8 rounded-2xl border">
            <h3 className="text-2xl font-bold mb-4">Key Implementation Highlights</h3>
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="min-w-[4px] bg-primary rounded-full" />
                    <div>
                        <h4 className="font-semibold">Unified Authentication Flow</h4>
                        <p className="text-muted-foreground">Replaced separate login pages with a streamlined modal approach directly on the landing page, significantly reducing drop-off rates.</p>
                    </div>
                </div>
                 <div className="flex gap-4">
                    <div className="min-w-[4px] bg-primary rounded-full" />
                    <div>
                        <h4 className="font-semibold">Optimized Asset Loading</h4>
                        <p className="text-muted-foreground">Images and fonts are optimized using Next.js built-in components to ensure Core Web Vitals are met.</p>
                    </div>
                </div>
                 <div className="flex gap-4">
                    <div className="min-w-[4px] bg-primary rounded-full" />
                    <div>
                        <h4 className="font-semibold">Type Safety</h4>
                        <p className="text-muted-foreground">End-to-end TypeScript integration from the database schema (generated from Supabase) to the UI components.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

         {/* Footer for this page */}
         <footer className="border-t pt-8 text-center text-muted-foreground pb-20">
            <p>Documentation Generated for Internal Review &middot; {new Date().getFullYear()}</p>
         </footer>

      </main>
    </div>
  )
}
