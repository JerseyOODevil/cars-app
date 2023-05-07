<template>
    <table class="table" cellspacing="0">
        <tr class="header-row">
            <th v-for="el in header">{{ el }}</th>
            <th></th>
        </tr>
        <tr class="row" v-for="(row, rowId) in data">
            <td v-for="el in getRow(row)">
                {{ el }}
            </td>
            <td><img src="@/assets/edit.png" @click="editRow(rowId)" width="30" height="30"></td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "Table",
        props:{
                header: Array,
                data: Array
        },
        methods: {
            getRow(row){
                let res = {};
                console.log(this.header)
                for (let prop in this.header)
                    res[prop] = row[prop];
                return res;
            },
            editRow(rowId) {
                console.log(this.data[rowId].id)
            }
        }
    }

</script>

<style>
    .table {
        color: #ff00ff;
        display: inline-block;
        padding: 10px;
    }
    .table th td{
        border: none;
    }
    .header-row {
        background-color: #999999;
    }
</style>