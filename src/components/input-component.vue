<template>
  <div class="text-field text-field_floating-3">
    <input class="text-field__input"
      :id="id"
      :name="id"
      :type="type" 
      :value="value"
      @input="$emit('edit', $event.target.value)"
    >
    <label class="text-field__label" :for="id">{{ name }}</label>
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
  .text-field {
    margin-bottom: 1rem;
    display: block;
    padding: 10px;
  }

  .text-field__label {
    margin-bottom: 0.25rem;
  }

  .text-field__input[type="search"]::-webkit-search-decoration,
  .text-field__input[type="search"]::-webkit-search-cancel-button,
  .text-field__input[type="search"]::-webkit-search-results-button,
  .text-field__input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .text-field__input::placeholder {
    color: #212529;
    opacity: 0.4;
  }

  .text-field__input:focus {
    color: #212529;
    background-color: #fff;
    border-color: #bdbdbd;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
  }

  .text-field__input:disabled,
  .text-field__input[readonly] {
    background-color: #f5f5f5;
    opacity: 1;
  }

  /* with floating label */
  .text-field_floating-3 {
    position: relative;
  }

  .text-field_floating-3 .text-field__input {
    border: none;
    border-bottom: 1px solid #bdbdbd;
    border-radius: 0;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    width: 250px;
    height: calc(1.5rem + 2px);
    line-height: 1.25;
    padding: 1rem 0.75rem;
    background-color: #f5f5f5;
  }

  .text-field_floating-3 .text-field__input:focus {
    outline: 0;
    border-bottom: 1px solid #03a9f4;
    box-shadow: none;
    background-color: #eee;
  }

  .text-field_floating-3 .text-field__label {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 1rem .75rem;
    pointer-events: none;
    border: 1px solid transparent;
    transform-origin: 0 0;
    transition: color .15s ease-in-out, transform .15s ease-in-out;
  }

  .text-field_floating-3 .text-field__input::-moz-placeholder {
    color: transparent;
  }

  .text-field_floating-3 .text-field__input::placeholder {
    color: transparent;
  }

  .text-field_floating-3 .text-field__input:focus,
  .text-field_floating-3 .text-field__input:not(:placeholder-shown) {
    padding-top: 1.625rem;
    padding-bottom: .625rem;
    border-bottom: 1px solid #03a9f4;
  }

  .text-field_floating-3 .text-field__input:focus~.text-field__label,
  .text-field_floating-3 .text-field__input:not(:placeholder-shown)~.text-field__label {
    transform: scale(.85) translateY(-.75rem) translateX(.15rem);
    color: #03a9f4;
  }
</style>