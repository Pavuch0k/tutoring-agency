"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const testimonialImages = [
  "/photo_1_2025-09-08_14-10-01.jpg",
  "/photo_2_2025-09-08_14-10-01.jpg",
  "/photo_3_2025-09-08_14-10-01.jpg",
  "/photo_4_2025-09-08_14-10-01.jpg",
  "/photo_5_2025-09-08_14-10-01.jpg",
  "/photo_6_2025-09-08_14-10-01.jpg",
]

export default function AnimatedTestimonials() {
  const [currentSet, setCurrentSet] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const getCurrentImages = () => {
    const startIndex = currentSet * 3
    return [
      testimonialImages[startIndex % testimonialImages.length],
      testimonialImages[(startIndex + 1) % testimonialImages.length],
      testimonialImages[(startIndex + 2) % testimonialImages.length],
    ]
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Анимация улетания вправо
      setIsAnimating(true)
      setIsVisible(false)
      
      // Через 500ms меняем изображения и запускаем анимацию прилета слева
      setTimeout(() => {
        setCurrentSet((prev) => (prev + 1) % 2)
        setIsAnimating(false)
        // Небольшая задержка для сброса анимации
        setTimeout(() => {
          setIsVisible(true)
        }, 50)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentImages = getCurrentImages()

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop layout - diagonal cards */}
        <div className="hidden lg:flex justify-center items-center min-h-[600px] overflow-hidden max-w-full">
          <div className="relative w-[900px] h-[600px]">
            {currentImages.map((image, index) => {
              // Позиционирование: диагональное расположение с увеличенным разбросом
              const positions = [
                { top: '0px', left: '90px' },           // Верхний отзыв - 80px левее
                { top: '210px', left: '170px' },        // Средний отзыв - по центру
                { top: '420px', left: '250px' }         // Нижний отзыв - 80px правее
              ]
              
              return (
                <div
                  key={`${currentSet}-${index}`}
                  className={`
                    absolute transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                    ${!isAnimating && isVisible 
                      ? 'translate-x-0' 
                      : isAnimating 
                        ? 'translate-x-[200%]' 
                        : '-translate-x-[200%]'
                    }
                  `}
                  style={{
                    transitionDelay: isVisible && !isAnimating ? `${index * 150}ms` : '0ms',
                    top: positions[index].top,
                    left: positions[index].left,
                    zIndex: 3 - index,
                  }}
              >
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(180, 83, 9, 0.3) 0%, 
                      rgba(217, 119, 6, 0.2) 25%, 
                      rgba(245, 158, 11, 0.1) 50%, 
                      rgba(217, 119, 6, 0.2) 75%, 
                      rgba(180, 83, 9, 0.3) 100%)`,
                    padding: '3px',
                  }}
                >
                  <div className="relative bg-white rounded-xl overflow-hidden">
                    <Image
                      src={image}
                      alt={`Отзыв ${index + 1}`}
                      width={500}
                      height={375}
                      className="w-auto h-auto max-w-[500px] max-h-[375px] object-contain"
                      priority
                    />
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, 
                          transparent 40%, 
                          rgba(245, 158, 11, 0.05) 50%, 
                          transparent 60%)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Mobile layout - vertical cards */}
        <div className="lg:hidden">
          <div className="space-y-6">
            {currentImages.map((image, index) => (
              <div
                key={`mobile-${currentSet}-${index}`}
                className={`
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  ${!isAnimating && isVisible 
                    ? 'translate-x-0' 
                    : isAnimating 
                      ? 'translate-x-[200%]' 
                      : '-translate-x-[200%]'
                  }
                `}
                style={{
                  transitionDelay: isVisible && !isAnimating ? `${index * 150}ms` : '0ms',
                }}
              >
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 mx-auto w-full"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(180, 83, 9, 0.3) 0%, 
                      rgba(217, 119, 6, 0.2) 25%, 
                      rgba(245, 158, 11, 0.1) 50%, 
                      rgba(217, 119, 6, 0.2) 75%, 
                      rgba(180, 83, 9, 0.3) 100%)`,
                    padding: '3px',
                  }}
                >
                  <div className="relative bg-white rounded-xl overflow-hidden">
                    <Image
                      src={image}
                      alt={`Отзыв ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain"
                      style={{ width: '100%', height: 'auto' }}
                      priority
                    />
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, 
                          transparent 40%, 
                          rgba(245, 158, 11, 0.05) 50%, 
                          transparent 60%)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}