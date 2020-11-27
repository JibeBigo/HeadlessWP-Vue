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
                  <v-text-field v-model="search" @:keyup="filteredList" cache-items class="mx-3 ml-10" flat hide-no-data hide-details label="Search" solo-inverted></v-text-field>
             <v-spacer></v-spacer>
             <router-link to="/"><v-btn depressed color="blue darken-3">Home</v-btn></router-link>
             <router-link to="/about"><v-btn depressed color="blue darken-3">About</v-btn></router-link>
             <v-btn  icon x-large @click="change"><v-avatar color="primary" size="40">YB</v-avatar></v-btn>
                <div class="container-dropBadge" v-if="isOn">
                    <v-card  class="d-flex justify-center" color="white">
                        <v-btn icon x-large><v-avatar color="primary" size="40">YB</v-avatar></v-btn>
                    </v-card>
                </div>
        </v-app-bar>
        <!-- display none /ListItems is use to bind the data from filter function to ListItems -->
        <ListItems class="ShowNone" v-bind:allListItemsFiltered="filteredList"/>
    </nav>
</template>

<script>
import ListItems from "../ListItems"
import {mapGetters} from "vuex"
export default {
    name:"NavBar",

    data(){
        return{

            isOn:false,
            search:"",
        }

    },
    components:{
        ListItems
    },

    methods:{
        change(){
        this.isOn =!this.isOn
        },

    },
    computed:{
    ...mapGetters(["allListItems"]),
    
    filteredList:function(){
            return this.allListItems.filter(list =>{
                return list.name.match(this.search)
            })
        }
    },

}

</script>

<style>
.container-dropBadge{
    position: absolute;
    right: 0;
    top:3.5625rem;
    width: 150px;


}

@media only screen and (min-width: 1399px) {
  .container-dropBadge{
       top:	4rem;
  }
}
.ShowNone{
    display:none
}
</style>