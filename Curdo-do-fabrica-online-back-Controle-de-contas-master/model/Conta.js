const Mongoose = require("mongoose");

class Conta extends Mongoose.Schema {
    constructor() {
        super({
            descricao: {
                type: String,
                required: true
            },
            observacoes: {
                type: String,
                required: false
            },
            data: {
                type: Date,
                required: true
            },
            tipo: {
                type: String,
                enum: ["Receita", "Despesa"],
                required: true
            },
            valor: {
                type: Number,
                required: true
            },
        });

        Mongoose.model("Conta", this);
    }
}

module.exports = Conta;