<template>
        <nav>
        <v-app-bar 
        app 
        color="blue darken-3"
        dark>
            <v-toolbar-title class="text-uppercase white--text">
                <div class="d-flex align-center">
                <span class="font-weight-light ml-5">Tre</span>
                <span>llo</span>
                </div>
            </v-toolbar-title>
                  <v-autocomplete cache-items class="mx-3 ml-10" flat hide-no-data hide-details label="Search" solo-inverted></v-autocomplete>
             <v-spacer></v-spacer>
             <v-btn depressed color="blue darken-3">Home</v-btn>
             <v-btn depressed color="blue darken-3">About</v-btn>
             <v-btn  icon x-large @click="change"><v-avatar color="primary" size="40">YB</v-avatar></v-btn>
             <div>
                 <h1 class="mt-100">Hello</h1>
                 <!-- SHOW THE DROP DOWN MENU FOR THE USER -->
             </div>
        </v-app-bar>
    </nav>
</template>

<script>
import {
  mdiAccount,
} from '@mdi/js'
export default {
    name:"NavBar",

    data(){
    return{
        icons:{mdiAccount},

        isOn:false,
        }

    },

    methods:{
        change(){
        this.isOne =!this.isOne
        console.log(this.isOne)
    }
    }

}

</script>

<style>
</style>