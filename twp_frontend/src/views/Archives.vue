<template>
  <div>
      <h1 class="title-archives">Archives</h1>
      <div class="container-tab" v-for="list in allListItems" :key="list.id"> 
          <div v-if="list.id === 1 ">
          <v-simple-table fixed-header>
            <template v-slot:default>
                    <thead>
                      <tr>
                          <th class="text-left">Title</th>
                          <th class="text-left">Date</th>
                          <th class="text-left">Delete</th>
                        </tr>
                    </thead>
                <tbody>
                    <tr v-for="(card,index) in allCards" :key="index">
                        <td v-if="list.id == card.categories[0]">{{card.title.rendered}}</td>
                        <td v-if="list.id == card.categories[0]">{{card.date}}</td>
                        <td v-if="list.id == card.categories[0]"><v-btn  @click="removeCard(card.id)" color="red">X</v-btn></td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>
      </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
    name:"Archives",

    computed:{
        ...mapGetters(["allListItems","allCards"])
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