<template>
    <div class="text-field text-field_floating">
      <label class="text-field__label" :for="id">{{ name }}</label>
      <input class="text-field__input"
        :id="id" 
        :type="type" 
        :value="value"
        @input="$emit('update:value', $event.target.value)"
      >
      
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
  /* установим отступ 1rem от нижнего края элемента */
  .text-field {
    margin-bottom: 1rem;
  }
  /* стили для label */
  .text-field__label {
    display: inline-block;
    margin-bottom: 0.25rem;
  }
  /* стили для input */
  .text-field__input {
    display: inline-block;
    width: 300px;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
</style>