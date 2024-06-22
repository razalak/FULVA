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


module.exports = {
    readProductsCSV
};
