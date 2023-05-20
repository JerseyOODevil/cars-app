<template>
    <div style="display:flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <div style="display:flex; flex-direction: row; justify-content: flex-start;">
            <img src="@/assets/add.png" width="30" height="30" @click="$emit('add')">
            <img src="@/assets/edit.png" width="30" height="30" @click="logButton()">
        </div>
        <div style="display:block">
            <table class="table">
                <tr v-for="(car, id) in cars">
                    <td><label class="table-label" @click="$emit('select', id)">{{ getCarName(car) }}</label></td>
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
                console.log(this.$store);
            }
        }
    }
</script>

<style>
    .table-label {
        display: inline-block;
        border-radius: 5px;
        border: 1px solid #0070c9;
        width: 300px;
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
    .content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
</style>