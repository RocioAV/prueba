const products = require('../data/productsData.json');
module.exports = {
    datos: (req, res) => {
        let productoId = req.params.id;
        let producto = products.find((prod) => prod.id == productoId);
  
        res.render ('carrito1', {producto: producto})
    },
    pago: (req, res) => {
        let productoId = req.params.id;
        let producto = products.find((prod) => prod.id == productoId);
        res.render ('carrito2', {
            producto: producto
        })
    },
    resumen: (req, res) => {
        let productoId = req.params.id;
        let producto = products.find((prod) => prod.id == productoId);
        res.render ('carrito3', {
            producto: producto
        })
    }
}