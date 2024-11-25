const Curso = require('../models/curso_model')

// Función asincrona para crear cursos
async function crearCurso(body){
    let curso = new Curso({
        titulo      : body.titulo,
        descripcion : body.descripcion,
        alumnos     : body.alumnos,
        calificacion: body.calificacion
    })
    return await curso.save()
}

// Función asincrónica para actualizar cursos
async function actualizarCurso(id, body){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo      : body.titulo,
            descripcion : body.descripcion
        }
    }, {new: true})
    return curso
}

// Función asíncrona para inactivar un objeto de tipo curso
async function desactivarCurso(id) {
    try {
        let curso = await Curso.findByIdAndUpdate(id,
            { 
                $set: { estado: false } 
            },{ new: true }
        );
        return curso
    } catch (error) {
        throw new Error('Error al intentar desactivar el curso: ' + error.message)
    }
}

// Función asíncrona para listar todos los cursos activos
async function listarCursosActivos() {
    let cursos = await Curso.find({"estado": true})
    return cursos
}

module.exports = {
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
}