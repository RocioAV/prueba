/* const express = require('express');
const app = express(); */

const products = require('../data/productsData.json');

const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '..','data','productsData.json');

module.exports = {
    all: (req,res) => {
        res.render('productsAll',{
            products
        });
    },
    detail: (req, res) => {
        let productoId = req.params.id;
        let producto = products.find((prod) => prod.id == productoId);
        res.render('productDetail', {producto: producto})
    },
    crear: (req, res) => {
        res.render('formCarga');
    },
    agregar: (req, res) => {
        const newProduct= req.body;
        newProduct.id= `${products.length + 1}`
        newProduct.image=  req.files.length > 0 ? req.files.map(file => file.filename) : "default-image.webp";
        console.log(newProduct);
        console.log(req.files);
        //agrego al array
        products.push(newProduct);
        //actualizo el json
        fs.writeFileSync(productsFilePath,JSON.stringify(products));
        
        res.redirect('/products')
    },
    edit: (req,res)=>{
        const {id} = req.params;
        const alojamiento = products.find((prod) => prod.id == id);

        res.render('formEdit', {alojamiento});
    },
    guardarCambios: (req, res) => {
        const {id} = req.params;

        const indexProduct = products.findIndex((prod) => prod.id == id);
        let productoAEditar = products[indexProduct];

        let editado = req.body;
        editado.id = parseInt(id);
        editado.image = req.file?.filename || productoAEditar.image ;
        editado.imageArray = productoAEditar.imageArray;
        editado.description = editado.description  != '' ? editado.description : productoAEditar.description; 
        //por ahora... igual todo esto quedará obsoleto cuando implementemos base de datos jaja

        console.log(req.body);

        for(let propiedad in productoAEditar){
            if(productoAEditar.hasOwnProperty(propiedad)){
                productoAEditar[propiedad] = editado[propiedad];
            }
        }

        fs.writeFileSync(productsFilePath,JSON.stringify(products));

        res.redirect('/products'); //redireccionar al producto
    }
}