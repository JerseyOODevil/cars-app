<template>
  <div style="display:block;">
    <div style="display: grid; grid-template-columns: 1fr 500px 1fr; width: 100%;">
      <div style="display:block; grid-column-start:2">
        <object-table
          :array="operations"
          :columns="columns"
          @add="addOperation()"
          @edit="operations = $event"
          @delete="operations[$event].deleted = true"
          @restore="operations[$event].deleted = false"
        />
      </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit,300px); justify-content: center; width: 100%;">
      <input type="button" value="Сохранить изменения" @click="save()">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';
import ObjectTable from '@/components/ObjectTable.vue'

export default {
  name: 'Operations',
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

</style>