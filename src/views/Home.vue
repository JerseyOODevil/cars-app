<template>
  <div class="home">
  <form @submit.prevent="sendData">
    <div class="form-control">
      <label for="name">Name</label>
      <input v-model="name" id="name" type="text">
    </div>
    <div class="form-control">
      <label for="email">Email</label>
      <input v-model="email" id="email" type="email">
    </div>
    <div class="form-control">
      <label for="address">Address</label>
      <input v-model="address" id="address" type="text">
    </div>
    <div class="form-control">
      <label for="gender">Gender</label>
      <span>Male <input v-model="gender" id="gender" type="radio" value="male"></span>
      <span>Female <input v-model="gender" id="gender" type="radio" value="female"></span>
    </div>
    <input type="submit" class="send" value="Send">
  </form>
  <form @submit.prevent="getData">
    <input type="submit" class="send" value="Отправить GET Запрос">
  </form>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';

export default {
  name: 'Home',
  components: {

  },
  data: function() {
    return {
      name: '',
      email: '',
      address: '',
      gender: ''
    }
  },
  methods: {
    async sendData(){
      console.log(await axios({
        url: 'http://localhost:3000/api/records/',
        method: 'post',
        data: {
          name: this.name,
          email: this.email,
          address: this.address,
          gender: this.gender
        }
      }));
    },
    async getData(){
      let params = {};
      for (let i of ['name', 'email', 'address', 'gender'])
        if (this[i])
          params[i] = this[i];
      let res = await axios({
        url: 'http://localhost:3000/api/records/',
        method: 'get',
        params: params
      });
      console.log(res);
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