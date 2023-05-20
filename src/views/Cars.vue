<template>
  <div class="cars">
    <cars-table 
      v-if="selectedCar===null"
      :cars="cars"
      @add="addCar()"
      @select="selectedCar = cars[$event]"
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
    components: {
      CarsTable,
      Car
    },
    methods: {
      addCar(){
        let newId = 1
        if (this.cars && this.cars.length > 0)
          newId = this.cars[this.cars.length - 1].id + 1
        axios({
          url: 'http://localhost:3000/api/records',
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
        this.refresh()
      },
      async refresh(){
        let resData = await axios({
          url: 'http://localhost:3000/api/records?table=cars',
          method: 'get'
        })

        this.cars = resData.data
      },
      dropData(){
        axios({
          url: 'http://localhost:3000/api/records',
          method: 'delete'
        })
        this.refresh()
      },
      selectCar(id){
        this.selectedCar=this.cars[id]
      },
      saveCar(car){
        this.selectedCar=null

        axios({
          url: `http://localhost:3000/api/records?id=${car.id}`,
          method: 'put',
          data:car
        })

        this.refresh()
      },
      revertCar(){
        this.selectedCar = null
        this.refresh()
      },
      deleteCar(carId){
        axios({
          url: `http://localhost:3000/api/records?id=${carId}`,
          method: 'delete'
        })
        this.refresh()
      }
    },
    mounted: function(){
      this.refresh()
    }
}
</script>

<style>
  .cars {
    text-align: center;
  }
</style>