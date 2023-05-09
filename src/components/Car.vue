<template>
  <div class="form-control">
    <input-component v-model:value="this.model" v-bind="{id:'model', name:'Модель авто', type:'text'}"></input-component>
    <input-component v-model:value="this.buildYear" v-bind="{id:'buildYear', name:'Год выпуска', type:'number'}"></input-component>
    <object-table id="Table" v-bind="{columns:this.columns,array:this.operations}"></object-table>
    <input type="submit" class="send" value="Сохранить изменения">
    <input type="submit" class="send" value="Отправить GET Запрос">
  </div>
</template>

<script>
// @ is an alias to /src

import ObjectTable from '@/components/ObjectTable.vue'
import InputComponent from '@/components/input-component.vue'

export default {
  name: 'Car',
  components: {
    ObjectTable,
    InputComponent
  },
  data:function(){
    return {
      columns: [
        {key:'name',label:'Наименование операции'},
        {key:'date',label:'Дата операции'},
        {key:'value',label:'Оборот, руб.'}
      ]
    }
  },
  props:{
    model: String,
    buildYear: Number,
    operations: Array
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
    margin: 5px;
    padding: 10px;
  }
</style>