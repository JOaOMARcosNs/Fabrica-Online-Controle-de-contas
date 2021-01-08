<template>
  <div>
    <!-- Formulario -->
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
        <div class="mb-4">Nova Conta</div>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Descrição"
              outlined
              v-model="contaAtual.descricao"
              hide-details
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              :items="tipo"
              label="Tipo"
              v-model="contaAtual.tipo"
              outlined
              hide-details=""
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Valor"
              outlined
              v-model="contaAtual.valor"
              hide-details
              type="number"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-menu
              ref="menuDataDialog"
              v-model="menuDataDialog"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dataFormatada"
                  label="Data"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  outlined
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="contaAtual.data"
                no-title
                @input="formatarDataMenu"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-textarea
              outlined
              label="Obserações"
              v-model="contaAtual.observacoes"
              hide-details
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-row justify="center" class="mb-3 mt-0">
          <v-btn color="success" @click="salvar" class="mx-1">Salvar</v-btn>
          <v-btn color="warning" @click="cancelar" class="mx-1">Cancelar</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>

    <!--lista de contas -->
    <v-data-table :headers="cabecalho" :items="contas" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Contas Cadrastadas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="abrirFormulario" v-if="!mostarForm"
            >Novo Conta</v-btn
          >
        </v-toolbar>
      </template>

      <template v-slot:body.append>
        <v-toolbar flat color="white">
          <v-toolbar-title>Balanço</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-card flat :class="balancoGeral >= 0 ? 'green--text' : 'red--text'"
            >R$ {{ balancoGeral }}</v-card
          >
        </v-toolbar>
      </template>

      <template v-slot:item.acoes="{ item }">
        <v-icon small class="mr-2" @click="detalhes(item)">
          mdi-magnify
        </v-icon>
        <v-icon small @click="excluir(item)"> mdi-trash-can </v-icon>
      </template>

      <template v-slot:item.tipo="{ item }">
        <div :class="item.tipo === 'Receita' ? 'green--text' : 'red-- =text'">
          {{ item.tipo }}
        </div>
      </template>

      <template v-slot:item.valor="{ item }"> R$ {{ item.valor }} </template>

      <template v-slot:no-data>
        <v-row justify="center">
          <v-subheader>Nem um conta cadastrado</v-subheader>
        </v-row>
      </template>
    </v-data-table>

    <!--janela de confirmacao-->>
    <v-dialog v-model="comfirmaExclusao" max-width="340" persistent>
      <v-card>
        <v-card-title class="headlinet"
          >Tem certeza que deseja excluir essa conta?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="cancelarExclusao"> Não </v-btn>

          <v-btn color="red darken-1" text @click="comfirmarExclusao">
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--janela de detalhes-->

    <v-dialog v-model="detalhesDialog" max-width="500">
      <v-card>
        <v-card-title class="headlinet">Detalhes da conta</v-card-title>
        <v-card-text>
          <div class="mb-4">Nova Conta</div>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Descrição"
                outlined
                :value="contaAtualDetalhe.descricao"
                hide-details
                disabled
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                :items="tipo"
                label="Tipo"
                :value="contaAtualDetalhe.tipo"
                outlined
                hide-details
                disabled
              ></v-select>
            </v-col>
          </v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Valor"
              outlined
              :value="contaAtualDetalhe.valor"
              hide-details
              type="number"
              disabled
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Data"
              outlined
              :value="contaAtual.conta"
              hide-details
              disabled
            >
            </v-text-field>
          </v-col>
          <v-row> </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Obserações"
                :value="contaAtual.observacoes"
                hide-details
                disabled
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="detalhesDialog = false"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DateFormatterUtil from "@/util/DateFormatterUtil";
import ContaHttpUtil from "./../util/ContaHttpUtil";
export default {
  data() {
    return {
      mostarForm: false,
      contaAtual: {},
      menuDataDialog: false,
      dataFormatada: "",
      comfirmaExclusao: false,
      detalhesDialog: false,
      contaAtualDetalhe: {
        valor: 0,
        data: "",
      },
      contaExcluir: null,
      tipo: ["Receita", "Despesa"],
      balancoGeral: 0,
      cabecalho: [
        {
          text: "Descrições",
          value: "descricao",
        },

        {
          text: "Tipo",
          value: "tipo",
        },

        {
          text: "Valor",
          value: "valor",
        },
        {
          text: "Data",
          value: "data",
        },

        {
          text: "Ações",
          value: "acoes",
          sortable: false,
        },
      ],
      contas: [],
    };
  },
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      ContaHttpUtil.buscarTodos().then((contas) => {
        this.contas = contas;
        this.calcularBalanco();
      });
    },

    salvar() {
      let contaNova = {};
      Object.assign(contaNova, this.contaAtual);
      contaNova.valor = parseFloat(contaNova.valor);

      ContaHttpUtil.adicionar(contaNova).then((resposta) => {
        if (resposta == 200) {
          this.initialize();
          this.cancelar();
        }
      });
    },

    excluir(conta) {
      this.comfirmaExclusao = true;
      this.contaExcluir = conta;
    },

    comfirmarExclusao() {
      ContaHttpUtil.deletar(this.contaExcluir).then((resposta) => {
        if (resposta === 200) {
            alert("Erro ao excluir conta!");
            this.initialize();
            this.comfirmaExclusao = false;
        } else {
          alert("Conta excluida com sucesso!");
        }
      });
    },

    cancelarExclusao() {
      this.comfirmaExclusao = false;
      this.cancelar();
    },

    cancelar() {
      this.mostarForm = false;
      this.contaAtual = {};
      this.contaExcluir = null;
    },

    abrirFormulario() {
      this.mostarForm = true;
    },

    detalhes(conta) {
      this.detalhesDialog = true;
      this.contaAtualDetalhe = conta;
    },

    calcularBalanco() {
      this.balancoGeral = 0;
      this.contas.forEach((conta) => {
        if (conta.tipo === "Receita") {
          this.balancoGeral += conta.valor;
        } else {
          this.balancoGeral -= conta.valor;
        }
      });
    },

    formatarDataMenu() {
      this.dataFormatada = DateFormatterUtil.ISOtoBR(this.contaAtual.data);
      this.menuDataDialog = false;
    },

    formatarData(data) {
      return this.dataFormatada.ISOtoBR(data);
    },
  },
};
</script>

<style>
</style>
