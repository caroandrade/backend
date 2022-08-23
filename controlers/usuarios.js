//funciones que voy a exportar logica de cada ruta
const {response } = require('express');

const bcrypt= require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT} = require('../helpers/jwt');

const getUsuarios = async(req, res= response)=>{

// trae todos los usuarios
    const usuarios =  await Usuario.find(); 
   
    res.json({
       ok: true,
       usuarios,
       uid: req.uid
    });
}

//crear un usuario
const crearUsuarios= async  (req, res)=>{
   const { email, password}= req.body;
   /*
   const errores= validationResult(req);
    if( !errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
lo llevo a middleware validar campos
*/ 
   try{



    const existeEmail= await Usuario.findOne({email});
    if(existeEmail){
        return res.status(400).json({
            ok: false,
            msg:'El correo ya existe'
            
        });
    }

            const usuario = new Usuario(req.body); //crea una instancia
            
            //encriptar la contraseña ante de guardar el usuario
            const salt = bcrypt.genSaltSync();

                usuario.password = bcrypt.hashSync(password, salt);

            //salt data generada en forma aleatoria 
            await usuario.save(); //graba en base de datos 

            const token = await generarJWT( usuario.id );
            

            res.json({
            ok: true,
            usuario, 
            token
            });

   }catch(error){
            console.log(error);
         return   res.status(500).json({
                ok: false,
                msg: 'error inesperado'
            })
   }

}
   const actualizarUsuario = async(req, res = response)=>{
       //todo validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
   
  
    try{
         const usuarioDB = await Usuario.findById( uid );

         if( !usuarioDB){

                return res.status(404).json({
                    ok: false,
                    msg:'no existe el usuario con ese id'
                });
         }
         //actualicaciones
         //desestructurar los valores const campos = req.body;
         const { password, google, email, ...campos}= req.body;


            if (usuarioDB.email !== req.body.email){
                           
                                const existeEmail= await Usuario.findOne({email});
                                if (existeEmail){
                                    return res.status(400).json({
                                        ok: false,
                                        msg:'ya existe un usuario con ese email'
                                    });
                                }

                        }
         
         

            
            //actualizaciones 
                            campos.email= email; 

           
           //  elimino esta lineas al desestructurarlos en linea 87 delete campos.password;
            //delete campos.google;

            const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true});

            res.json({
                ok: true,
              usuario: usuarioActualizado


            });


    }catch(error){
        console.log(error);
        res.status(500).json({
                ok: false,
                msg: 'Error inesperado actualizar objeto'
        })  
          }
    }

   

    const borrarUsuario = async(req, res = response)=>{

        const uid = req.params.id;
        try{
            

            const usuarioDB = await Usuario.findById( uid );
            if( !usuarioDB){

                return res.status(404).json({
                    ok: false,
                    msg:'no existe el usuario con ese id'
                });
            }
            await Usuario.findByIdAndDelete(uid);
                     res.json({
                       ok: true,
                       msg:'cusuario eliminado',
                     uid
       
       
                   });
                

        }catch(error){
            console.log(error);
            res.status(500).json({
                ok: false,
                msg:'pasó algo con el borrado'
            });
        }

    }



module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario,
};

