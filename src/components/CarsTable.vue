<template>
    <div style="display:block">
        <div style="display:flex; flex-direction: row; justify-content: flex-start;">
            <img src="@/assets/add.png" width="30" height="30" @click="$emit('add')">
        </div>
        <div style="display:block">
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
        text-align: center;
        display: inline-block;
        padding: 5px;
        margin: 15px;
        caret-color: transparent;
    }
</style>