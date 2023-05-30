<template>
    <div class="content">
        <img class="image" src="@/assets/add.png" @click="addRow()" width="30" height="30">
    
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
                        @input="editCell($event, rowId, col.key)"
                    />
                </td>
                <td v-if="!row.deleted"><img src="@/assets/delete.png" width="30" height="30" @click="this.$emit('delete',rowId)"></td>
                <td v-if="row.deleted"><img src="@/assets/restore.png" width="30" height="30" @click="this.$emit('restore',rowId)"></td>
            </tr>
        </table>
    </div>
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

                this.array.push(newObj)
                this.$emit('edit', this.array)
            },
            editCell(event, rowId, colId){
                let newValue = null
                if (event.target.type === 'checkbox')
                    newValue = event.target.checked
                else
                    newValue = event.target.value
                this.array[rowId][colId] = newValue
                this.$emit('edit',this.array)
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
        grid-column-start: 2;
        grid-row-start: 2;
    }
    .image{
        display: block;
        padding: 5px;
        grid-column-start: 2;
        grid-row-start: 1;
    }
    .header-row {
        background-color: #999999;
    }
    .content {
        width: 100%;
        display: grid;
        grid-template-rows: 40px 1fr;
        grid-template-columns: 1fr 500px 1fr;
    }
</style>