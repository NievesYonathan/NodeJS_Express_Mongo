const express = require('express')
const Joi = require('@hapi/joi')
const Usuario = require('../models/usuario_model')
const ruta = express.Router()

// Validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóú ]{3,30}$/),

    password: Joi.string()
        .pattern(/^[A-Za-záéíóú]{3,30}$/),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co']}})
})

// Función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(body) {
    let usuario = new Usuario({
        email       : body.email,
        nombre      : body.nombre,
        password    : body.password
    })
    return await usuario.save()
}

//Endpoint de tipo POST para el recurso USUARIOS
ruta.post('/', (req, res)=>{
    let body = req.body

    const {error, value} = schema.validate({nombre: body.nombre, email: body.email})
    if(!error){
        let resultado = crearUsuario(body)

        resultado.then( user => {
            res.json({
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        })
    }else{
        res.status(400).json({
            error
        })
    }
})

// Función asíncrona para actualizar un objeto de tipo usuario
async function actualizarUsuario(email, body) {
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            nombre: body.nombre,
            password: body.password
        }
    }, {new: true})
    return usuario
}

//Endpoint de tipo PUT para actualizar datos del USUARIO
ruta.put('/:email', (req, res)=>{
    const {error, value} = schema.validate({nombre: req.body.nombre})
    if(!error){
        let resultado = actualizarUsuario(req.params.email, req.body)

        resultado.then( user => {
            res.json({
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        })
    }else{
        res.status(400).json({
            error
        })
    }
})

// Función asíncrona para inactivar un objeto de tipo usuario
async function desactivarUsuario(email) {
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            estado: false
        }
    }, {new: true})
    return usuario
}

//Endpoint de tipo DELETE para desactivar datos del USUARIO
ruta.delete('/:email', (req, res)=>{
    let resultado = desactivarUsuario(req.params.email)

    resultado.then( valor => {
        res.json({
            usuario: valor
        })
    }).catch( err => {
        res.status(400).json({
            err
        })
    })
})

// Función asíncrona para listar todos los usuarios activos
async function listarUsuariosActivos() {
    let usuario = await Usuario.find({"estado": true})
    return usuario
}

//Endpoint de tipo GET para el recurso USUARIO
ruta.get('/', (req, res)=>{
    let resultado = listarUsuariosActivos()

    resultado.then( usuarios => {
        res.json(usuarios)
    }).catch( err => {
        res.status(400).json({
            err
        })
    })
})

module.exports = ruta