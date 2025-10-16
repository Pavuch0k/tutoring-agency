"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, CheckCircle, AlertCircle, Phone, MessageCircle } from "lucide-react"

interface FormData {
  parentName: string
  childName: string
  phone: string
  subject: string
  grade: string
  comment: string
  preferredTime: string
  agreed: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    childName: "",
    phone: "",
    subject: "",
    grade: "",
    comment: "",
    preferredTime: "",
    agreed: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const subjects = [
    "Математика",
    "Русский язык",
    "Английский язык",
    "Физика",
    "Химия",
    "Биология",
    "История",
    "Обществознание",
    "География",
    "Литература",
    "Другое",
  ]

  const grades = [
    "1 класс",
    "2 класс",
    "3 класс",
    "4 класс",
    "5 класс",
    "6 класс",
    "7 класс",
    "8 класс",
    "9 класс",
    "10 класс",
    "11 класс",
  ]

  const timeSlots = [
    "09:00 - 11:00",
    "11:00 - 13:00",
    "13:00 - 15:00",
    "15:00 - 17:00",
    "17:00 - 19:00",
    "19:00 - 21:00",
    "Другое",
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.parentName.trim()) {
      newErrors.parentName = "Введите ваше имя"
    }

    if (!formData.childName.trim()) {
      newErrors.childName = "Введите имя ребёнка"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона"
    } else if (!/^\+?[7-8][\d\s\-$$$$]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Введите корректный номер телефона"
    }

    if (!formData.subject) {
      newErrors.subject = "Выберите предмет"
    }

    if (!formData.grade) {
      newErrors.grade = "Выберите класс"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Очистка ошибки при изменении поля
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Удаляем все нецифровые символы кроме +
    value = value.replace(/[^\d+]/g, '')
    
    // Если значение не начинается с +7, добавляем
    if (!value.startsWith('+7') && !value.startsWith('7') && !value.startsWith('+')) {
      if (value.length > 0) {
        value = '+7' + value
      } else {
        value = '+7'
      }
    } else if (value.startsWith('7')) {
      value = '+' + value
    } else if (value === '+') {
      value = '+7'
    }
    
    // Ограничиваем длину номера
    if (value.length > 12) {
      value = value.slice(0, 12)
    }
    
    handleInputChange("phone", value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

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
          format: formData.preferredTime ? 'online' : 'not_specified',
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
          preferredTime: "",
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

  if (showSuccess) {
    return (
      <Card className="border-0 shadow-lg lg:shadow-lg lg:border-0">
        <CardContent className="p-4 lg:p-8 text-center">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
            <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-amber-700" />
          </div>
          <h3 className="text-xl lg:text-2xl font-semibold mb-3">Заявка отправлена!</h3>
          <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6">
            Спасибо за обращение! Наш менеджер свяжется с вами в течение 15 минут для уточнения деталей и подбора
            репетитора.
          </p>
          <Button 
            variant="ghost" 
            onClick={() => setShowSuccess(false)} 
            className="mt-2 lg:mt-4 text-sm lg:text-base text-amber-700 hover:text-amber-800 hover:bg-amber-50"
          >
            Отправить ещё одну заявку
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg lg:shadow-lg lg:border-0 w-full lg:max-w-full max-w-[calc(100vw-2rem)] overflow-hidden lg:mx-0 mx-1 lg:mt-0 mt-0">
      <CardHeader className="lg:px-6 lg:pt-6 px-4 pt-4 w-full">
        <CardTitle className="text-lg lg:text-2xl flex items-center">
          <Calendar className="h-4 w-4 lg:h-6 lg:w-6 mr-2 text-amber-700" />
          Записаться на консультацию
        </CardTitle>
        <CardDescription className="text-sm lg:text-base">Заполните форму, и мы подберём идеального репетитора для вашего ребёнка</CardDescription>
      </CardHeader>
      <CardContent className="lg:px-6 lg:pb-6 px-4 pb-4 w-full">
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 w-full">
            <div>
              <Label htmlFor="parentName" className="text-sm lg:text-base">Ваше имя *</Label>
              <Input
                id="parentName"
                value={formData.parentName}
                onChange={(e) => handleInputChange("parentName", e.target.value)}
                placeholder="Введите ваше имя"
                className={`h-10 lg:h-auto w-full ${errors.parentName ? "border-red-500" : ""}`}
              />
              {errors.parentName && (
                <p className="text-red-500 text-xs lg:text-sm mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  {errors.parentName}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="childName" className="text-sm lg:text-base">Имя ребёнка *</Label>
              <Input
                id="childName"
                value={formData.childName}
                onChange={(e) => handleInputChange("childName", e.target.value)}
                placeholder="Введите имя ребёнка"
                className={`h-10 lg:h-auto ${errors.childName ? "border-red-500" : ""}`}
              />
              {errors.childName && (
                <p className="text-red-500 text-xs lg:text-sm mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  {errors.childName}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm lg:text-base">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="+7 (___) ___-__-__"
              className={`h-10 lg:h-auto ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Предмет *</Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger className={errors.subject ? "border-red-500" : ""}>
                  <SelectValue placeholder="Выберите предмет" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <Label>Класс *</Label>
              <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                <SelectTrigger className={errors.grade ? "border-red-500" : ""}>
                  <SelectValue placeholder="Выберите класс" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.grade && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.grade}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>Удобное время</Label>
            <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите время" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="comment">Дополнительная информация</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => handleInputChange("comment", e.target.value)}
              placeholder="Расскажите о целях обучения, особенностях ребёнка, пожеланиях к репетитору..."
              rows={4}
            />
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreed"
              checked={formData.agreed}
              onCheckedChange={(checked) => handleInputChange("agreed", checked as boolean)}
              className={errors.agreed ? "border-red-500" : ""}
            />
            <div>
              <Label htmlFor="agreed" className="text-sm leading-relaxed cursor-pointer">
                Согласен на обработку персональных данных и получение информационных сообщений
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-amber-700 hover:bg-amber-800 text-lg py-4 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            disabled={isSubmitting || !formData.agreed}
          >
            {isSubmitting ? (
              <>
                <Clock className="h-5 w-5 mr-2 animate-spin" />
                Отправляем заявку...
              </>
            ) : (
              <>
                <Calendar className="h-5 w-5 mr-2" />
                Записаться на бесплатную консультацию
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
