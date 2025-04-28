
import userModel from "../models/user.model.js";
import productModel from "../models/products.model.js";

const usermodel = new userModel();
export default class UserController{

    getRegister(req, res) {
        res.render('register');
    }

    getLogin(req, res) {
        res.render('login', { errorMessage: null });
    }

    postRegister(req, res) {
        const { name, email, password } = req.body;
        userModel.add(name, email, password);
        res.render('login', { errorMessage: null });
    }

    postLogin(req, res) {
        const { email, password } = req.body;
        const user = userModel.isvalid(email, password);
        console.log(user + "- new user");
        if (!user) {
            return res.render('login', { errorMessage: 'Invalid Credentials' });
        }
        // return res.render('/');
        
        var products = productModel.getAll();
        res.render('products', { products });
        
    }
       
}