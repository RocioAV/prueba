const express = require('express');
const path = require('path');
const methodOverride =  require('method-override');
const app = express();
const routesMain = require('./src/routes/main');
const routesProduct = require('./src/routes/productDetail');
const routesCarrito = require('./src/routes/carrito');
const PORT = 3030;

app.set("view engine", "ejs");
app.set('views','./src/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT , () => {
    console.log('Servidor corriendo en el puerto: ' + PORT);
});


app.use(routesMain);

app.use('/products', routesProduct);

app.use('/carrito', routesCarrito);

