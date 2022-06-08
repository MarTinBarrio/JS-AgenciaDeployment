//Import express, lo asigno a una varialbes
//const express = require ('express'); //esta es la forma vieja...
import express from 'express'; //Esta es la forma nueva, para usarlo modifico el packge.json agregando "type": "module"
//import { restart } from 'nodemon';
import router from './routes/index.js';
import db from './config/db.js'

//uso esa variable para ejecutar express
const app = express();


//conectar la base de datos
db.authenticate()
    .then ( () => console.log ('Base de datos conectada'))
    .catch (error => console.log(error));

//Definir puerto
//pocess.env.PORT es una variabled e entorno y si no la encuentra le asigna el puerto 4000
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

//habilitar PUG
app.set('view engine', 'pug');

//Creando mi porpio midelware... para setear las funciones q necesito o quisiera ejecutar.., en este caso..
//obtener el año actual
                    //next es el proximo paso de código...
app.use( (req, res, next) => {
    //res.locals.unaVariable = "una Variable nueva"  //Local es un objeto global de express donde puedo agregar información y consumirla en otro lado
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de viajes";

    return next(); // con return next obligo a q se ejecute la prox llamada en el midellware
});

//Agregar un body parser para leer los datos del formulario...
app.use(express.urlencoded({extended: true}));

//definir la carpeta pública
app.use(express.static('public'));

//Agrego el router, para acceder a todos los verbos uso el .use() q soporta: get, post, put, patch, y delete.
app.use('/', router);

//con app arranco el servidor, con el método .listen y le paso el puerto y hago un callback para conocer ese puerto
app.listen (port, ()=>{
    console.log(`El servidor está funcionando en el puerto ${port}`);
})

//ahora modifico el package.json
//en la parte de script
/**
 *   "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
 * 
 *  Lo cambio por....
 * nodemon está instalado en node_modelues/.bin
 * 
 *  "scripts": {
        "dev": "nodemon index.js"
    },
 * 
 * 
 */


    /**
     * Para instalar las dependencias, dentro de la carpeta del proyecto con comandos DOS (npm) ejecuto:
     * npm init (cambio solo el nombre, autor..) //inicializa el package.json
     * npm install express // instala el servidor web
     * npm install --save-dev nodemon //solo en desarrollo, ya q reincia el servidor ante cada cambio en index.js
     */


    /***
     * Para levantar el servidor ejecuto por DOS en la carpeta el nombre del script, en este caso dev.
     * 
     * npm run dev
     * 
     */

    /****
     * Para tener la visual de HTML, instalo pug, lo necesito tambien en prod asiq va sin dev
     * 
     * npm install pug
     */