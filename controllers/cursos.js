const express = require('express');
const logic = require('../logic/curso_logic')
const ruta = express.Router()

// Endpoint de tipo POST para crear usuarios
ruta.post('/', (req, res)=>{
    let resultado = logic.crearCurso(req.body)

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

// Endpoint de tipo PUT para el recurso CURSOS
ruta.put('/:id', (req, res) => {
    let resultado = logic.actualizarCurso(req.params.id, req.body)
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
})

// Endpoint de tipo DELETE para desactivar datos del curso
ruta.delete('/:id', async (req, res) => {
    try {
        let curso = await logic.desactivarCurso(req.params.id)
        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' })
        }
        res.json(curso)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//Endpoint de tipo GET para el recurso curso
ruta.get('/', (req, res)=>{
    let resultado = logic.listarCursosActivos()

    resultado.then( cursos => {
        res.json(cursos)
    }).catch( err => {
        res.status(400).json({
            err
        })
    })
})

module.exports = ruta