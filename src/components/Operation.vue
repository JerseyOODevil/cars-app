<template>
    <form @submit.prevent="saveChanges()">
        <InputComponent v-model="this.change.name" v-bind="{id:'name',name:'Наименование операции',type:'text'}"></InputComponent>
        <InputComponent v-model="this.change.date" v-bind="{id:'name',name:'Дата операции',type:'date'}"></InputComponent>
        <InputComponent v-model="this.change.value" v-bind="{id:'name',name:'Оборот, руб.',type:'number'}"></InputComponent>
        <input type="submit" value="Сохранить изменения">
    </form>
</template>

<script>
    import InputComponent from '@/components/input-component.vue';

    export default {
        name: "Operation",
        data: function(){
            return {
                change: {
                    id: this.id,
                    name: this.name,
                    date: this.date,
                    value: this.value,
                }
            }
        },
        components: {
            InputComponent
        },
        props: {
            id: Number,
            name: String,
            date: Date,
            value: Number
        },
        methods: {
            saveChanges(){
                this.id = this.change.id
                this.name = this.change.name
                this.date = this.change.date
                this.value = this.change.value
            }
        }
    }
</script>

<style>

</style>