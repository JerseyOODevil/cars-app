<template>
  <div class="Trunc">
    <input type="submit" value="Drop database" @click="dropData()">
    <input type="submit" value="Check data" @click="console.log(this.array)">
    <input type="submit" value="Save data" @click="save()">
    <div>
      <cars-table id="Table" v-bind="{array:this.array}" @add="addCar($event)" @edit="editCar($event)" @delete="deleteCar($event)"></cars-table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import CarsTable from '@/components/CarsTable.vue'

  export default {
    name: "Trunc",
    data: function(){
      return {
        array:[]
      }
    },
    components: {
      CarsTable
    },
    methods: {
      async getDataFromDB(){
        return await axios({
          url: 'http://localhost:3000/api/records/',
          method: 'get'
        })
      },
      async dropData(){
        console.log(await axios({
          url: 'http://localhost:3000/api/records/',
          method: 'delete'
        }))
      },
      addCar(rowId){
        console.log(this.array[rowId])
        axios({
          url: 'http://localhost:3000/api/records/',
          method: 'post',
          data: {
            id: this.array[rowId].id,
            model: this.array[rowId].model,
            buildYear: this.array[rowId].buildYear,
            operations: this.array[rowId].operations
          }
        })
        this.refresh()
      },
      editCar(rowId){
        let el = this.array[rowId]
        axios({
            url: `http://localhost:3000/api/records/:${el._id}`,
            method: 'put',
            data: el
        })
      },
      deleteCar(rowId){
        let delId = this.array[rowId].id
        axios({
            url: `http://localhost:3000/api/records/?id=${delId}`,
            method: 'delete'
        })
        this.refresh()
      },
      async refresh(){
        let response = await this.getDataFromDB()
        console.log(response);
        if (response.status === 200)
          this.array = response.data
        else
          this.array = []
      }
    },
    mounted: function(){
      this.refresh()
      console.log(this.array);
    }
}
</script>

<style>
  div {
    text-align: center;
  }
</style>