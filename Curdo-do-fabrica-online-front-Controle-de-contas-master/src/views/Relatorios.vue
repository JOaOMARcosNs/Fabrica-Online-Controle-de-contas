<template>
  <div>
    <v-container>
      <v-card color="grey" dark>
        <v-card-title>Blaço do Ano</v-card-title>
      </v-card>
      <v-card class="mt-4 mx-auto" color="blue">
        <v-sparkline
          :labels="rotolos"
          :value="valores"
          color="white"
          line-width="1"
          padding="20"
        ></v-sparkline>
      </v-card>

      <v-card color="green" class="my-4" dark>
        <v-card-title>Total Receitas: {{ totalReceitas }} </v-card-title>
      </v-card>

      <v-card color="red" class="my-4" dark>
        <v-card-title>Total Despesas: {{ totalDespesas }} </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import ContaHttpUtil from "./../util/ContaHttpUtil";
export default {
  data: () => ({
    totalDespesas: 0,
    totalReceitas: 0,
    rotolos: [],
    valores: [],
    contas: [],
    mesAbrev: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Out",
      "Set",
      "Nov",
      "Dez",
    ],
  }),

  created() {
    this.buscarContas();
  },

  methods: {
    initialize() {
      let hoje = new Date().toISOString().slice(0, 10);

      let ano = hoje.slice(0, 4);
      let mes = hoje.slice(5, 7);

      this.rotolos = this.mesAbrev.slice(0, parseInt(mes));
      this.valores = new Array(parseInt(mes)).fill(0);

      this.contas.forEach((conta) => {
        if (ano == conta.data.slice(0, 4)) {
          let mesConta = parseInt(conta.data.slice(5, 7));

          if (conta.tipo === "Receita") {
            this.valores[mesConta - 1] += conta.valor;
          } else {
            this.valores[mesConta - 1] += conta.valor * -1;
          }
        }

        if (conta.tipo === "Receita") {
          this.totalReceitas += conta.valor;
        } else {
          this.totalDespesas += conta.valor;
        }
      });
    },

    buscarContas() {
      ContaHttpUtil.buscarTodos().then((contas) => {
        this.contas = contas;
        this.initialize();
      });
    },
  },
};
</script>

<style>
</style>