import express from "express";
import { paginaInicio, paginaNosotros, paginaContacto, paginaViajes,
         paginaTestimoniales, paginaDetalleViaje } from '../controlers/paginasControler.js';

import { guardarTestimonial } from '../controlers/testimonialControler.js'

const router = express.Router();

//Express soporta todos los verbos, get, post, put, patch, y delete.
//hago q la app cargue la pag principal

/*
router.get ('/', (req, res)=>{  //req = lo q enviamos, res = lo q express nos responde
        //res.send('Hola Mundo'); //muestra algo estático
        res.render('inicio', {
        pagina: 'Inicio',
        }) //muestra una vista

    
      //res.json({
      //id: 1
      //});
});
*/

router.get ('/', paginaInicio);

//puedo cargar varias páginas...
router.get ('/nosotros', paginaNosotros);

router.get ('/contacto', paginaContacto);

router.get ('/viajes', paginaViajes);
router.get ('/viajes/:slug', paginaDetalleViaje);


router.get ('/testimoniales', paginaTestimoniales)
router.post ('/testimoniales', guardarTestimonial)

export default router;