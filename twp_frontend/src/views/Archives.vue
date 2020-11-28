<template>
  <div>
      <h1>Archives</h1>
      <div v-for="list in allListItems" :key="list.id"> 
          <v-card v-if="list.id === 1 ">
              <v-card-title>{{list.name}}</v-card-title>
              <v-card-text v-for="(card,index) in allCards" :key="index">
                  <p v-if="list.id == card.categories[0]">{{card.title.rendered}}</p>
              </v-card-text>
          </v-card>
      </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    name:"Archives",

    computed:{
        ...mapGetters(["allListItems","allCards"])
    }
}
</script>

<style>
</style>