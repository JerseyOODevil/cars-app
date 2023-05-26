<template>
  <div class="cars">
    <cars-table 
      v-if="selectedCar===null"
      :cars="carsList"
      @add="addCar()"
      @select="selectCar($event)"
      @delete="deleteCar($event)"
    />

    <car 
      v-if="selectedCar!==null"
      :car="selectedCar"
      @save="saveCar($event)"
      @revert="revertCar()"
    />
    
  </div>

  
</template>

<script>
  import axios from 'axios'
  import CarsTable from '@/components/CarsTable.vue'
  import Car from '@/components/Car.vue'


  export default {
    name: "Cars",
    data: function(){
      return {
        carsList: [],
        selectedCar: null
      }
    },
    computed:{
      revCars:function(){
        let newArr = [].concat(this.cars).reverse()
        return newArr
      }
    },
    components: {
      CarsTable,
      Car
    },
    methods: {
      addCar: function(){
        this.selectedCar = {
          id: null,
          model: null,
          buildYear: null,
          operations: []
        }
      },
      selectCar: async function(carId){
        const response = await axios({
          url: `/api/MySQL/getCar?id=${carId}`,
          method: 'get'
        })
        
        if (response.status === 200){
          const responseImg = await axios({
            url: `/api/photos/getPhotos?id=${response.data.id}`,
            method: 'get'
          })
          if (responseImg.status === 200){
            this.selectedCar = response.data
            this.selectedCar.photos = responseImg.data.photos
            console.log(this.selectedCar.photos)
          }
          else
            console.log(responseImg.data)
        }
        else
          for (err in response.data)
            console.log(err)
        
      },
      getCars: async function(){
        let resData = await axios({
          url: '/api/MySQL/getCarsList',
          method: 'get'
        })
        
        this.carsList = resData.data
      },
      saveCar: async function(car){
        this.selectedCar=null

        console.log(await axios({
          url: `/api/MySQL/updateCar`,
          method: 'post',
          data: car
        }))

        await this.getCars()
      },
      revertCar: async function(){
        this.selectedCar = null
        await this.getCars()
      },
      deleteCar: async function(carId){
        await axios({
          url: `/api/MySQL/deleteCar?id=${carId}`,
          method: 'delete'
        })
        await this.getCars()
      }
    },
    mounted: async function(){
      await this.getCars()
    }
}
</script>

<style>
  .cars {
    width: 100%;
    display: block;
  }
</style>