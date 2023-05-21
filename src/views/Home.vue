<template>
  <div class="home">
    <label>{{ `Баланс: ${balance}` }}</label>
    <div style="display:block; width:100%; height:600px;">
      <v-chart :option="capital" :init-options="echartsInit" autoresize/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ObjectTable from '@/components/ObjectTable.vue'
import 'echarts'
import VChart from 'vue-echarts'

export default {
  name: 'Home',
  components: {
    ObjectTable,
    VChart
  },
  data: function() {
    return {
      cars:[],
      echartsInit: {
        renderer: 'canvas',
        useDirtyRect: false
      }
    }
  },
  computed:{
    balance: function(){
      let res = 0

      for(let car of this.cars){
        for (let op of car.operations){
          res += Number(op.value)
        }
      }
      return res
    },
    capital: function(){
      let dateNow = new Date()
      let monthId = dateNow.getFullYear()*100 + dateNow.getMonth() - 99
      
      let months = []
      for (let i=0; i<12; i++){
        months.push(monthId)
        if (monthId % 100 === 12)
          monthId += 89
        else
          monthId++
      }

      let dataArray = [0,0,0,0,0,0,0,0,0,0,0,0]
      let monthNames = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']

      for (let car of this.cars)
        for (let op of car.operations){
          let opDate = new Date(op.date)
          for (let i in months){
            if (opDate.getFullYear()*100 + opDate.getMonth() + 1 <= months[i])
              dataArray[i] += Number(op.value)
          }
        }
      
      let newMonths = []
      for (let i in months){
        newMonths.push(`${monthNames[months[i] % 100 - 1]} ${parseInt(Math.floor(months[i]/100))}`)
      }
      
      return {
        xAxis: {
          type: 'category',
          data: newMonths
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: dataArray,
            type: 'bar'
          }
        ],
        tooltip:{
          show: true
        }
      }
    }
  },
  methods:{
    refresh: async function(){
      let resData = await axios({
        url: '/api/records',
        method: 'get'
      })
      this.cars=resData.data
    }
  },
  mounted:async function(){
    await this.refresh()
  }
}
</script>

<style>
  .home {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>