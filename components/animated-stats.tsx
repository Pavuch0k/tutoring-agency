"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, TrendingUp, GraduationCap } from "lucide-react"

interface StatItem {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  color: string
}

const stats: StatItem[] = [
  {
    icon: <Users className="h-10 w-10 text-amber-700" strokeWidth={2.5} />,
    value: 100,
    suffix: "+",
    label: "довольных семей",
    color: "text-amber-700",
  },
  {
    icon: <Calendar className="h-10 w-10 text-amber-700" strokeWidth={2.5} />,
    value: 2000,
    suffix: "+",
    label: "проведённых занятий",
    color: "text-amber-700",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-amber-700" strokeWidth={2.5} />,
    value: 98,
    suffix: "%",
    label: "улучшения оценок",
    color: "text-amber-700",
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-amber-700" strokeWidth={2.5} />,
    value: 20,
    suffix: "+",
    label: "репетиторов",
    color: "text-amber-700",
  },
]

export default function AnimatedStats() {
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    stats.forEach((stat, index) => {
      let currentStep = 0
      const increment = stat.value / steps

      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const currentValue = stat.value * progress

        setAnimatedValues((prev) => {
          const newValues = [...prev]
          newValues[index] = currentValue
          return newValues
        })

        if (currentStep >= steps) {
          clearInterval(timer)
          setAnimatedValues((prev) => {
            const newValues = [...prev]
            newValues[index] = stat.value
            return newValues
          })
        }
      }, stepDuration)
    })
  }

  const formatValue = (value: number, index: number): string => {
    const stat = stats[index]
    if (stat.label.includes("рейтинг") || stat.label.includes("балл")) {
      return value.toFixed(0)
    }
    return Math.floor(value).toString()
  }

  return (
    <div ref={sectionRef} className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши достижения в цифрах</h2>
          <p className="text-xl text-gray-600">Результаты, которыми мы гордимся</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {isMounted ? `${formatValue(animatedValues[index], index)}${stat.suffix}` : `${stat.value}${stat.suffix}`}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
