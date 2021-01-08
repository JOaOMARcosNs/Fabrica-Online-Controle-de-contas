const { json } = require("body-parser");
const Mongoose = require("mongoose");
const Usuario = Mongoose.model("Usuario");

class UsuarioController {
    static async buscarTodos(req, res) {
        try {
            res.status(200).json(await Usuario.find({}));
        } catch (error) {
            console.log("[USUARIOS] : BUSCAR TODOS => ERRO: " + error);
            res.status(500).send("Erro ao buscar usuarios");
        }
    }

    static async adicionar(req, res) {
        try {
            let usuarioNovo = req.body;
            res.status(200).json(await Usuario.create(usuarioNovo));
        } catch (error) {
            console.log("[USUARIOS] : ADICIONAR => ERRO: " + error);
            res.status(500).send("Erro ao adicionar usuarios");
        }
    }
    static async editar(req, res) {
        try {
            let usuarioEditar = req.body;
            res.status(200).json(await Usuario.findByIdAndUpdate(usuarioEditar._id, usuarioEditar));
        } catch (error) {
            console.log("[USUARIOS] : ADICIONAR => ERRO: " + error);
            res.status(500).send("Erro ao adicionar usuarios");
        }
    }


}

module.exports = UsuarioController;