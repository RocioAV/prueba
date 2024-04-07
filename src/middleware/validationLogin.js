const { body,validationResult} = require('express-validator')
const users = require('../data/users.json')
const validacion = [
    body('email')
    .notEmpty()
    .withMessage('Debes escribir un correo electronico')
    .isEmail()
    .withMessage('Esto no es un correo')
    .custom((value, { req}) => {
        const user = users.find((user) => user.email === value);
        if (user) {
            return true;
        }else {
            return false;
        }

    })
    .withMessage('El correo no se encuentra registrado'),

    body('password')
    .notEmpty()
    .withMessage('Debes escribir una contraseña')
    .custom((value, { req }) => {
        const user = req.user; // Obtiene el usuario almacenado en la solicitud
        if (user && user.password === value) {
            return true; // La contraseña coincide
        } else {
            return false; // La contraseña no coincide o no hay usuario registrado
        }
    })
    .withMessage('La contraseña no coincide con el usuario registrado')
]

const result = (req, res, next) => {
            console.log(req.body);
                const errors = validationResult(req);
                console.log(errors.mapped());
                if (errors.isEmpty()) {
                    next();
                } else {
                    res.render("Login", {
                        errors: errors.mapped(),
                        old:req.body
                    });
                }
            };
           

module.exports = {validacion, result}
 