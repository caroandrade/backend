


require('dotenv').config(); //para que pueda leer el archivo de variables de entorno

const express = require('express');
//crear servicor express
const cors = require('cors');


const { dbConection } = require('./db/config');
const app = express();


//Configurar cors

app.use(cors());

//base de datos
dbConection();
//usuario: user
//clave : dTSmpAZyUboeOMeP

console.log(process.env);//para ver todas las variables de entorno

//ruta
app.get( '/', (req, res)=>{
   res.json({
      ok: true,
      msg: 'hola mundo'
   })
} ); //solicitud para crear una api rest

app.listen( process.env.PORT, ( )=> {
   console.log('servidor corriendo en puerto: ' ,process.env.PORT );
});