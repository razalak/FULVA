const TelegramBot = require('node-telegram-bot-api');
const {
    getGreetingMessage,
    getProductsMessage,
    getProductLinkMessage
} = require('./methods.js');

require('dotenv').config();

// Replace with your own token from BotFather
const token = process.env.YOUR_TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Handle '/start' command
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const greetingMessage = getGreetingMessage();

    try {
        await bot.sendMessage(chatId, greetingMessage.text, {
            reply_markup: {
                inline_keyboard: greetingMessage.options.map(option => [{
                    text: option.text,
                    callback_data: option.callback_data
                }])
            }
        });
    } catch (error) {
        console.error('Error sending greeting message:', error.message);
    }
});

// Handle callback queries
bot.on('callback_query', async (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;

    console.log('Received callback data:', data);

    if (data === 'view_products') {
        try {
            const productsMessage = await getProductsMessage();
            const inline_keyboard = productsMessage.options.map(option => ([{
                text: option.text,
                callback_data: option.callback_data
            }]));

            await bot.sendMessage(message.chat.id, productsMessage.text, {
                reply_markup: {
                    inline_keyboard: inline_keyboard
                }
            });
        } catch (error) {
            console.error('Error sending products message:', error.message);
        }
    } else if (data.startsWith('product_')) {
        const productId = parseInt(data.split('_')[1]);// Assuming productId is already a string
        console.log('Product ID:', productId);

        try {
            const productLinkMessage = await getProductLinkMessage(productId);
            console.log('Product Link Message:', productLinkMessage);

            await bot.sendMessage(message.chat.id, productLinkMessage.text);
        } catch (error) {
            console.error('Error sending product link message:', error.message);
        }
    } else if (data === 'need_help') {
        try {
            await bot.sendMessage(message.chat.id, 'How can I assist you? Please describe your issue.');
        } catch (error) {
            console.error('Error sending help message:', error.message);
        }
    }
});

// Log any errors
bot.on('polling_error', (error) => {
    console.error(`Polling error: ${error.code}`);
});

// Start the bot
console.log('Bot is running...');
