<template>
  <div class="form-control">
    <div style="display:block; max-width: 500px;">
      <input-component v-bind="{id:'model', name:'Модель авто', type:'text', value:car.model }" @edit="car.model = $event"/>
      <input-component v-bind="{id:'buildYear', name:'Год выпуска', type:'number', value:car.buildYear}" @edit="car.buildYear=$event"/>
    </div>
    <object-table class="table" id="Table" 
      v-bind="{columns:this.columns,array:this.car.operations}"
      @edit="editOperations($event)"
      @delete="deleteOperation($event)"
    />
    <div style="display:block;">
      <input type="button" class="send" value="Сохранить изменения" @click="$emit('save',car)">
      <input type="button" class="send" value="Отменить изменения" @click="$emit('revert')">
    </div>
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
        {key:'name',label:'Наименование операции',type:'text'},
        {key:'date',label:'Дата операции',type:'date'},
        {key:'value',label:'Оборот, руб.',type:'number'}
      ]
    }
  },
  props:{
    car: Object
  },
  methods:{
    editOperations(op){
      this.car.operations=op
    },
    deleteOperation(id){
      this.car.operations.splice(id,1)
    }
  }
}
</script>

<style>
  .form-control {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  } 
  .table {
    margin: 5px;
    padding: 10px;
    display: inline-block;
  }
  .send {
    margin: 5px;
    padding: 10px;
    display: inline-block;
  }
</style>