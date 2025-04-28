// const express = require('express');
import express from 'express';
import productControllers from './src/controllers/products.controllers.js';
import UserController from './src/controllers/user.controller.js';
import path from 'path';
import ejsLayout from 'express-ejs-layouts';
// import validationMiddleware from '../middlewares/validation.middleware.js';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import exp from 'constants';

const server = express();
const userController = new UserController();

server.use(express.static('public'));

//creating the view engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), 'src', 'views'));

//telling server to use specific middlewaare as default
server.use(ejsLayout);
server.use(express.json());

//parsing form data
server.use(express.urlencoded({ extended: true }));

//creating instance
const productController = new productControllers();

server.get('/register', userController.getRegister);
server.get('/login', userController.getLogin);
server.post('/login', userController.postLogin);
server.post('/register', userController.postRegister);


server.get('/', productController.getProducts);
server.get('/new', productController.getAddFormS);

server.get('/update-product/:id', productController.getUpdateProducts);

server.post('/delete-product/:id', productController.deleteProduct)

server.post('/',uploadFile.single('imgUrl'),validationMiddleware, productController.addproducts);

server.post('/update-product', productController.addUpdatedProducts)

// server.use(express.static('src/views'));

// server.get('/',(req, res)=> {
//     res.send('Welome to project');
// })

server.listen(3100);
console.log('server is listening');