/* rutas api/usuarios*/

const {Router} = require('express');

const{ check } = require('express-validator');
const { validarCampos } = require('../middeleware/validar-campos')

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario} = require('../controlers/usuarios');
const { validarJWt } = require('../middeleware/validar-jwt');


const router = Router();


 router.get( '/',validarJWt, getUsuarios );
 //crear usuario ruta
 router.post( '/', [
//uso llaves cuadradas si pongo varios middleware
    check('nombre','mensaje para cada caso personalizado').not().isEmpty(),
    check('password','la clave es obligatoria').not().isEmpty(),
    check('email','este es un mesaje personalizado').isEmail(),
    validarCampos //debe llamarse despues de los check
 ], crearUsuarios ); //crear usuario

router.put('/:id', validarJWt,
[
    check('nombre','mensaje para cada caso personalizado').not().isEmpty(),
    check('email','este es un mesaje personalizado').isEmail(),
    check('rol','el rol es obligatorio').not().isEmpty(),
    validarCampos

],actualizarUsuario); //para modificar un usuario pido a la ruta que lo traiga por el id


router.delete('/:id', validarJWt,
[
    check('nombre','mensaje para cada caso personalizado').not().isEmpty(),
    check('email','este es un mesaje personalizado').isEmail(),
    validarCampos
], borrarUsuario
);

module.exports = router;

