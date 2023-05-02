const fs = require("fs/promises");

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }
    
    async getItems() {
        const data = await fs.readFile(this.path, "utf-8");
        const items = await JSON.parse(data);
        return items;
    }

    async writeFile(data) {
        const stringData = JSON.stringify(data, null, 4);
        return await fs.writeFile(this.path, stringData, "utf-8");
    }

    async getItemById(id) {
        const items = await this.getItems(); 
        const itemFound = items.find((item) => item.id === id);
        if (itemFound) {
            return itemFound;
        } else {
            console.log("Product not found");
        }
    }

    // METODOS DE PRODUCTOS
    async addProduct(product) {
        let products = await this.getItems(); 
        const newProduct = {
            id: products.length + 1,
            ...product
        }; 
        products.push(newProduct); 
        await this.writeFile(products);
        return products; 
    }

    async updateProduct(pid, properties) {
        const products = await this.getItems(); 
        const productFound = await this.getItemById(pid); 
        const updatedProduct = { ...productFound, ...properties }; 

        if (productFound) {
            const updatedList = products.map(prod => { 
                if (prod.id === updatedProduct.id) {
                    return updatedProduct; 
                } else {
                    return prod; 
                }
            });
            this.writeFile(updatedList); 
            return updatedList; 
        } else {
            console.log("no se encontro el producto"); 
        }
    }

    async deleteProduct(pid) {
        
        const products = await this.getItems(); 
        const filteredProducts = products.filter((product) => product.id !== pid); 
        await this.writeFile(filteredProducts); 
        return filteredProducts;
    }

    // METODOS PARA EL CARRITO
    async createCart() {
        
        let cart = await this.getItems(); 
        const newCart = { id: cart.length + 1, products: [] }; 
        cart.push(newCart); 
        await this.writeFile(cart); 
        return cart; 
    }

    async addToCart(cid, pid) {
        let cart = await this.getItems();
        const order = cart.find((o) => o.orderId === cid);

        if (order) {
            const productExist = order.products.find((prod) => prod.prodId === pid);

            if (productExist) {
                const orderPosition = cart.findIndex((order) => order.orderId === cid);
                const updateProduct = cart[orderPosition].products.find(
                    (prod) => prod.prodId === pid
                );
                const productPosition = cart[orderPosition].products.findIndex(
                    (prod) => prod.prodId === pid
                );

                cart[orderPosition].products[productPosition].quantity =
                updateProduct.quantity + 1;
                await this.writeFile(cart);
                return cart;

            } else {
                const newProduct = { prodId: pid, quantity: 1 };
                const orderPosition = cart.findIndex((order) => order.orderId === cid);
                if (orderPosition <= 0) {
                    cart[orderPosition].products.push(newProduct);
                    await this.writeFile(cart);
                    return cart;
                }
            }
        } else {
            const newOrder = {
                orderId: cart.length + 1,
                products: [{ prodId: pid, quantity: 1 }],
            };
            cart.push(newOrder);
            await this.writeFile(cart);
            return cart;
        }
    }
}

module.exports = ProductManager;
