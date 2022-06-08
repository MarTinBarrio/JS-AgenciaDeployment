
import { Testimonial } from "../models/Testimoniales.js";


const guardarTestimonial = async (req, res) => {
    //console.log(req.body);

    //Validar los campos ingresados...
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

            //trim elimina espacios en blanco al incio y al final
    if (nombre.trim()=== ''){
        //console.log('El nombre está vacío');
        errores.push({ mensaje: 'El nombre está vacío' });
    }
    if (correo.trim()=== ''){
        //console.log('El correo está vacío');
        errores.push({ mensaje: 'El correo está vacío' });
    }
    if (mensaje.trim()=== ''){
        //console.log('El mensaje está vacío');
        errores.push({ mensaje: 'El mensaje está vacío' });
    }


    //console.log(errores);
    if (errores.length > 0){

        //consultar testimoniales existentes para  q la pag no quede incompleta
        const testimoniales = await Testimonial.findAll();

        //mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            //errores: errores,
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales,
        })
    }else{ //almacenarlo en la base de datos...

        try {
            await Testimonial.create ({
                nombre,
                correo,
                mensaje
            })
            //luego del audate redirigo la pag...
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }

    }
}

export {guardarTestimonial}