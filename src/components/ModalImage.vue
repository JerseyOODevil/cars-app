<template>
    <div class="modal-mask" @click="windowClicked($event)">
        <div class="modal-container">
            <img :src="imageLink" class="figure-image"/>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, 50px); justify-content: center; grid-row-start: 3;">
                <input type="button" value="<" @click="$emit('change', -1)"/>
                <img width="50" height="50" src="@/assets/delete.png" @click="$emit('delete')"/>
                <input type="button" value=">" @click="$emit('change', 1)"/>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'ModalImage',
    props:{
        imageLink: String
    },
    methods:{
        windowClicked: function(event){
            if (event.target.className === 'modal-mask')
                this.$emit('close')
        }
    }
}
</script>


<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: 80vw;
  grid-template-rows: 80vh;
  place-content: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 80vw;
  height: 80vh;
  background-color: #00000088;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px calc(80vh - 100px) 50px;
  justify-content: center;
}

.figure-image{
    width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
    grid-row-start: 2;
}
</style>