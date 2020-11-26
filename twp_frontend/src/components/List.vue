<template>
    <div class="container-card">
        <v-card class="mr-5" width="250" min-height="200">
            <div class="d-flex justify-space-between align-center">
                <v-card-title>{{list.name}}</v-card-title>
                <v-btn  @click="toggleModal" icon><v-icon>{{icons.mdiDotsHorizontal}}</v-icon></v-btn>
            </div>
            <div v-if="modalList" class="modal">
                    <v-card>
                        <v-card-title class="d-flex justify-center">
                                     <span>List Actions</span> 
                                    <v-btn class="modalCorner" @click="toggleModal" icon><v-icon>{{icons.mdiClose}}</v-icon></v-btn>
                        </v-card-title>
                        <v-divider class="ml-5 mr-5"></v-divider>
                        <v-card-text>
                            <v-list>
                                <div class="container-deleteList">
                                    <p class="deleteListAction">Delete List</p>
                                    <v-btn icon color="red lighten-1"><v-icon>{{icons.mdiCloseCircleOutline}}</v-icon></v-btn>
                                </div>
                            </v-list>
                        </v-card-text>



                    </v-card>
                </div>
           <!-- <v-list-cards>SPOT FOR THE COMMENT CARD BODY</v-list-cards> -->
        </v-card>
    </div>
</template>

<script>
import {mdiDotsHorizontal,mdiClose,mdiCloseCircleOutline} from "@mdi/js"
export default {
    name:"List",
    props:["list"],
    data(){
        return{
            icons:{mdiDotsHorizontal,mdiClose,mdiCloseCircleOutline},
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
    left: 190px;
    top: 55px;
    width: 300px;
}
.container-deleteList{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.deleteListAction{
    margin-bottom: 0px;
}
.modalCorner{
    position: absolute;
    right: 0;
    top:0
}
</style>