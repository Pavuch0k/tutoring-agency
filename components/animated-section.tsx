"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"
import type React from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "bounce"
  delay?: number
  duration?: number
}

export function AnimatedSection({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 600,
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const animationClasses = {
    fadeUp: isIntersecting ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
    fadeDown: isIntersecting ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0",
    fadeLeft: isIntersecting ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
    fadeRight: isIntersecting ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
    scale: isIntersecting ? "scale-100 opacity-100" : "scale-95 opacity-0",
    bounce: isIntersecting ? "scale-100 opacity-100" : "scale-90 opacity-0",
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-out", animationClasses[animation], className)}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
