<template>
    <div style="display:flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <div style="display:flex; flex-direction: row; justify-content: flex-start;">
            <img src="@/assets/add.png" width="30" height="30" @click="$emit('add')">
        </div>
        <div style="display:block">
            <table class="table">
                <tr v-for="car in cars">
                    <td @click="$emit('select', car)">{{ getCarName(car) }}</td>
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
                let buyDate = null

                for (let op of car.operations)
                    if (String(op.name).toUpperCase() === 'ПОКУПКА'){
                        buyDate = op.date
                        break
                    }
                if ((car.model)|| (car.buildYear) ||(buyDate)){
                    let s = ''
                    s += car.model ? `${car.model} ` : ''
                    s += car.buildYear ? `(${car.buildYear}) ` : ''
                    s += buyDate ? `от ${buyDate}` : ''
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