# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая dev) для сборки
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Собираем приложение Next.js
RUN npm run build

# Удаляем dev зависимости после сборки для уменьшения размера
RUN npm prune --production

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]