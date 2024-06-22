const { readProductsCSV } = require('./fileManagement');


// Function to get a greeting message
function getGreetingMessage() {
    return {
        text: 'Welcome to Fulva! How can I help you today?',
        options: [
            { text: 'View Products', callback_data: 'view_products' },
            { text: 'Need Help', callback_data: 'need_help' }
        ]
    };
}

// Function to get a list of products
async function getProductsMessage() {
    try {
        const products = await readProductsCSV();
        const inline_keyboard = products.map(product => ([{
            text: product.name,
            callback_data: `product_${product.id}`
        }]));

        return {
            productsMessage: 'Here are our available products:',
            inline_keyboard: inline_keyboard
        };
    } catch (error) {
        console.error('Error sending products message:', error.message);
    }
}

// Function to get product link
async function getProductLinkMessage(productId) {
    console.log(productId)
    const products = await readProductsCSV();
    const product = products.find(p => p.id === productId);

    if (product) {
        return {
            text: `Click here to buy ${product.name}: ${product.externalURL}`
        };
    } else {
        return {
            text: 'Sorry, product not found.'
        };
    }
}




module.exports = {
    getGreetingMessage,
    getProductsMessage,
    getProductLinkMessage
};
