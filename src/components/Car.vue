<template>
  <div class="form-control">
    <div style="display:grid; grid-template-columns: repeat(auto-fit, 250px); grid-gap: 40px; justify-content: center; width:100%">
      <input-component v-bind="{id:'model', name:'Модель авто', type:'text', value:car.model }" @edit="car.model = $event"/>
      <input-component v-bind="{id:'buildYear', name:'Год выпуска', type:'number', value:car.buildYear}" @edit="car.buildYear=$event"/>
    </div>
    <div class="label-box">
      <div style="text-align: center;">
        <label>{{ `Доход: ${plus} руб.` }}</label><br/>
        <label>{{ `Расход: ${minus} руб.` }}</label><br/>
        <label>{{ `Прибыль: ${plus - minus} руб.` }}</label><br/>
      </div>
      <div v-if="daysCount!==null" style="text-align: center;">
        <label>{{ `Дней в работе: ${daysCount}` }}</label><br/>
        <label>{{ `Доход в день: ${Math.round((plus - minus)*100/daysCount)/100} руб.` }}</label>
      </div>
    </div>
    <object-table id="Table" 
      v-bind="{columns:this.columns,array:this.car.operations}"
      @edit="this.car.operations=$event"
      @delete="this.car.operations[$event].deleted = true"
      @restore="car.operations[$event].deleted = false"
    />
    <div style="display:grid; grid-template-columns: repeat(auto-fit, 200px); justify-content: center; grid-gap: 30px;">
        <input type="button" class="send" value="Сохранить изменения" @click="$emit('save',car)">
        <input type="button" class="send" value="Отменить изменения" @click="$emit('revert')">
    </div>
    <form v-show="false"
      ref='uploadForm' 
      id='uploadForm' 
      action='/api/photos/uploadPhotos'
      method='post' 
      encType='multipart/form-data'
    >
        <input type="file" name="photos" ref="photos" @change="filesUpload($event.target.files)"/>
    </form>  
    <div style="display:grid; grid-template-columns: repeat(auto-fit, 300px); justify-content: center;">
        <input type="button" value="Загрузить фото" @click="$refs.photos.click()"/>
    </div>
    <div style="display:grid; grid-template-columns: repeat(auto-fit, 300px); justify-content: center;">
      <img v-for="photo in car.photos" :src="photo" style="width:100%">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import ObjectTable from '@/components/ObjectTable.vue'
import InputComponent from '@/components/input-component.vue'
import axios from 'axios'

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
    filesUpload: async function(files){
      let fd = new FormData()
      for (let i in files){
        fd.append(`file[${i}]`, files[i])
      }
      
      await axios.post(`/uploadPhotos?id=${this.car.id}`,fd,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getImages: async function(){
      
    }
  }
}
</script>

<style>
  .form-control {
    padding: 5px;
    display: block;
    width: 100%;
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
  .label-box{
        width:100%;
        display:grid;
        grid-template-columns: repeat(auto-fit, 250px);
        justify-content: center;
  }
</style>