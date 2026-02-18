
"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function UserJourneyCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  const steps = [
    {
      title: "Discover",
      description: "Find the best content tailored to your needs.",
      content: "Explore a vast library of curated resources.",
    },
    {
      title: "Organize", 
      description: "Keep your favorites in one place with Bookmarks.",
      content: "Effortlessly save and categorize links.",
    },
    {
      title: "Collaborate",
      description: "Share your collections with your team.",
      content: "Real-time updates ensure everyone is in sync.",
    },
    {
        title: "Achieve",
        description: "Turn your resources into results.",
        content: "Track your progress and hit your goals.",
      },
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs md:max-w-md mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {steps.map((step, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center aspect-square">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 text-lg">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Hidden controls for structure, or remove completely if auto-only desired */}
      <div className="hidden">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  )
}
