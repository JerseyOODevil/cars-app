<template>
  <div class="home">
    <input type="submit" value="Check Data" @click="checkData()">
    <ObjectTable v-bind="{columns: columns, array: array}" @edit="editElem($event)"></ObjectTable>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';
import ObjectTable from '@/components/ObjectTable.vue'

export default {
  name: 'Home',
  components: {
    ObjectTable
  },
  data: function() {
    return {
      columns: [{key:'a', label: 'aa',type: 'text'},{key:'b', label: 'bb', type: 'number'},{key:'c', label: 'cc', type: 'checkbox'}],
      array: [{a:'asdasd',b:2,c:true},{a:'jkljkl',b:5,c:false}]
    }
  },
  methods:{
    checkData(){
      console.log(this.array)
    },
    editElem(event){
      this.array[event.id][event.key] = event.value
    }
  }
}
</script>

<style>
  .form-control {
    padding: 5px;
  } 
  .form-control label {
    display: block;
  }
  .send {
    margin: 5px
  }
</style>