"use client"

import React from "react"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface StaggeredContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  animation?: "fadeUp" | "fadeDown" | "scale" | "bounce"
}

export function StaggeredContainer({
  children,
  className,
  staggerDelay = 100,
  animation = "fadeUp",
}: StaggeredContainerProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const childrenArray = React.Children.toArray(children)

  const animationClasses = {
    fadeUp: (isVisible: boolean) => (isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"),
    fadeDown: (isVisible: boolean) => (isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"),
    scale: (isVisible: boolean) => (isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"),
    bounce: (isVisible: boolean) => (isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"),
  }

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={cn("transition-all duration-600 ease-out", animationClasses[animation](isIntersecting))}
          style={{
            transitionDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
