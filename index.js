


require('dotenv').config(); //para que pueda leer el archivo de variables de entorno

const express = require('express');
//crear servicor express
const cors = require('cors');


const { dbConection } = require('./db/config');
const app = express();


//Configurar cors

app.use(cors());

//lectura y parseo del body
//debo implementar un middelware
app.use( express.json());


//base de datos
dbConection();
//usuario: user
//clave : dTSmpAZyUboeOMeP

//console.log(process.env);//para ver todas las variables de entorno

//ruta
app.use('/api/usuarios', require('./routes/usuarios'));

// todo esto lo reparto entre archivo rutas: rutas
//y en controladores la logica para que el index quede claro y limplio 

//} ); //solicitud para crear una api rest
//usuarios

// app.get( '/api/usuarios', (req, res)=>{
//    res.json({
//       ok: true,
//       msg: 'estos son los usuarios '
//    })
// } );

//voy a crear un nueva ruta para el login
app.use('/api/login', require('./routes/auth'));

app.listen( process.env.PORT, ( )=> {
   console.log('servidor corriendo en puerto: ' ,process.env.PORT );
});