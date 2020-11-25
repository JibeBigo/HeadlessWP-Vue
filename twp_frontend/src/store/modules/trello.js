import axios from "axios"

const state = {
    trello:[],
    user :[]
};

const actions= {

    async fetchCards({commit}){
        const response = await axios.get('http://localhost:8000/?rest_route=/wp/v2/categories')
        console.log(response.data)
        commit("setCards", response.data)
    }
};
const mutations= {
    setCards:(state,list) => (state.trello = list)
};
const getters= {
    allCards:(state) => state.trello
};

export default{
    state,
    mutations,
    actions,
    getters,

}