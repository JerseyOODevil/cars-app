<template>
    <div class="form-control">
        <img src="@/assets/add.png" width="30" height="30" @click="$emit('add')">
        <img src="@/assets/edit.png" width="30" height="30" @click="logButton()"><br>
        <router-link v-for="car in cars" :to="getCarLink(car.id)">{{ getCarName(car) }}<br></router-link>
    </div>
</template>

<script>
    export default {
        name: 'CarsTable',
        props:{
            cars: Array
        },
        methods: {
            getCarLink(carId, isNew=false){
                return `/cars?id=${carId}&is_new=${isNew}`
            },
            getCarName(car){
                // let buyDate = null
                // for (let op of car.operations)
                //     if (op.name.toUpperCase() = 'ПОКУПКА'){
                //         buyDate = op.date
                //         break
                //     }
                // if ((car.model)||(buyDate))
                //     return `${car.model} от ${buyDate}`
                // else
                //     return `id=${car.id}`
                return `id=${car.id}` 
            },
            logButton(){
                console.log(this.cars);
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
    margin: 5px;
    padding: 10px;
  }
</style>