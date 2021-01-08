const API_URL = "http://localhost:3000/usuarios";


import axios from "axios";

export default {
    async buscarTodos() {
        return axios.get(API_URL).then((response) => response.data)

    },

    async adicionar(usuario) {
        return axios.post(API_URL, usuario).then((response) => response)

    },

    async editar(usuario) {
        return axios.put(API_URL, usuario).then((response) => response)

    },
};