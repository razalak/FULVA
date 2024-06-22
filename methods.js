const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Function to read CSV and parse products
function readProductsCSV() {
    return new Promise((resolve, reject) => {
        const products = [];
        fs.createReadStream(path.join(__dirname, 'products.csv'))
            .pipe(csv())
            .on('data', (row) => {
                // console.log('Raw row:', row);
                products.push({
                    id: parseInt(row.keyid),
                    type: row.Type,
                    sku: row.SKU,
                    name: row.Name,
                    published: row.Published,
                    isFeatured: row["Is featured?"],
                    visibilityInCatalog: row["Visibility in catalog"],
                    shortDescription: row["Short description"],
                    description: row.Description,
                    dateSalePriceStarts: row["Date sale price starts"],
                    dateSalePriceEnds: row["Date sale price ends"],
                    taxStatus: row["Tax status"],
                    taxClass: row["Tax class"],
                    inStock: row["In stock?"],
                    stock: row.Stock,
                    lowStockAmount: row["Low stock amount"],
                    backordersAllowed: row["Backorders allowed?"],
                    soldIndividually: row["Sold individually?"],
                    weight: row["Weight (kg)"],
                    length: row["Length (cm)"],
                    width: row["Width (cm)"],
                    height: row["Height (cm)"],
                    allowCustomerReviews: row["Allow customer reviews?"],
                    purchaseNote: row["Purchase note"],
                    salePrice: row["Sale price"],
                    regularPrice: row["Regular price"],
                    categories: row.Categories,
                    tags: row.Tags,
                    shippingClass: row["Shipping class"],
                    images: row.Images,
                    downloadLimit: row["Download limit"],
                    downloadExpiryDays: row["Download expiry days"],
                    parent: row.Parent,
                    groupedProducts: row["Grouped products"],
                    upsells: row.Upsells,
                    crossSells: row["Cross-sells"],
                    externalURL: row["External URL"],
                    buttonText: row["Button text"],
                    position: row.Position
                });
            })
            .on('end', () => {
                resolve(products);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

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
    const products = await readProductsCSV();
    // console.log('Parsed products:', products);
    const productList = products.map(product => ({
        text: product.name,
        callback_data: `product_${product.id}`
    }));

    return {
        text: 'Here are our available products:',
        options: productList
    };
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
