"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"
import { Mail, Calculator, BookOpen, Globe, Atom, Beaker, Leaf, Clock, Users, Map, Phone, MessageCircle, Star, GraduationCap } from "lucide-react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import AnimatedTestimonials from "@/components/animated-testimonials"
import BookingForm from "@/components/booking-form"
import AnimatedStats from "@/components/animated-stats"
import { AnimatedSection } from "@/components/animated-section"
import { StaggeredContainer } from "@/components/staggered-container"

export default function TutoringAgency() {
  const [isVisible, setIsVisible] = useState({})
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    phone: "",
    subject: "",
    grade: "",
    comment: "",
    format: "",
    agreed: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Анимация счетчиков
  const [counters, setCounters] = useState({
    families: 0,
    improvement: 0,
    experience: 0,
  })

  const copyPhoneToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("+7 917 321 1569")
      // Можно добавить уведомление об успешном копировании
    } catch (err) {
      console.error("Не удалось скопировать номер:", err)
    }
  }

  const openTelegram = () => {
    window.open("https://t.me/poliakkk", "_blank")
  }

  useEffect(() => {
    setIsMounted(true)
    // Анимация навигации при загрузке
    setTimeout(() => setNavVisible(true), 100)

    const animateCounters = () => {
      const duration = 1000 // было 2000
      const steps = 60
      const increment = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setCounters({
          families: Math.floor(100 * progress),
          improvement: Math.floor(20 * progress),
          experience: Math.floor(3 * progress),
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounters({ families: 100, improvement: 20, experience: 3 })
        }
      }, increment)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          observer.disconnect()
        }
      })
    })

    const heroSection = document.querySelector("#hero-stats")
    if (heroSection) observer.observe(heroSection)

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Отправка данных в Telegram через API
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentName: formData.parentName,
          childName: formData.childName,
          phone: formData.phone,
          subject: formData.subject,
          grade: formData.grade,
          comment: formData.comment,
          format: formData.format || 'not_specified',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setShowSuccess(true)
        // Сброс формы
        setFormData({
          parentName: "",
          childName: "",
          phone: "",
          subject: "",
          grade: "",
          comment: "",
          format: "",
          agreed: false,
        })
      } else {
        throw new Error(result.error || "Ошибка при отправке заявки")
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error)
      alert("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToForm = () => {
    const formElement = document.querySelector("#contact")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTutors = () => {
    const tutorsElement = document.querySelector("#tutors")
    if (tutorsElement) {
      tutorsElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 bg-amber-900/95 backdrop-blur-sm border-b border-amber-800 z-50 transition-all duration-700 ease-out ${
          navVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 max-w-screen-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`transition-all duration-500 delay-200 ${navVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"}`}
              >
                <Image src="/logo.png" alt="Твой Учитель" width={96} height={96} className="h-12 w-12" style={{objectFit: 'contain'}} />
              </div>
              <span
                className={`text-xl font-bold text-white transition-all duration-500 delay-300 ${
                  navVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                }`}
              >
                Твой Учитель
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="#services" 
                className={`bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-all duration-500 delay-400 ${
                  navVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                }`}
              >
                Услуги
              </a>
              <a 
                href="#tutors" 
                className={`bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-all duration-500 delay-500 ${
                  navVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                }`}
              >
                Репетиторы
              </a>
              <a 
                href="#results" 
                className={`bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-all duration-500 delay-600 ${
                  navVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                }`}
              >
                Результаты
              </a>
              <a 
                href="#contact" 
                className={`bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-all duration-500 delay-700 ${
                  navVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                }`}
              >
                Контакты
              </a>
            </div>
            <div
              className={`flex items-center space-x-3 transition-all duration-500 delay-500 ${
                navVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
            >
              <Button
                size="sm"
                className="bg-amber-700 hover:bg-amber-800 hover:scale-105 transition-all text-white"
                onClick={copyPhoneToClipboard}
              >
                <Phone className="h-4 w-4 mr-2" />
                +7 917 321 1569
              </Button>
              <Button
                size="sm"
                className="bg-amber-700 hover:bg-amber-800 hover:scale-105 transition-all text-white"
                onClick={openTelegram}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Telegram
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="pt-34 pb-16 bg-gradient-to-br from-amber-50 via-white to-orange-50 relative lg:pt-[136px] pt-[110px]"
      >
        {/* Анимированная обезьяна в Hero секции */}
        <AnimatedSection animation="fadeLeft" delay={400} duration={1400}>
          <div className="absolute top-1/2 transform -translate-y-1/2 z-10 hidden lg:block" style={{ right: "70px", marginTop: "300px" }}>
            <img
              src="https://assets.dochipo.com/editor/animations/monkey/3a37d09c-8eb7-41d0-a8af-a2f98c5e099b.gif"
              alt="Анимированная обезьяна"
              className="object-contain"
              style={{ 
                width: "280px", 
                height: "280px", 
                maxWidth: "280px", 
                maxHeight: "280px",
                objectFit: "contain",
                flexShrink: 0
              }}
            />
          </div>
        </AnimatedSection>

        <div className="container mx-auto px-4">
          {/* Desktop layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <AnimatedSection animation="fadeLeft" delay={200} duration={1200}>
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Ваш ребёнок заслуживает <span className="text-amber-700">лучшего образования</span>
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed text-left">
                    Подберём идеального репетитора за 24 часа. Индивидуальный подход к каждому ученику
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400} className="-mt-4">
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-amber-700 hover:bg-amber-800 text-lg px-8 py-4 hover:scale-105 transition-all duration-300"
                    onClick={scrollToTutors}
                  >
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Подобрать репетитора
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-4 bg-transparent hover:scale-105 transition-all duration-300"
                    onClick={scrollToForm}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Бесплатная консультация
                  </Button>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={600}>
                <div id="hero-stats" className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-700">
                      {isMounted ? `${counters.families}+` : "100+"}
                    </div>
                    <div className="text-sm text-gray-600">довольных семей</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-700">
                      {isMounted ? `${counters.improvement}+` : "20+"}
                    </div>
                    <div className="text-sm text-gray-600">репетиторов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-700">
                      {isMounted ? `${counters.experience} года` : "3 года"}
                    </div>
                    <div className="text-sm text-gray-600">опыта работы</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection animation="fadeRight" delay={300} duration={1200}>
              <div className="relative">
                <Image
                  src="/hero-image.png"
                  alt="Репетитор проводит онлайн-урок с учеником в образовательном центре Твой Учитель"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                  style={{
                    border: '2px solid #92400e',
                    boxShadow: '0 0 0 1px rgba(180, 83, 9, 0.5), 0 0 0 2px rgba(217, 119, 6, 0.3), 0 0 20px rgba(245, 158, 11, 0.2)'
                  }}
                />
                <AnimatedSection animation="bounce" delay={800}>
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="flex -space-x-2">
                        <Image
                          src="/препод.jpg"
                          alt="Репетитор 1"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full border-2 border-white hover:scale-110 transition-transform object-cover"
                        />
                        <Image
                          src="/препод2.jpg"
                          alt="Репетитор 2"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full border-2 border-white hover:scale-110 transition-transform object-cover"
                        />
                        <Image
                          src="/препод3.jpg"
                          alt="Репетитор 3"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full border-2 border-white hover:scale-110 transition-transform object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">20+ репетиторов</div>
                        <div className="text-xs text-gray-500">готовы помочь</div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>

          {/* Mobile layout */}
          <div className="lg:hidden">
            <AnimatedSection animation="fadeLeft" delay={200} duration={1200}>
              <div className="space-y-4 mb-4">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-3xl font-bold text-gray-900 leading-tight">Ваш ребёнок заслуживает</span>
                  <span className="text-3xl font-bold text-amber-700 leading-tight">лучшего образования</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeRight" delay={300} duration={1200} className="mb-8">
              <div className="relative">
                <Image
                  src="/hero-image.png"
                  alt="Репетитор проводит онлайн-урок с учеником в образовательном центре Твой Учитель"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 w-full h-auto"
                  style={{
                    border: '2px solid #92400e',
                    boxShadow: '0 0 0 1px rgba(180, 83, 9, 0.5), 0 0 0 2px rgba(217, 119, 6, 0.3), 0 0 20px rgba(245, 158, 11, 0.2)'
                  }}
                />
                <AnimatedSection animation="bounce" delay={800}>
                  <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        <Image
                          src="/препод.jpg"
                          alt="Репетитор 1"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full border-2 border-white hover:scale-110 transition-transform object-cover"
                        />
                        <Image
                          src="/препод2.jpg"
                          alt="Репетитор 2"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full border-2 border-white hover:scale-110 transition-transform object-cover"
                        />
                        <Image
                          src="/препод3.jpg"
                          alt="Репетитор 3"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full border-2 border-white hover:scale-110 transition-transform object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">20+ репетиторов</div>
                        <div className="text-xs text-gray-500">готовы помочь</div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeLeft" delay={350} duration={1200} className="mb-8">
              <p className="text-base text-gray-600 leading-relaxed text-center px-2 text-left">
                Подберём идеального репетитора за 24 часа. Индивидуальный подход к каждому ученику
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400} className="mb-2 lg:mb-0 -mt-2 lg:-mt-0">
              <div className="flex flex-col gap-4">
                <Button
                  size="lg"
                  className="bg-amber-700 hover:bg-amber-800 text-lg px-8 py-4 hover:scale-105 transition-all duration-300"
                  onClick={scrollToTutors}
                >
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Подобрать репетитора
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 bg-transparent hover:scale-105 transition-all duration-300"
                  onClick={scrollToForm}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Бесплатная консультация
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div id="hero-stats" className="flex justify-around pt-4 lg:pt-4 pt-16">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-700">
                    {isMounted ? `${counters.families}+` : "100+"}
                  </div>
                  <div className="text-xs text-gray-600">довольных семей</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-700">
                    {isMounted ? `${counters.improvement}+` : "20+"}
                  </div>
                  <div className="text-xs text-gray-600">репетиторов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-700">
                    {isMounted ? `${counters.experience} года` : "3 года"}
                  </div>
                  <div className="text-xs text-gray-600">опыта работы</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>


      {/* How We Work */}
      <section className="py-16 bg-gray-50 relative lg:mt-[50px] mt-0">
        {/* Вторая анимированная обезьяна в блоке Как мы работаем */}
        <AnimatedSection animation="fadeRight" delay={400} duration={1400}>
          <div className="absolute top-1/2 transform -translate-y-1/2 z-10 hidden lg:block" style={{ left: "70px", marginTop: "300px" }}>
            <img
              src="https://assets.dochipo.com/editor/animations/monkey/428e707a-a8b4-4526-a1b5-861ba9abcdd2.gif"
              alt="Анимированная обезьяна"
              className="w-70 h-70"
              style={{ width: "280px", height: "280px" }}
            />
          </div>
        </AnimatedSection>
        
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Как мы работаем</h2>
              <p className="text-xl text-gray-600">От заявки до результата — всего 4 простых шага</p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <StaggeredContainer className="space-y-8" staggerDelay={200}>
              {[
                {
                  step: "01",
                  title: "Подбор идеального репетитора",
                  description: "Мы не просто ищем преподавателя по предмету. Мы найдём того, кто подойдёт именно Вам!",
                  time: "~ 5 минут",
                },
                {
                  step: "02",
                  title: "Пробный урок и персональный план",
                  description:
                    "На первом же уроке вы получите чёткий план достижения ваших целей и почувствуете, как легко и интересно может проходить обучение.",
                  time: "30 минут, бесплатно",
                },
                {
                  step: "03",
                  title: "Регулярные занятия в комфортном ритме",
                  description:
                    "Занимайтесь в удобное время и в подходящем темпе. Ваш репетитор всегда на связи и готов ответить на все вопросы.",
                  time: "По вашему расписанию",
                },
                {
                  step: "04",
                  title: "Прозрачная отчётность и видимый прогресс",
                  description:
                    "Вы всегда будете в курсе успехов: что уже освоено, каких результатов достигли и над чем работаем сейчас.",
                  time: "После каждого занятия",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-amber-700 text-white rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <Badge variant="outline" className="hover:scale-105 transition-transform">
                          {item.time}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggeredContainer>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Подбор идеального репетитора",
                  description: "Мы не просто ищем преподавателя по предмету. Мы найдём того, кто подойдёт именно Вам!",
                  time: "~ 5 минут",
                },
                {
                  step: "02",
                  title: "Пробный урок и персональный план",
                  description:
                    "На первом же уроке вы получите чёткий план достижения ваших целей и почувствуете, как легко и интересно может проходить обучение.",
                  time: "30 минут, бесплатно",
                },
                {
                  step: "03",
                  title: "Регулярные занятия в комфортном ритме",
                  description:
                    "Занимайтесь в удобное время и в подходящем темпе. Ваш репетитор всегда на связи и готов ответить на все вопросы.",
                  time: "По вашему расписанию",
                },
                {
                  step: "04",
                  title: "Прозрачная отчётность и видимый прогресс",
                  description:
                    "Вы всегда будете в курсе успехов: что уже освоено, каких результатов достигли и над чем работаем сейчас.",
                  time: "После каждого занятия",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {/* Чередуем расположение номера: четные слева, нечетные справа */}
                  {index % 2 === 0 ? (
                    <>
                      {/* Номер слева */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {item.step}
                        </div>
                      </div>
                      
                      {/* Блок с контентом */}
                      <div className="flex-1">
                        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <Badge variant="outline" className="mb-2 text-xs hover:scale-105 transition-transform">
                              {item.time}
                            </Badge>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Блок с контентом */}
                      <div className="flex-1">
                        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <Badge variant="outline" className="mb-2 text-xs hover:scale-105 transition-transform">
                              {item.time}
                            </Badge>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Номер справа */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {item.step}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <AnimatedStats />

      {/* Tutors Section */}
      <section id="tutors" className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши репетиторы</h2>
              <p className="text-xl text-gray-600">Команда экспертов с многолетним опытом</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scale" delay={200}>
            <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto px-4">
              <div className="group">
                <Image
                  src="/препод.jpg"
                  alt="Репетитор 1"
                  width={1600}
                  height={1600}
                  className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full h-auto"
                />
              </div>
              <div className="group">
                <Image
                  src="/препод2.jpg"
                  alt="Репетитор 2"
                  width={1600}
                  height={1600}
                  className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full h-auto"
                />
              </div>
              <div className="group">
                <Image
                  src="/препод3.jpg"
                  alt="Репетитор 3"
                  width={1600}
                  height={1600}
                  className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full h-auto"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-16 bg-gray-50 relative">
        {/* Третья анимированная обезьяна в блоке Что говорят родители */}
        <AnimatedSection animation="fadeLeft" delay={400} duration={1400}>
          <div className="absolute top-1/2 transform -translate-y-1/2 z-10 hidden lg:block" style={{ right: "70px", marginTop: "280px" }}>
            <img
              src="https://assets.dochipo.com/editor/animations/monkey/9d3dbb3d-2afd-481f-9088-bac6bf3d6c4d.gif"
              alt="Анимированная обезьяна"
              className="w-70 h-70"
              style={{ width: "280px", height: "280px" }}
            />
          </div>
        </AnimatedSection>
        
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Что говорят родители</h2>
              <p className="text-xl text-gray-600">Реальные отзывы о нашей работе</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scale" delay={200}>
            <AnimatedTestimonials />
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Предметы и услуги</h2>
              <p className="text-xl text-gray-600">Полный спектр образовательных услуг</p>
            </div>
          </AnimatedSection>

          <StaggeredContainer
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            staggerDelay={100}
            animation="bounce"
          >
            {[
              {
                name: "Математика",
                icon: <Calculator className="h-12 w-12 text-amber-800" />,
                description: "Алгебра, геометрия, подготовка к ЕГЭ/ОГЭ",
              },
              {
                name: "Русский язык",
                icon: <BookOpen className="h-12 w-12 text-amber-800" />,
                description: "Грамматика, литература, сочинения",
              },
              {
                name: "Английский язык",
                icon: <Globe className="h-12 w-12 text-amber-800" />,
                description: "Разговорная практика, грамматика, ЕГЭ",
              },
              {
                name: "Физика",
                icon: <Atom className="h-12 w-12 text-amber-800" />,
                description: "Механика, электричество, подготовка к экзаменам",
              },
              {
                name: "Химия",
                icon: <Beaker className="h-12 w-12 text-amber-800" />,
                description: "Органическая, неорганическая химия",
              },
              {
                name: "Биология",
                icon: <Leaf className="h-12 w-12 text-amber-800" />,
                description: "Ботаника, зоология, анатомия",
              },
              {
                name: "История",
                icon: <Clock className="h-12 w-12 text-amber-800" />,
                description: "Отечественная и всемирная история",
              },
              {
                name: "Обществознание",
                icon: <Users className="h-12 w-12 text-amber-800" />,
                description: "Право, экономика, политология",
              },
              {
                name: "География",
                icon: <Map className="h-12 w-12 text-amber-800" />,
                description: "Физическая и экономическая география",
                className: "hidden md:block",
              },
            ].map((subject, index) => (
              <Card
                key={index}
                className={`border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 group ${subject.className || ''}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {subject.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{subject.name}</h3>
                  <p className="text-gray-600 text-sm">{subject.description}</p>
                </CardContent>
              </Card>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 relative">
        {/* Четвертая анимированная обезьяна в блоке FAQ */}
        <AnimatedSection animation="fadeRight" delay={400} duration={1400}>
          <div className="absolute top-1/2 transform -translate-y-1/2 z-10 hidden lg:block" style={{ left: "70px", marginTop: "200px" }}>
            <img
              src="https://assets.dochipo.com/editor/animations/monkey/11b900ca-ac21-471f-a54a-0e331c302a93.gif"
              alt="Анимированная обезьяна"
              className="w-70 h-70"
              style={{ width: "280px", height: "280px" }}
            />
          </div>
        </AnimatedSection>
        
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
              <p className="text-xl text-gray-600">Ответы на самые популярные вопросы родителей</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-1"
                  className="border border-gray-200 rounded-lg px-6 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:text-amber-700 transition-colors">
                    Как быстро можно найти репетитора?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Мы подбираем репетитора в течение 24 часов после вашей заявки. В 90% случаев находим подходящего
                    специалиста в тот же день.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="border border-gray-200 rounded-lg px-6 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:text-amber-700 transition-colors">
                    Что если репетитор не подойдёт?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Мы бесплатно подберём другого репетитора. У вас есть право на замену преподавателя в любое время без
                    дополнительных затрат.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="border border-gray-200 rounded-lg px-6 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:text-amber-700 transition-colors">
                    Какие форматы занятий доступны?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Мы предлагаем только удалённые занятия. Онлайн-уроки проходят с использованием интерактивной доски и
                    видеосвязи.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="border border-gray-200 rounded-lg px-6 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:text-amber-700 transition-colors">
                    Как происходит оплата?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Оплата производится после каждого урока или пакетами. Принимаем наличные, банковские карты и
                    электронные платежи.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="border border-gray-200 rounded-lg px-6 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:text-amber-700 transition-colors">
                    Предоставляете ли вы отчёты о прогрессе?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Да, мы предоставляем регулярные отчёты о прогрессе ученика. Репетиторы ведут подробные записи о
                    достижениях и областях для улучшения.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Готовы начать обучение?</h2>
              <p className="text-xl text-gray-600">Оставьте заявку и получите бесплатную консультацию уже сегодня</p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <AnimatedSection animation="fadeRight" delay={200}>
              <BookingForm />
            </AnimatedSection>

            <AnimatedSection animation="fadeLeft" delay={400}>
              <div className="space-y-8">
                <div className="pt-12">
                  <h3 className="text-2xl font-semibold mb-6">Свяжитесь с нами</h3>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 group hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <Phone className="h-6 w-6 text-amber-700" />
                      </div>
                      <div className="cursor-pointer" onClick={copyPhoneToClipboard}>
                        <div className="font-semibold">Телефон</div>
                        <div className="text-gray-600">+7 917 321 1569</div>
                        <div className="text-sm text-gray-500">Ежедневно с 9:00 до 21:00</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 group hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <MessageCircle className="h-6 w-6 text-amber-700" />
                      </div>
                      <div className="cursor-pointer" onClick={openTelegram}>
                        <div className="font-semibold">Telegram</div>
                        <div className="text-gray-600">@poliakkk</div>
                        <div className="text-sm text-gray-500">Быстрые ответы 24/7</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 group hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <Mail className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-gray-600">info@eduexpert.ru</div>
                        <div className="text-sm text-gray-500">Ответим в течение часа</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <AnimatedSection>
        <footer className="bg-amber-950 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4 group">
                  <Image
                    src="/logo.png"
                    alt="Твой Учитель"
                    width={48}
                    height={48}
                    className="h-12 w-12 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xl font-bold">Твой Учитель</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Образовательный центр в Саратове. Помогаем детям достигать успехов в учёбе.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Услуги</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">Подготовка к ЕГЭ</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Подготовка к ОГЭ</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Школьная программа</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Онлайн обучение</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Предметы</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">Математика</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Русский язык</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Английский язык</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Физика</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Контакты</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">+7 917 321 1569</li>
                  <li className="hover:text-white transition-colors cursor-pointer">info@eduexpert.ru</li>
                  <li className="hover:text-white transition-colors cursor-pointer">@poliakkk</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2025 Твой Учитель. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  )
}
