<template>
  <div class="home">
    <label>{{ `Баланс: ${balance}` }}</label>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';
import ObjectTable from '@/components/ObjectTable.vue'

export default {
  name: 'Home',
  components: {
    ObjectTable
  },
  data: function() {
    return {
      cars:[]
    }
  },
  computed:{
    balance: function(){
      let res = 0

      for(let car of this.cars){
        for (let op of car.operations){
          res += Number(op.value)
        }
      }
      return res
    }
  },
  methods:{
    refresh: async function(){
      let resData = await axios({
        url: '/api/records',
        method: 'get'
      })
      this.cars=resData.data
    }
  },
  mounted:function(){
    this.refresh()
  }
}
</script>

<style>
  .home {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>