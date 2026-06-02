const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (frontend Mini App)
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Initialize Telegram Bot
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
    console.error('Ошибка: TELEGRAM_BOT_TOKEN не задан в файле .env!');
    process.exit(1);
}

// Use polling for local development
const bot = new TelegramBot(token, { polling: true });

console.log('Telegram Bot успешно запущен и слушает сообщения...');

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name || 'Геймер';

    // Welcome message with inline button to launch the Mini App
    const welcomeMessage = `Привет, ${userName}! 🎮\n\nДобро пожаловать в *GamePay* — лучший сервис для быстрой покупки игровой валюты!\n\nУ нас вы можете приобрести:\n• PUBG Mobile (UC)\n• Genshin Impact (Кристаллы)\n• Mobile Legends (Алмазы)\n• Roblox (Robux)\n• Brawl Stars (Гемы)\n\nНажмите на кнопку ниже, чтобы открыть магазин и сделать заказ! 👇`;

    // We will use a fallback or placeholder URL. The user will replace it with their GitHub Pages URL,
    // or we can serve it locally if they use tools like ngrok.
    const webAppUrl = process.env.WEBAPP_URL || 'https://goituevr-oss.github.io/gamepay-bot/';

    bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '🎮 Открыть Магазин',
                        web_app: { url: webAppUrl }
                    }
                ],
                [
                    {
                        text: 'ℹ️ О нас / Поддержка',
                        callback_data: 'support_info'
                    }
                ]
            ]
        }
    });
});

// Handle callback queries (buttons)
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'support_info') {
        const supportText = `🤖 *Служба поддержки GamePay*\n\n• Мы работаем 24/7 без выходных.\n• Среднее время зачисления валюты: 5-15 минут.\n• Если у вас возникли вопросы по заказу, напишите нашему менеджеру: @gamepay_support_demo\n\nЗапустите магазин с помощью кнопки «Открыть Магазин» в меню!`;
        bot.sendMessage(chatId, supportText, { parse_mode: 'Markdown' });
    }
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`Вы можете использовать ngrok для тестирования Mini App локально: ngrok http ${PORT}`);
});
