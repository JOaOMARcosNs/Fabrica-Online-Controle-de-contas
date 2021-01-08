<template>
  <div>
    <v-card class="my-9 mx-auto" width="50%" v-if="mostarForm">
      <v-btn
        absolute
        dark
        fab
        top
        right
        color="red"
        @click="mostarForm = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-container>
        <div class="mb-4">{{ formTitulo }}</div>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Nome" outlined v-model="usuarioAtual.nome">
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="E-mail"
              outlined
              v-model="usuarioAtual.email"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Username"
              outlined
              v-model="usuarioAtual.username"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Senha"
              outlined
              v-model="usuarioAtual.senha"
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-row justify="center">
          <v-btn color="success" @click="salvar" class="mx-1">Salvar</v-btn>
          <v-btn color="warning" @click="cancelar" class="mx-1">Cancelar</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>

    <v-data-table :headers="cabecalho" :items="usuarios" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Usuários Cadastrados</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="abrirFormulario" v-if="!mostarForm"
            >Novo Usuário</v-btn
          >
        </v-toolbar>
      </template>

      <template v-slot:item.acoes="{ item }">
        <v-icon small class="mr-2" @click="editar(item)"> mdi-pencil </v-icon>
        <v-icon small @click="ativarInativar(item)">
          {{ item.ativo ? "mdi-cancel" : "mdi-check-bold" }}
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-subheader>Nem um usuário cadastrado</v-subheader>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import UsuarioHttpUtil from "./../util/UsuarioHttpUtil";

export default {
  data: () => ({
    itemEdicao: null,
    usuarios: [],
    usuarioAtual: {},
    mostarForm: false,
    cabecalho: [
      {
        text: "Nome",
        value: "nome",
      },
      {
        text: "Username",
        value: "username",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Ações",
        value: "acoes",
      },
    ],
  }),

  computed: {
    formTitulo() {
      return this.itemEdicao === null ? "Novo usuário" : "Editar Usuário";
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      UsuarioHttpUtil.buscarTodos().then((usuarios) => {
        this.usuarios = usuarios;
      });
    },

    abrirFormulario() {
      this.mostarForm = true;
    },

    ativarInativar(usuario) {
      if (confirm("Rem certeza que deseja mudar o status desse usuário?")) {
        usuario.ativo = !usuario.ativo;
        UsuarioHttpUtil.editar(usuario).then((resposta) => {
          if (resposta.status == 200) {
            alert("Status do usuário alterado com sucesso!");
          } else {
            alert("Erro ao alterar statudo usuário!");
          }
        });
      }
    },

    salvar() {
      if (this.itemEdicao == null) {
        this.adicionar();
      } else {
        this.salvarEdicao();
      }
      this.mostarForm = false;
      this.cancelar();
    },

    editar(usuario) {
      let usuarioCopia = {};
      Object.assign(usuarioCopia, usuario);
      this.itemEdicao = usuarioCopia;
      this.usuarioAtual = usuarioCopia;
      this.mostarForm = true;
    },

    adicionar() {
      let usuarioCopia = {};
      Object.assign(usuarioCopia, this.usuarioAtual);
      usuarioCopia.ativo = true;

      UsuarioHttpUtil.adicionar(usuarioCopia).then((resposta) => {
        if (resposta.status == 200) {
          alert("Usuário Cadastrado com Sucesso!");
          this.initialize();
        } else {
          alert("Erro ao Cadastrar Usuário!");
        }
      });
    },

    salvarEdicao() {
      UsuarioHttpUtil.editar(this.itemEdicao).then((resposta) => {
        if (resposta.status == 200) {
          alert("Usuário editado com Sucesso!");
          this.initialize();
        } else {
          alert("Erro ao editar usuário!");
        }
      });
    },

    cancelar() {
      this.usuarioAtual = {};
      this.itemEdicao = null;
    },
  },
};
</script>

<style>
</style>
