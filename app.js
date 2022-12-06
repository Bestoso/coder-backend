class ProductManager {
    static contador = 0;
    constructor () {
        this.products = [];
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
        if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || stock === undefined) return 'All fields are required'
        if (typeof price !== 'number') return 'Price must be a number'
        return this.products;
    }
    removeProduct(id){
        return this.products = this.products.filter(product => product.code !== id)
    }
    getProductById(id){
        const product = this.products.find(product => product.code === id);
        if (product === undefined) return 'Not found'
        return product
    }
    getProducts(){
        return this.products;
    }
}

const manager = new ProductManager;

console.log(manager.addProduct('coca', 'coca cola descripcion', 500, 'imagecoca.jpg', 31));
console.log(manager.addProduct('fanta', 'fanta descripcion', 450, 'imagefanta.jpg', 23));

console.log(manager.getProductById(0)); // coca-cola object
console.log(manager.removeProduct(1)); // removes fanta

console.log(manager.getProducts())
