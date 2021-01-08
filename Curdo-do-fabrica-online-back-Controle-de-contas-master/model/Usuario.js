const Mongoose = require("mongoose");

class Usuario extends Mongoose.Schema {
    constructor() {
        super({
            username: {
                type: String,
                required: true
            },
            nome: {
                type: String,
                required: true
            },
            senha: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            ativo: {
                type: Boolean,
                required: true
            },
        });

        Mongoose.model("Usuario", this);
    }
}

module.exports = Usuario;