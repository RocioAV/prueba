const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const multers = require("multer");
const upload = require('../middleware/multer');

router.get('/', productControllers.all);

// encontrar forma de requerir Multer o storage:4,5



router.get('/detail/:id', productControllers.detail);
// crar un producto y guardarlo

router.get('/create', productControllers.crear);
router.post('/', upload.array("image", 10 ),productControllers.agregar);
//editar

router.get('/edit/:id', productControllers.edit)
router.put('/edit/:id',productControllers.guardarCambios)

module.exports = router;