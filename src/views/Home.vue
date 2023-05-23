<template>
  <div class="home">
    <label>{{ `Баланс: ${balance}` }}</label>
    <div style="display:block; width:100%; height:600px;">
      <v-chart :option="capitalOptions" :init-options="echartsInit" autoresize/>
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
      capital: [],
      balance: 0,
      echartsInit: {
        renderer: 'canvas',
        useDirtyRect: false
      }
    }
  },
  computed:{
    capitalOptions: function(){
      return {
        xAxis: {
          type: 'category',
          data: this.capital.map(cur => cur.monthName)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.capital.map(cur => cur.value),
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
       this.capital = await this.getCapital()
    },
    getCapital: async function(){
      const response = await axios({
        url: '/api/MySQL/getCapital',
        method: 'get'
      })
      return response.status === 200 ? response.data : []
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