import Vue from 'vue'
import Vuex from 'vuex'
import trello from "./modules/trello"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    trello
  }
})
