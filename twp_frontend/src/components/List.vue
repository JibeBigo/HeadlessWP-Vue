<template>
    <div class="container-card">
        <v-card class="mr-5" width="250" min-height="200">
            <v-card-title>{{list.name}}</v-card-title>
            <v-list-item
            v-for="card in allCards" :key="card.id"
            >
                <CardItems v-bind:card="card"/>
            </v-list-item>

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
import CardItems from '@/components/CardItems.vue'

export default {
    name:"List",
    props:["list"],

    data () {
        return {
            formOn: false,
            cardTitle: "",
        }
    },

    components: { CardItems },

    computed: { 
        ...mapGetters(["allCards"]),
    },

    methods: {
        ...mapActions(["fetchCards", "addCard"]),

        toggle(){
            this.formOn = !this.formOn
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

</style>