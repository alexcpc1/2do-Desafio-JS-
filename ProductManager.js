
const fs = require("fs");

class ProductManager {
    constructor(pathName){
        this.path=pathName;
    }
    fileExists(){
        return fs.existsSync(this.path);
    };

    generateId(products){
        let newId;
        if(!products.length){
            newId=1;
        } else{
            newId = products[products.length-1].id+1;
        }
        return newId;
    }

    async addProduct (product){
        try{
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products =JSON.parse(content);
                const productId = this.generateId(products);
                product.id = productId;
                products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                return product;
            } else {
                const productId = this.generateId([]);
                product.id = productId;
                // console.log("product: ", product);
                await fs.promises.writeFile(this.path, JSON.stringify([product], null, 2));
                return product;
            };
        } catch(error){
            // console.log(error.mesage);
            throw new error(error.mesage);
        }
    };
// obtener productos
    readProducts = async () => {
        let respuesta = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }
    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    async getProductById(id){
        try{
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                const product = products.find(item=>item.id === id);
                if(product){
                    return product;
                } else {
                    throw new Error (`El producto con el id ${id} no existe`);
                }
             } else {
                throw new Error("El archivo no existe");
             }
        } catch (error){
            // console.log(error.message);
            throw new Error(error.message);
        }
    };
    async updateProduct(id, product){
        try{
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(item=>item.id === id);
                if(productIndex>=0){
                    products[productIndex]={
                        ...products[productIndex],
                        ...product
                    }
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                    return `El producto con el id ${id} fue modificado`;
                } else {
                    throw new Error (`El producto con el id ${id} no existe`);
                }
             } else {
                throw new Error("El archivo no existe");
             }
        } catch (error){
            // console.log(error.message);
            throw new Error(error.message);
        }
    };
    deleteProduct = async(id) =>{
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify([productFilter], null, 2));
        console.log(`El producto con el id ${id} fue eliminado`)
    };
}

const manager = new ProductManager("./products.json");

const functionPrincipal = async()=>{
    try{
        // const productAdded = await manager.addProduct({title: "Risotto", descripcion: "Risotto de Champiñones 40Gr", price: 3000, thumbnail: "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20548165-LhlJB88C-medium.jpg", code: "1010", stock: 40});
        // const productAdded1 = await manager.addProduct({title: "Cereal", descripcion:   "Cereal Infantil Nestum Frutilla - 250GR", price: 6000, thumbnail: "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20386774-qf9cW0sV-medium.png",  code: "1012", stock: 100});
        // const productAdded2 = await manager.addProduct({title: "Mantequilla", descripcion:   "Mantequilla con Sal - 250 GR", price: 1500, thumbnail: "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/4011088-aosxGOr0-medium.jpg",  code: "1014", stock: 20});
        // const productAdded3 = await manager.addProduct({title: "Chorizo", descripcion:  "Chorizo Parrillero - 20 Und", price: 2000, thumbnail: "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20050239-Oy6zFS-p-medium.jpg",  code: "1016", stock: 30});
        // const productAdded4 = await manager.addProduct({title: "Queso", descripcion:  "Queso Gauda Laminado - 500 GR", price: 4000, thumbnail: "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20211526-38YL_0zf-medium.jpg",  code: "1012", stock: 300});
        // console.log("productAdded; ", productAdded);
        // const product1 = await manager.getProductById(4);
        // console.log("product1: ", product1);
        const product2 = await manager.getProductById(2);
        console.log("product2: ", product2);
        // const resultado = await manager.updateProduct(3,{price:4000});
        // console.log("resultado: ", resultado);
        const resultado2 = await manager.getProducts();
        // const deleteProduct = await manager.deleteProduct(4);
    } catch(error){
        console.log(error.message);
    }
    
}
functionPrincipal();
