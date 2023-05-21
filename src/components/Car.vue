<template>
  <div class="form-control">
    <div style="display:block; max-width: 500px;">
      <input-component v-bind="{id:'model', name:'Модель авто', type:'text', value:car.model }" @edit="car.model = $event"/>
      <input-component v-bind="{id:'buildYear', name:'Год выпуска', type:'number', value:car.buildYear}" @edit="car.buildYear=$event"/>
    </div>
    <div style="display:block; max-width: 500px;">
      <label>{{ `Доход: ${plus} руб.` }}</label><br/>
      <label>{{ `Расход: ${minus} руб.` }}</label><br/>
      <label>{{ `Прибыль: ${plus - minus} руб.` }}</label><br/>
      <br/>
      <label>{{ `Дней в работе: ${daysCount}` }}</label><br/>
      <label>{{ `Доход в день: ${Math.round((plus - minus)*100/daysCount)/100} руб.` }}</label><br/>
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
  computed:{
    buyDate: function(){
      if (this.car.operations.length === 0)
        return null
      for (let op of this.car.operations)
        if (String(op.name).toUpperCase() === 'ПОКУПКА')
          return new Date(op.date)
    },
    sellDate: function(){
      if (this.car.operations.length === 0)
        return null
      for (let op of this.car.operations)
        if (String(op.name).toUpperCase() === 'ПРОДАЖА')
          return new Date(op.date)
    },
    daysCount: function(){
      if (this.buyDate && this.sellDate)
        return Math.floor((this.sellDate - this.buyDate)/1000/3600/24) + 1
      else
        return null
    },
    plus: function(){
      return this.car.operations.reduce((acc, cur) => {
        if (Number(cur.value) > 0)
          return acc + Number(cur.value)
        else
          return acc
      },0)
    },
    minus: function(){
      return 0 - this.car.operations.reduce((acc, cur) => {
        if (Number(cur.value) < 0)
          return acc + Number(cur.value)
        else
          return acc
      },0)
    },
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