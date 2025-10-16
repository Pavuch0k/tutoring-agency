"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Елена Петрова",
    childName: "Максим, 11 класс",
    subject: "Математика",
    rating: 5,
    text: "Максим занимался с репетитором 8 месяцев перед ЕГЭ. Результат превзошёл все ожидания - 92 балла! Репетитор не только подтянул знания, но и помог справиться со стрессом перед экзаменом.",
    beforeScore: "Оценка 3",
    afterScore: "ЕГЭ 92 балла",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    id: 2,
    name: "Андрей Смирнов",
    childName: "София, 9 класс",
    subject: "Английский язык",
    rating: 5,
    text: "София была очень застенчивой и боялась говорить на английском. За год занятий она не только улучшила оценки, но и обрела уверенность. Теперь мечтает учиться за границей!",
    beforeScore: "Уровень A1",
    afterScore: "Уровень B2",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    id: 3,
    name: "Мария Козлова",
    childName: "Артём, 10 класс",
    subject: "Физика",
    rating: 5,
    text: "Артём всегда считал физику самым сложным предметом. Благодаря индивидуальному подходу репетитора, он не только разобрался в материале, но и полюбил предмет. Планирует поступать на инженерную специальность.",
    beforeScore: "Оценка 2-3",
    afterScore: "Оценка 4-5",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    id: 4,
    name: "Ольга Васильева",
    childName: "Анна, 8 класс",
    subject: "Русский язык",
    rating: 5,
    text: "У Анны были большие проблемы с грамотностью и сочинениями. Репетитор нашёл особый подход, и теперь дочь пишет без ошибок и даже участвует в олимпиадах по литературе!",
    beforeScore: "Много ошибок",
    afterScore: "Грамотное письмо",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="border-0 shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            {/* Левая часть - информация о родителе */}
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold">{currentTestimonial.name}</h3>
                  <p className="text-indigo-600 font-medium">{currentTestimonial.childName}</p>
                  <p className="text-gray-600 text-sm">{currentTestimonial.subject}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < currentTestimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{currentTestimonial.rating}.0</span>
              </div>

              <blockquote className="text-gray-700 italic mb-6">"{currentTestimonial.text}"</blockquote>
            </div>

            {/* Правая часть - результаты */}
            <div className="p-8 bg-white flex flex-col justify-center">
              <h4 className="text-lg font-semibold mb-6 text-center">Результат обучения</h4>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Было</div>
                  <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg font-medium">
                    {currentTestimonial.beforeScore}
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-px h-8 bg-gray-300"></div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Стало</div>
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium">
                    {currentTestimonial.afterScore}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  {isMounted ? `${Math.floor(Math.random() * 6) + 6} месяцев` : "8 месяцев"}
                </div>
                <div className="text-sm text-gray-600">длительность обучения</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Навигация */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={prevTestimonial}
          className="rounded-full w-10 h-10 p-0 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextTestimonial}
          className="rounded-full w-10 h-10 p-0 bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Автопроигрывание индикатор */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isAutoPlaying ? "⏸️ Остановить" : "▶️ Автопроигрывание"}
        </button>
      </div>
    </div>
  )
}
