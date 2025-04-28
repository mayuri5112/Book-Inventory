import path from 'path';
import productModel from '../models/products.model.js';
import { name } from 'ejs';


export default class productControllers {
    getProducts(req, res) {
        let products = productModel.get();
        res.render("products", { products: products }); 

        
        // console.log(products);
        // return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'));
    }

    getAddFormS(req, res) {
        return res.render('new-products',{errorMessage:null});
    }
    
    addproducts(req, res) {

        console.log(req.body);
        const { name, desc, price, imgurl } = req.body;
        const imgUrl = 'images/' + req.file.filename;
        productModel.add(name, desc, price, imgUrl);
        let products = productModel.get();
        res.render('products', { products: products })
        
    }

    getUpdateProducts(req, res, next) {
        // 1. if product exits then return view
        const id = req.params.id;
        console.log(req.params);
        console.log(id,"=id");
        const foundProduct = productModel.getById(id);
        console.log(foundProduct, "founded");
        if (foundProduct) {
            res.render('update-product', { product: foundProduct, errorMessage: null });
        }
        
        //2. o.w, return errors
        else {
            res.status(401).send('Product not found');
        }
    }

    addUpdatedProducts(req, res) {
        
        productModel.update(req.body);
        var products = productModel.getAll();
        res.render('products', { products });
    }

    deleteProduct(req, res) {
        const id = req.params.id;
        const productFound = productModel.getById(id);
        if (!productFound) {
            res.status(401).send('Product not found');
        }
        productModel.delete(id);
        var products = productModel.getAll();
        res.render('products', { products });
    }
}