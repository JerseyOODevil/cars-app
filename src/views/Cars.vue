<template>
  <div class="Cars">
    <input type="submit" value="Drop database" @click="dropData()">
    <input type="submit" value="Check data" @click="this.refresh()">
    <input type="submit" value="Save data" @click="save()">
    
    <cars-table :cars="cars" @add="addCar()"/>
    
  </div>

  
</template>

<script>
  import axios from 'axios'
  import CarsTable from '@/components/CarsTable.vue'

  export default {
    name: "Cars",
    data: function(){
      return {
        cars: []
      }
    },
    components: {
      CarsTable
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
            model: null,
            buildYear: null,
            operations: []
          }
        })
        this.refresh()
      },
      async refresh(){
        let resData = await axios({
          url: 'http://localhost:3000/api/records',
          method: 'get'
        })

        this.cars = resData.data
      },
      dropData(){
        axios({
          url: 'http://localhost:3000/api/records',
          method: 'delete'
        })
      }
    },
    mounted: function(){
      this.refresh()
    }
}
</script>

<style>
  div {
    text-align: center;
  }
</style>