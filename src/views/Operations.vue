<template>
  <div class="home">
    <object-table
      :array="opCar.operations"
      :columns="columns"
      @add="addOperation()"
      @edit="editOperation($event)"
      @delete="deleteOperation($event)"
    />
    <input type="button" value="Сохранить изменения" @click="save()">
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
      opCar:{},
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
        url: '/api/records?table=operations',
        method: 'get'
      })

      if (resData.data.length === 0){
        //Если записей об операциях нет, то создаёт запись в БД
        await axios({
          url: '/api/records',
          method: 'post',
          data:{
            id: 0,
            table: 'operations',
            operations: []
          }
        })
      }
      else
        this.opCar=resData.data[0]
    },
    addOperation(){
      let newId = 1
      if (this.opCar.operations.length > 0)
        newId = this.opCar.operations[this.opCar.operations.length-1].id + 1
      this.opCar.operations.push({
        id: newId,
        name: null,
        date: null,
        value: null
      })
    },
    editOperation(opArray){
      this.opCar.operations = opArray
    },
    deleteOperation(rowId){
      this.opCar.operations.splice(rowId, 1)
    },
    async save(){
      await axios({
        url: `/api/records?id=${this.opCar.id}`,
        method: 'put',
        data: this.opCar
      })
      await this.refresh()
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
    width: 100%;
    height: auto;
  }
</style>