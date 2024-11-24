const express = require('express');
const Curso = require('../models/curso_model')
const ruta = express.Router()

// Función asincrona para crear cursos
async function crarCurso(body){
    let curso = new Curso({
        titulo      : body.titulo,
        descripcion : body.descripcion,
        alumnos     : body.alumnos,
        calificacion: body.calificacion
    })
    return await curso.save()
}

ruta.post('/', (req, res)=>{
    let resultado = crarCurso(req.body)

    resultado.then( curso => {
        res.json({
            curso 
        })
    }).catch( err => {
        res.status(400).json({
            err
        })
    })
})

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

// Endpoint de tipo PUT para el recurso CURSOS
ruta.put('/:id', (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body)
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
})

module.exports = ruta