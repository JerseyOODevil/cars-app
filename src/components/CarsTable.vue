<template>
    <div style="display:grid; grid-template-columns: 1fr 400px 1fr; grid-template-rows: 30px 1fr;">
        <div style="display:block; grid-column-start: 2; grid-row-start: 1;">
            <img src="@/assets/add.png" width="30" height="30" @click="$emit('add')">
        </div>
        <div style="display:block; grid-column-start: 2; grid-row-start: 2;">
            <table class="table">
                <tr v-for="car in cars">
                    <td @click="$emit('select', car.id)">{{ getCarName(car) }}</td>
                    <td><img class="table-img" src="@/assets/delete.png" width="30" height="30" @click="$emit('delete', car.id)"/></td>
                </tr>
            </table>        
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CarsTable',
        props:{
            cars: Array
        },
        methods: {
            getCarName(car){
                if ((car.model)|| (car.buildYear) ||(car.buyDate)){
                    let s = ''
                    s += car.model ? `${car.model} ` : ''
                    s += car.buildYear ? `(${car.buildYear}) ` : ''

                    if (car.buyDate){
                        let date = new Date(car.buyDate)
                        s += `от ${date.getFullYear()}-${date.getMonth()<9 ? '0' : ''}${date.getMonth()+1}-${date.getDate()<9 ? '0' : ''}${date.getDate()}`
                    }

                    return s
                }
                
                return `id=${car.id}`
            },
            logButton(){
                console.log(this.cars);
            }
        }
    }
</script>

<style>
    .table-label {
        display: inline-block;
    }
    .table-img {
        display: inline-block;
    }
    .table {
        display: inline-block;
        padding: 5px;
        margin: 15px;
    }
</style>