const { Telegraf } = require('telegraf');
const {
    getGreetingMessage,
    getProductsMessage,
    getProductLinkMessage,
} = require('./methods/flowMethods.js');

require('dotenv').config();

// Replace with your own token from BotFather
const token = process.env.YOUR_TELEGRAM_BOT_TOKEN;

// Create a bot instance
const bot = new Telegraf(token);

// Handle '/start' command
bot.start(async (ctx) => {
    const greetingMessage = getGreetingMessage();

    try {
        await ctx.reply(greetingMessage.text, {
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
bot.on('callback_query', async (ctx) => {
    const callbackQuery = ctx.callbackQuery;
    const message = callbackQuery.message;
    const data = callbackQuery.data;

    console.log('Received callback data:', data);

    switch (true) {
        case data === 'view_products':
            try {
                const { productsMessage, inline_keyboard } = await getProductsMessage();
                await ctx.reply(productsMessage, {
                    reply_markup: {
                        inline_keyboard: inline_keyboard
                    }
                });
            } catch (error) {
                console.error('Error sending products message:', error.message);
            }
            break;

        case data.startsWith('product_'):
            const productId = parseInt(data.split('_')[1]);
            console.log('Product ID:', productId);

            try {
                const productLinkMessage = await getProductLinkMessage(productId);
                console.log('Product Link Message:', productLinkMessage);
                await ctx.reply(productLinkMessage.text);
            } catch (error) {
                console.error('Error sending product link message:', error.message);
            }
            break;

        case data === 'need_help':
            try {
                await ctx.reply('How can I assist you? Please describe your issue.');
            } catch (error) {
                console.error('Error sending help message:', error.message);
            }
            break;

        default:
            // Handle other callback data types here
            console.log('Unhandled callback data:', data);
    }
});
// Log any errors
bot.catch((err, ctx) => {
    console.error(`Encountered an error for ${ctx.updateType}`, err);
});

// Start the bot
bot.launch().then(() => {
    console.log('Bot is running...');
});