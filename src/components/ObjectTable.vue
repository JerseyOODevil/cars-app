<template>
    <img src="@/assets/add.png" @click="addRow()" width="30" height="30">
    <table class="table" cellspacing="0">
        <tr class="header-row">
            <th v-for="el in columns">{{ el.label }}</th>
        </tr>
        <tr v-for="(row, rowId) in array">
            <td v-for="(col, colId) in columns">
                <input
                    :type="col.type" 
                    :value="row[col.key]"
                    :checked="row[col.key]"
                    @input="editCell($event, rowId, colId)"
                />
            </td>
            <td><img src="@/assets/delete.png" width="30" height="30" @click="this.$emit('delete',rowId)"></td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "ObjectTable",
        data: function(){
            return {
                clickedRow: null,
                clickedColumn: null,
                editedValue: null
            }
        },
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
            },
            editCell(event, rowId, colId){
                let newValue = {id:rowId, key:this.columns[colId].key, value:null}
                if (event.target.type === 'checkbox')
                    newValue.value = event.target.checked
                else
                    newValue.value = event.target.value
                this.$emit('edit',newValue)
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