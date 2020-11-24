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
             <router-link to="/"><v-btn depressed color="blue darken-3">Home</v-btn></router-link>
             <router-link to="/about"><v-btn depressed color="blue darken-3">About</v-btn></router-link>
             <v-btn  icon x-large @click="change"><v-avatar color="primary" size="40">YB</v-avatar></v-btn>
                <div class="container-dropBadge" v-if="isOn">
                    <v-card  class="d-flex justify-center" color="white">
                        <v-btn icon x-large><v-avatar color="primary" size="40">YB</v-avatar></v-btn>
                    </v-card>
                </div>
        </v-app-bar>
    </nav>
</template>

<script>
export default {
    name:"NavBar",

    data(){
    return{

        isOn:false,
        }

    },

    methods:{
        change(){
        this.isOn =!this.isOn
        console.log(this.isOn)
    }
    }

}

</script>

<style>
.container-dropBadge{
    position: absolute;
    right: 0;
    top:60px;
    width: 150px;
    padding-right:10px;


}

@media only screen and (min-width: 1399px) {
  .container-dropBadge{
       top:	4rem;
  }
}
</style>