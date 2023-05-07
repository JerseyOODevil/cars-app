<template>
  <div class="car">
  <form @submit.prevent="sendData">
    <div class="form-control">
      <label for="model">Модель авто</label>
      <input v-model="model" id="model" type="text">
    </div>
    <div class="form-control">
      <label for="buildYear">Год выпуска</label>
      <input v-model="buildYear" id="buildYear" type="number">
    </div>
    <div class="form-control">
      <label for="buyPrice">Цена покупки</label>
      <input v-model="buyPrice" id="buyPrice" type="number">
    </div>
    <div class="form-control">
      <label for="sellPrice">Цена продажи</label>
      <input v-model="sellPrice" id="sellPrice" type="number">
    </div>
    <vueTable v-bind="createTable()"></vueTable>
    <input type="submit" class="send" v-bind:value="checkParams()">
  </form>
  <form @submit.prevent="getData">
    <input type="submit" class="send" value="Отправить GET Запрос">
  </form>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';
import vueTable from '@/components/table.vue'

console.log();

export default {
  name: 'Car',
  components: {
    vueTable
  },
  data: function() {
    return {
      model: '',
      buildYear: null,
      buyPrice: null,
      sellPrice: null,
      operations: []
    }
  },
  methods: {
    // async sendData(){
    //   console.log(await axios({
    //     url: 'http://localhost:3000/api/records/',
    //     method: 'post',
    //     data: {
    //       name: this.name,
    //       email: this.email,
    //       address: this.address,
    //       gender: this.gender
    //     }
    //   }));
    // },
    // async getData(){
    //   let params = {};
    //   for (let i of ['name', 'email', 'address', 'gender'])
    //     if (this[i])
    //       params[i] = this[i];
    //   let res = await axios({
    //     url: 'http://localhost:3000/api/records/',
    //     method: 'get',
    //     params: params
    //   });
    //   console.log(res);
    // },
    checkParams() {
      console.log(this.$route.query);
      return 'send'
    },
    createTable(){
      return {
        header: {
          name: 'Наименование операции',
          value: 'Оборот, руб.'
        },
        data: this.operations
      }
    }
  }
}
</script>

<style>
  .form-control {
    padding: 5px;
  } 
  .form-control label {
    display: block;
  }
  .send {
    margin: 5px
  }
</style>