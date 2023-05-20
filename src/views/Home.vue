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
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
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
  mounted:function(){
    this.refresh()
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