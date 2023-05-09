<template>
    <div class="form-control">
        <object-table 
            id="Table" 
            v-bind="{columns:this.columns,array:this.array}" 
            @add="this.$emit('add',$event)"
            @edit="this.$emit('edit',$event)"
        >
        </object-table>
    </div>
</template>

<script>
    import ObjectTable from '@/components/ObjectTable.vue'

    export default {
        name: 'CarsTable',
        data: function(){
            return {
                columns: [
                    {key:'model', label:'Модель авто'},
                    {key:'buildYear', label:'Год выпуска'},
                ]
            }
        },
        props:{
            array: Array
        },
        components: {
            ObjectTable
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
    margin: 5px;
    padding: 10px;
  }
</style>