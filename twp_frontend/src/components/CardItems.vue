<template>
    <div>
        <v-dialog
            v-model="dialog"
            min-height="800"
            width="600"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-card
                    class="mb-3 rounded-tl-xl rounded-br-xl"
                    elevation="5"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    width="220"
                >
                    <v-card-title> {{ card.title.rendered }} </v-card-title>
                    <v-card-text> 
                        <v-icon v-if="card.content.rendered"> {{ icons.mdiPlaylistCheck }} </v-icon>
                        <v-icon v-else></v-icon>
                    </v-card-text>
                </v-card>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    {{ card.title.rendered }}
                </v-card-title>
                
                <v-card-subtitle class="mb-2">
                    in list {{ list.name }}
                </v-card-subtitle>

                <v-card-text class="d-flex flex-row-reverse">
                    <div width="30%">
                        <v-list>
                            <v-list-item>
                                Actions
                            </v-list-item>
                            <v-list-item>
                                <v-btn @click="archiveCard(card.id)" class="d-flex align-items">
                                    <div><v-icon> {{ icons.mdiArchive }}</v-icon></div>
                                    <div><p class="ml-1 mb-0">Archive card</p></div>
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </div>
                    <div width="70%">
                        <div class="d-flex align-items">
                            <v-icon> {{ icons.mdiPlaylistCheck }}</v-icon>
                            <h1 class="ml-1 mb-0">Description</h1>
                        </div>

                        <div>
                            <v-btn v-bind:class="{none:formDescOn}" @click="toggleDesc">Add a more Detailed description...</v-btn>
                                <div v-if="formDescOn">
                                    <v-form @submit="onSubmitDesc">
                                    <v-card width="250">
                                        <v-textarea 
                                            class="mr-5 ml-5" 
                                            placeholder="Add a more detailed description..." 
                                            v-model="description"></v-textarea>
                                        <v-btn color="green lighten-1"  class="white--text ml-4" type="submit">Save</v-btn>
                                        <v-btn @click="toggleDesc" icon>
                                        <v-icon>{{icons.mdiClose}}</v-icon></v-btn>
                                    </v-card>
                                    </v-form>
                                </div>
                        </div>
                    </div>
                </v-card-text>

                <!-- <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                </v-btn>
                </v-card-actions> -->
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mdiPlaylistCheck, mdiArchive, mdiClose } from '@mdi/js'

export default {
    props: ["card", "list"],
    name: "CardItems",

    data () {
        return {
            dialog: false,
            formDescOn:false,
            icons: { mdiPlaylistCheck, mdiArchive, mdiClose },
        }
    },

    methods: {
        ...mapActions(["deleteCard"]),
        
        archiveCard(id){
            console.log(id)
            this.deleteCard(id)
        },

        toggleDesc(){
            this.formDescOn = !this.formDescOn
        },
    },

}
</script>

<style>

</style>

