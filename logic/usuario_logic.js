const Usuario = require('../models/usuario_model')
const Joi = require('@hapi/joi')

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

// Función asíncrona para inactivar un objeto de tipo usuario
async function desactivarUsuario(email) {
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            estado: false
        }
    }, {new: true})
    return usuario
}

// Función asíncrona para listar todos los usuarios activos
async function listarUsuariosActivos() {
    let usuario = await Usuario.find({"estado": true})
    return usuario
}

module.exports = {
    schema,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos
}