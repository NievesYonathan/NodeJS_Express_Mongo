const mongose = require('mongoose')

const usuarioSchema = new mongose.Schema({
    email: {
        type:String,
        required: true
    },
    nombre: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    estado: {
        type:Boolean,
        required: true
    },
    imagen: {
        type:String,
        required: false
    },
})

module.exports = mongose.model('Usuario', usuarioSchema)