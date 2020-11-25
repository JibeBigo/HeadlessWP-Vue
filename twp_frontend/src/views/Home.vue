<template>
  <div class="home">
    <div v-for="card in allCards" :key="card.id">
      {{card.id}}
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
  name: 'Home',
  components: {
  },

  computed:{
    ...mapGetters(["allCards"])
  },

  methods:{
    ...mapActions(["fetchCards"])
  },

  created (){
    this.fetchCards()
  }



}
</script>
