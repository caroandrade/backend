
/* path ('/api/login)*/

const { Router }= require('express');
const { login }= require('../controlers/auth');
const { check} = require('express-validator');
const { validarCampos }=require('../middeleware/validar-campos');


const router= Router();

    router.post('/',
    [
        check('email','es nesesario el email').isEmail(),
        check('password','es nesesario la constraseña').not().isEmpty(),
        validarCampos
],
  login  
    )



module.exports= router;
