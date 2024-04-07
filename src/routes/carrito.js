const express = require('express');
const router = express.Router();
const carritoControllers = require('../controllers/carritoControllers');

router.get('/datos/:id', carritoControllers.datos);
router.get('/pago/:id', carritoControllers.pago);
router.get('/resumen/:id', carritoControllers.resumen);

module.exports = router;