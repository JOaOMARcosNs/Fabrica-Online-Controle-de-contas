const { json } = require("body-parser");
const Mongoose = require("mongoose");
const Conta = Mongoose.model("Conta");

class ContaController {
    static async buscarTodos(req, res) {
        try {
            res.status(200).json(await Conta.find({}));
        } catch (error) {
            console.log("[CONTA] : BUSCAR TODOS => ERRO: " + error);
            res.status(500).send("Erro ao buscar contas");
        }
    }

    static async adicionar(req, res) {
        try {
            let contaNovo = req.body;

            res.status(200).json(await Conta.create(contaNovo));
        } catch (error) {
            console.log("[CONTA] : ADICIONAR => ERRO: " + error);
            res.status(500).send("Erro ao adicionar conta");
        }
    }
    static async deletar(req, res) {
        try {
            let idDeletar = req.params.id;
            console.log("ID DELETAR: " + idDeletar)

            res
                .status(200)
                .json(await Conta.findByIdAndDelete(idDeletar));
        } catch (error) {
            console.log("[CONTA] : DELETAR => ERRO: " + error);
            res.status(500).send("Erro ao deletar conta");
        }
    }


}

module.exports = ContaController;