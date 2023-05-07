<template>
  <div class="Trunc">
    <form @submit.prevent="dropData">
      <input type="submit" value="Drop database">
    </form>
    <div>
      <vueTable id="Table" v-bind="getTableData()"></vueTable>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import vueTable from '@/components/table.vue'

  export default {
    name: "Trunc",
    components: {
      vueTable
    },
    methods: {
      async dropData(){
        console.log(await axios({
          url: 'http://localhost:3000/api/records/',
          method: 'delete'
        }))
      },
      getTableData(){
        return {header:{a:'a',b:'b',c:'c'}, data: [{id:800,a:1,b:2,c:3},{id:900,a:4,b:5,c:6}]}
      }
    }
  }
</script>

<style>
  div {
    text-align: center;
  }
</style>