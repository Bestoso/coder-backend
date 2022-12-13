const fs = require('fs');

class ProductManager {
    static contador = 0;
    constructor () {
        this.products = [];
        this.path = './products.json';
    }
    addProduct(title, description, price, thumbnail, stock){
        this.products.push({
            code: ProductManager.contador++,
            title,
            description,
            price,
            thumbnail,
            stock
        })
        if (title === undefined ||
            description === undefined ||
            price === undefined ||
            thumbnail === undefined ||
            stock === undefined) return 'All fields are required';
        if (typeof price !== 'number') return 'Price must be a number';
        if (typeof stock !== 'number') return 'Stock must be a number';
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }
    updateProduct(id, title, description, price, thumbnail, stock){
        const product = this.products.find(product => product.code === id);
        if (product === undefined) return 'Not found';
        if (title !== undefined) product.title = title;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;
        if (thumbnail !== undefined) product.thumbnail = thumbnail;
        if (stock !== undefined) product.stock = stock;
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }
    removeProduct(id){
        this.products = this.products.filter(product => product.code !== id);
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }
    getProductById(id){
        const product = this.products.find(product => product.code === id);
        if (product === undefined) return 'Not found';
        return fs.readFileSync(this.path, 'utf-8');
    }
    getProducts(){
        if (this.products.length === 0) return 'there are no products';
        return fs.readFileSync(this.path, 'utf-8');
    }
}

const manager = new ProductManager;

manager.addProduct('coca', 'coca cola descripcion', 500, 'imagecoca.jpg', 31);
manager.addProduct('fanta', 'fanta descripcion', 450, 'imagefanta.jpg', 23);

manager.updateProduct(0, 'coca', 'coca cola descripcion', 500, 'imagecoca.jpg', 10);
manager.updateProduct(1, 'fanta', 'fanta descripcion', 450, 'imagefanta.jpg', 20);

manager.removeProduct(0);

console.log(manager.getProductById(1));

console.log(manager.getProducts());