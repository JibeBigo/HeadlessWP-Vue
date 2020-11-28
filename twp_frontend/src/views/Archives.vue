<template>
  <div>
      <h1 class="title-archives">Archives</h1>
      <div class="container-tab" v-for="(list,index) in showList" :key="index"> 
          <v-simple-table fixed-header>
            <template v-slot:default>
                    <thead>
                      <tr>
                          <th class="text-left">Title</th>
                          <th class="text-left">Date</th>
                          <th class="text-left">Delete</th>
                        </tr>
                    </thead>
                <tbody v-if="showCard.length > 0">
                        <tr v-for="(card,index) in showCard" :key="index">
                            <td>{{card.title.rendered}}</td>
                            <td>{{card.date}}</td>
                            <td><v-btn  @click="removeCard(card.id)" color="red">Delete</v-btn></td>
                        </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td>No Archives Found</td>
                        <td>No Archives Found</td>
                        <td>No Archives Found</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
      </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import {mdiClose} from "@mdi/js";
export default {
    name:"Archives",

    icons: {mdiClose},

    computed:{
        ...mapGetters(["allListItems","allCards"]),
        
        showList(){
           return this.allListItems.filter(list =>{
                return list.id == 1
            })
        },

        showCard(){
            return this.allCards.filter(card =>{
                return this.showList[0].id == card.categories[0]  
               
            })
        }
    },

    methods:{
        ...mapActions(["deleteCard"]),

        removeCard(id){
            this.deleteCard(id)
        },

    }
}
</script>

<style>

.title-archives{
    color:white;
    margin-bottom:20px;
    margin-left: 15px;
}
.container-tab{
    margin-left: 15px;
    margin-right: 15px;

}
</style>