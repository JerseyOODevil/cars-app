<template>
  <div class="cars">
    <cars-table 
      v-if="selectedCar===null"
      :cars="revCars"
      @add="addCar()"
      @select="selectedCar = $event"
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
        cars: [],
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
      addCar: async function(){
        let newId = 1
        if (this.cars && this.cars.length > 0)
          newId = this.cars[this.cars.length-1].id + 1
        await axios({
          url: '/api/records',
          method: 'post',
          data: {
            id:newId,
            table:'cars',
            model: null,
            buildYear: null,
            operations: [],
            photos:[]
          }
        })
        await this.getCars()
      },
      getCars: async function(){
        let resData = await axios({
          url: '/api/records?table=cars',
          method: 'get'
        })
        this.cars = resData.data
      },
      saveCar: async function(car){
        this.selectedCar=null

        await axios({
          url: `/api/records?id=${car.id}`,
          method: 'put',
          data:car
        })

        await this.getCars()
      },
      revertCar: async function(){
        this.selectedCar = null
        await this.getCars()
      },
      deleteCar: async function(carId){
        await axios({
          url: `/api/records?id=${carId}`,
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
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>