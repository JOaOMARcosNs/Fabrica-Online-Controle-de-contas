const { ECANCELED } = require("constants");
const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");

const env = process.NODE_ENV || "development";
const config = require("./config.json")[env];

const Usuario = require("./model/Usuario");
const Conta = require("./model/Conta");

class App {
    constructor() {
        this.app
    }

    init() {
        this.app = Express();
        this.app.use(Express.json());
        this.app.use(Cors());


        Mongoose.connect(
            `${config.database.protocol}://${config.database.user}:${config.database.password}@${config.database.host}/${config.database.name}?retryWrites=true&w=majority`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
            }
        );

        new Usuario();
        new Conta();

        const UsuarioRoute = require("./route/UsuarioRoute");
        const ContaRoute = require("./route/ContaRoute");



        new UsuarioRoute(this.app);
        new ContaRoute(this.app);


        this.app.get("/", (req, res) => {
            res.send("Bem-vindo a API dp controle de conta HT");
        });

        this.app.listen(config.port, () => {
            console.log(`API fabrica online rodando da porta ${config.port}...`);
        })
    }
}

new App().init();