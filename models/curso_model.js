const mongose = require('mongoose')

const cursoSchema = new mongose.Schema({
    titulo: {
        type:String,
        required: true
    },
    descripcion: {
        type:String,
        required: true
    },
    estado: {
        type:Boolean,
        default: true
    },
    imagen: {
        type:String,
        required: false
    },
    alumnos: {
        type:Number,
        default: 0
    },
    calificacion: {
        type:Number,
        default: 0
    }
})

module.exports = mongose.model('Curso', cursoSchema)