<template>
  <div style="display: grid; grid-template-columns: 1fr 400px 1fr; width: 100%;">
    <object-table style="grid-column-start: 2; grid-row-start: 1;"
      :array="operations"
      :columns="columns"
      @add="addOperation()"
      @edit="operations = $event"
      @delete="operations[$event].deleted = true"
      @restore="operations[$event].deleted = false"
    />
    <div style="grid-column-start: 2; grid-row-start: 2; justify-self: center;">
      <input type="button" value="Сохранить изменения" @click="save()">
    </div>
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
      operations:{},
      columns: [
        {key:'name',label:'Наименование операции',type:'text'},
        {key:'date',label:'Дата операции',type:'date'},
        {key:'value',label:'Оборот, руб.',type:'number'}
      ]
    }
  },
  methods:{
    refresh: async function(){
      let resData = await axios({
        url: '/api/MySQL/getOperations',
        method: 'get'
      })
      if (resData.status === 200)
        this.operations = resData.data
      else
        console.log(resData.data)
    },
    addOperation: function(){
      this.operations.push({
        id: null,
        name: null,
        date: null,
        value: null
      })
    },
    save: async function(){
      await axios({
        url: `/api/MySQL/updateOperations`,
        method: 'post',
        data: this.operations
      })
      await this.refresh()
    }
  },
  mounted:async function(){
    await this.refresh()
  }
}
</script>

<style>
  .table {
    margin: 5px;
    padding: 10px;
    display: inline-block;
  }
</style>