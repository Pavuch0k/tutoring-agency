import { NextResponse } from 'next/server';

// Конфигурация Telegram
const TELEGRAM_BOT_TOKEN = '8446791933:AAGpzY_B1eGr7A_ATNXhtYJ314aj7B_MtUs';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Список получателей (можно легко добавить новых)
const TELEGRAM_CHAT_IDS = [
  '1674647336', // Первый получатель
  '770143688',  // Второй получатель
  // Здесь можно добавить других получателей
];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Форматирование сообщения
    const message = formatMessage(data);
    
    // Отправка сообщения всем получателям
    const sendPromises = TELEGRAM_CHAT_IDS.map(chatId => 
      sendTelegramMessage(chatId, message)
    );
    
    const results = await Promise.allSettled(sendPromises);
    
    // Проверка результатов отправки
    const failedSends = results.filter(r => r.status === 'rejected');
    if (failedSends.length > 0) {
      console.error('Some messages failed to send:', failedSends);
    }
    
    // Если хотя бы одно сообщение отправлено успешно
    const successfulSends = results.filter(r => r.status === 'fulfilled');
    if (successfulSends.length > 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'Заявка успешно отправлена',
        sent: successfulSends.length,
        failed: failedSends.length
      });
    } else {
      throw new Error('Не удалось отправить ни одно сообщение');
    }
    
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка при отправке заявки' },
      { status: 500 }
    );
  }
}

function formatMessage(data: any): string {
  const { parentName, childName, phone, subject, grade, format, comment } = data;
  
  const formatType = format === 'online' ? 'Онлайн' : format === 'offline' ? 'Офлайн' : 'Не указан';
  
  return `
🎓 *Новая заявка на репетитора*

👤 *Родитель:* ${parentName || 'Не указано'}
👶 *Ребенок:* ${childName || 'Не указано'}
📞 *Телефон:* ${phone || 'Не указан'}
📚 *Предмет:* ${subject || 'Не указан'}
🎒 *Класс:* ${grade || 'Не указан'}
💻 *Формат:* ${formatType}

💬 *Комментарий:*
${comment || 'Без комментария'}

⏰ *Время заявки:* ${new Date(Date.now() + 3600000).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
  `.trim();
}

async function sendTelegramMessage(chatId: string, message: string): Promise<any> {
  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Telegram API error for chat ${chatId}: ${error}`);
  }

  return response.json();
}