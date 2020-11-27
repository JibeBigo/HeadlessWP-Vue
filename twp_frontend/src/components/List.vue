<template>
    <div class="container-card">
        <v-card class="mr-5" width="250" min-height="200">
            <div class="d-flex justify-space-between align-center">
                <v-card-title class="pointer">
                    <v-form>
                        {{list.name}}
                    </v-form>
                </v-card-title>
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
                                    <v-btn @click="cancelList(list.id)" icon color="red lighten-1"><v-icon>{{icons.mdiCloseCircleOutline}}</v-icon></v-btn>
                                </div>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </div>

            <div v-for="card in allCards" :key="card.id">
                <v-list-item v-if="list.id === card.categories[0]">
                    <CardItems v-bind:card="card" v-bind:list="list"/>
                </v-list-item>
            </div>

            <div class="addCard">
                <v-btn v-bind:class="{none:formOn}"
                @click="toggle"
                depressed
                ><v-icon size="15">mdi-plus</v-icon>
                    Add another card
                </v-btn>
                <div v-if="formOn">
                    <v-form @submit="onSubmit">
                    <v-card width="250">
                        <v-textarea
                            v-model="cardTitle"
                            class="mr-5 ml-5"
                            placeholder="Enter a title for this card..."
                            rows="2"
                        ></v-textarea>
                        <v-btn color="green lighten-1" type="submit">Add Card</v-btn>
                        <v-btn @click="toggle" icon>X</v-btn>
                    </v-card>
                    </v-form>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {mdiDotsHorizontal,mdiClose,mdiCloseCircleOutline} from "@mdi/js"
import CardItems from '@/components/CardItems.vue'

export default {
    name:"List",
    props:["list"],

    data () {
        return {
            icons:{mdiDotsHorizontal,mdiClose,mdiCloseCircleOutline},
            modalList:false,
            formOn: false,
            cardTitle: "",
        }
    },

    components: { CardItems },

    computed: { 
        ...mapGetters(["allCards"]),
    },

    methods: {
        ...mapActions(["fetchCards", "deleteList", "addCard"]),

        toggleModal(){
            this.modalList = !this.modalList
        },

        toggle(){
            this.formOn = !this.formOn
        },

        cancelList(id){
            console.log(id)
            this.deleteList(id)
        },

        onSubmit(event){
            event.preventDefault();
            let newCard = {
                title: this.cardTitle,
                status: "publish",
                content: "",
                categories: this.list.id,
            }
            console.log(newCard);
            this.addCard(newCard);
            this.cardTitle="";
        },
    },

    created (){
        this.fetchCards()
    }
}

</script>

<style scoped>
.addCard {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 3rem;
}
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
.pointer{
    pointer-events: stroke;
}
</style>