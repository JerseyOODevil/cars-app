<template>
    <div class="form-control">
      <label v-bind:for="id">{{ name }}</label>
      <input 
        :id="id" 
        :type="type" 
        :value="value"
        @input="$emit('update:value', $event.target.value)">
    </div>
</template>

<script>
    export default {
        name: 'input-component',
        props:{
            id: String,
            name: String,
            type: String,
            value: [String, Number, Boolean]
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
</style>