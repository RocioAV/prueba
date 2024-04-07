const express = require('express');
const app = express();
const path = require('path');

const multer = require("multer");

//const products = require("../controllers/productController.js");    // REQUIRE PRODUCTS

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const pathname = path.join(__dirname, "..", "..", "public", "images","users");
      cb(null, pathname)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });

 // const upload = multer({ storage: storage });

 // Router.post = ("/uploads", upload.any());

/* app.post('/productsData.json', upload.single('archivo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha subido ningún archivo.');
  }

  res.send('Archivo subido con éxito.');
}); */

const upload = multer({storage})
module.exports = upload;