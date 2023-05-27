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
    <div style="display:grid; grid-template-columns: repeat(auto-fit, 200px); justify-content: center; grid-gap: 30px; margin:20px">
        <input type="button" class="send" value="Сохранить изменения" @click="$emit('save',car)">
        <input type="button" class="send" value="Отменить изменения" @click="$emit('revert')">
    </div>

    <div v-show="false">
      <input type="file" name="photos" ref="photos" accept="image/*" multiple @change="filesUpload($event.target.files)"/>
    </div> 
    <div style="display:grid; grid-template-columns: repeat(auto-fit, 300px); justify-content: center;">
        <input type="button" value="Загрузить фото" @click="$refs.photos.click()"/>
    </div>

    <div v-if="!car.photos" style="display:grid; grid-template-columns: 1fr; justify-content: center; text-align: center;">
      <label>Ошибка при загрузке файлов</label>
      <input type="button" value="Повторить попытку" @click="getImages()">
    </div>
    <div v-if="!!car.photos && car.photos.length === 0" style="display:grid; grid-template-columns: 1fr; justify-content: center; text-align: center;">
      <label>Здесь ещё нет ни одной фотографии</label>
    </div>
    <div v-if="!!car.photos && car.photos.length > 0" class="image-box">
      <img v-for="(photo, photoId) in car.photos" :src="photo" style="width:100%; height:100%; object-fit: contain;" @click="clickedImageId=photoId">
    </div>
  </div>

  <modal-image v-if="!!clickedImage"
    :imageLink="clickedImage"
    @close="clickedImageId = null"
    @change="clickedImageId = changeImage($event)"
    @delete="deleteImage()"
  />
</template>

<script>
// @ is an alias to /src

import ObjectTable from '@/components/ObjectTable.vue'
import InputComponent from '@/components/input-component.vue'
import ModalImage from '@/components/ModalImage.vue'
import axios from 'axios'

export default {
  name: 'Car',
  components: {
    ObjectTable,
    InputComponent,
    ModalImage
  },
  data:function(){
    return {
      columns: [
        {key:'name',label:'Наименование операции',type:'text'},
        {key:'date',label:'Дата операции',type:'date'},
        {key:'value',label:'Оборот, руб.',type:'number'}
      ],
      clickedImageId: null
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
    clickedImage: function(){
      if (this.clickedImageId === null)
        return null

      return this.car.photos[this.clickedImageId]
    }
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
          
        })
        .catch((err) => {
          console.log(err)
        })
      
      await this.getImages()
    },
    getImages: async function(){
      const response = await axios({
        url: `/api/photo/getPhotos?id=${this.car.id}`,
        method: 'get'
      })

      if (response.status === 200){
        this.car.photos = response.data.photos
      }
      else{
        this.car.photos = null
        console.log(response.data)
      }
    },
    changeImage: function(mod){
      if (this.clickedImageId + mod < 0)
        return this.car.photos.length - 1
      if (this.clickedImageId + mod >= this.car.photos.length)
        return 0
      return this.clickedImageId + mod
    },
    deleteImage: async function(){
      const response = await axios({
        url: `/api/photo/delPhoto`,
        method: 'post',
        data: {
          path: this.clickedImage
        }
      })
      if (response.status !== 200)
        console.log(response)
      this.clickedImageId = null
      await this.getImages()
    }
  },
  mounted: async function(){
    await this.getImages()
  }
}
</script>

<style>
  .form-control {
    padding: 5px;
    display: block;
    width: 100%;
    justify-content: center;
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
        margin: 30px;
  }
  .image-box{
    width:100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 300px);
    grid-auto-rows: 150px;
    justify-content: center;
    column-gap: 30px;
  }
</style>