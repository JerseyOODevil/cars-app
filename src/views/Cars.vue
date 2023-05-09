<template>
  <div class="Trunc">
    <input type="submit" value="Drop database" @click="dropData()">
    <input type="submit" value="Check data" @click="console.log(this.array)">
    <input type="submit" value="Save data" @click="save()">
    <div>
      <cars-table id="Table" v-bind="{array:this.array}" @add="addCar($event)"></cars-table>
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
        array:[],
        addIds:[],
        delIds:[],
        changes:[]
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
        this.addIds.push(this.array[rowId].id)
      },
      async save(){
        let newChanges = []
        for (el of this.changes)
          if (this.delIds.indexOf(el.id))
            newChanges.push(el)

        let i = 0
        while (i < this.delIds.length){
          let idx = this.addIds.indexOf(this.delIds[i])
          if (idx !== -1){
            this.addIds.splice(idx,1)
            this.delIds.splice(i,1)
          }
          else
            i += 1
        }
        
        let pushBody = []
        let putBody = []
        for (let el of newChanges){
          if (this.addIds.indexOf(el.id) !== -1){
            pushBody.push(el)
            continue
          }
          putBody.push(el)
        }

        for (let el of this.delIds)
          await axios({
            url: `http://localhost:3000/api/records/:${el}`,
            method: 'delete'
          })

        await axios({
          url: 'http://localhost:3000/api/records/',
          method: 'post',
          data: pushBody
        })

        for (let el of putBody)
          await axios({
            url: `http://localhost:3000/api/records/:${el.id}`,
            method: 'put',
            data: el
          })
        
        this.addIds = []
        this.delIds = []
        this.changes = []

        let response = this.getDataFromDB()
        if (response.status === 200)
          this.array = response.data
        else
          this.array = []
      }
    },
    mounted: function(){
      let response = this.getDataFromDB()
      if (response.status === 200)
        this.array = response.data
      else
        this.array = []
    }
}
</script>

<style>
  div {
    text-align: center;
  }
</style>