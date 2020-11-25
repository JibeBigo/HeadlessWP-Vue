<template>
    <div class="container-card">
        <v-card class="mr-5" width="250" min-height="200">
            <div class="d-flex justify-space-between align-center">
                <v-card-title>{{list.name}}</v-card-title>
                <v-btn  @click="toggleModal" icon><v-icon>{{icons.mdiDotsHorizontal}}</v-icon></v-btn>
            </div>
            <div v-if="modalList" class="modal">
                    <v-card>
                        <v-card-title>
                            <p>Hello</p>
                        </v-card-title>
                    </v-card>
                </div>
           <!-- <v-list-cards>SPOT FOR THE COMMENT CARD BODY</v-list-cards> -->
        </v-card>
    </div>
</template>

<script>
import {mdiDotsHorizontal} from "@mdi/js"
export default {
    name:"List",
    props:["list"],
    data(){
        return{
            icons:{mdiDotsHorizontal},
            modalList:false
        }
    },

    methods:{
        toggleModal(){
            this.modalList = !this.modalList
        }
    }
}

</script>

<style scoped>
.container-card{
    display: flex;
}
.modal{
    position: absolute;
    left: 170px;
    top: 55px;
    width: 200px;
}
</style>