import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res)=>{
    
    const promiseDB = [];
    promiseDB.push( Viaje.findAll({ limit: 3}) );
    promiseDB.push( Testimonial.findAll({ limit:3 }) );

    //consultar 3 viajes del modelo viaje
    try {
        //El siguiente código bloequea la ejecución en el 1er await
        //y luego vuelve a bloqear el código en el 2do await...
        //por eso se carga el promise...
        //                                //este limit sólo m trae 3 resultados
        //const viajes = await Viaje.findAll({ limit: 3});
        //const testimoniales = await Testimonial.findAll({ limit:3 });

        const resultado = await Promise.all( promiseDB );
        //el código se detiene una sola vez y en paralelo de ejecutan ambas consultas

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1],
        }) 
        
    } catch (error) {
        console.log(error);
    }


    
};

const paginaNosotros = (req, res) => {
    //res.send ('nosotros');
    //res.render('nosotros');
    const viajes = "Viaje a Alemania";
                        //le puedo pasar un objeto como 2do parámetro
    res.render('nosotros', {
        //viajes : viajes;
        pagina: 'Nosotros',
    });
};

const paginaContacto = (req, res) => {
    res.send ('contacto');
};

const paginaViajes = async (req, res) => {
    //consultar Base de datos... || https://sequelize.org/
    const viajes = await Viaje.findAll();
    //console.log(viajes);

    //pasar la info a la vista
    res.render ('viajes', {
        pagina: 'Próximos Viajes...',
        viajes,
    });
};

const paginaTestimoniales = async (req, res) => {
    //consultar la base de datos y mostrar los testimoniales...

    try {
        const testimoniales = await Testimonial.findAll();
        res.render ('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales,
    });        
    } catch (error) {
        console.log(error);
    }

};

//Muestra un viaje por su slug...
const paginaDetalleViaje = async (req, res) => {
    //console.log (req.params);
    //console.log (req.params.viaje);

    const { slug } = req.params;

    try {
                                            //{ where: { slug: slug } }); //significa donde slug = slug
        const resultado = await Viaje.findOne({ where: { slug } });

        res.render('viaje', {
            pagina: 'Inofmación Viaje',
            resultado,
        })

    } catch (error) {
        console.log(error)
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaContacto,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje,
}