<template>
    <img src="@/assets/add.png" @click="addRow()" width="30" height="30">
    <table class="table" cellspacing="0">
        <tr class="header-row">
            <th v-for="el in columns">{{ el.label }}</th>
        </tr>
        <tr v-for="(row, rowId) in array">
            <td v-for="col in columns">{{ row[col.key] }}</td>
            <td><img src="@/assets/edit.png" width="30" height="30" @click="this.$emit('edit',rowId)"></td>
            <td><img src="@/assets/delete.png" width="30" height="30" @click="this.$emit('delete',rowId)"></td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "ObjectTable",
        props: {
            columns: Array,
            array: Array
        },
        methods:{
            addRow(){
                let newObj = {id:null}
                for (let col of this.columns)
                    newObj[col.key] = null
                newObj.id = this.array.length > 0 ? this.array[this.array.length - 1].id + 1 : 1
                this.array.push(newObj)
                this.$emit('add', (this.array.length - 1))
            }
        }
    }
</script>

<style>
    .table {
        color: #ff00ff;
        display: inline-block;
        padding: 10px;
        margin: 10px;
        caret-color: transparent;
    }
    .header-row {
        background-color: #999999;
    }
</style>