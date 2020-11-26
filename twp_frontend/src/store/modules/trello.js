import axios from "axios"
const tokenY ="eW9hbm4ucG9uc0BlcGl0ZWNoLmV1Ok1vaSZUb2kwOHdz"

const state = {
    listItems:[],
    cards: [],
    user :[]
};

const getters= {
    allListItems:(state) => state.listItems,
    allCards: (state) => state.cards,
};

const actions= {

    async fetchListItems({commit}){
        const response = await axios.get('http://localhost:8000/wp-json/wp/v2/categories')
        commit("setListItems", response.data)
    },

    async fetchCards({ commit }) {
        const response = await axios.get('http://localhost:8000/wp-json//wp/v2/posts')
        commit("setCards", response.data)
    },

    async addCard ({ commit }, title) {
        let response = await axios.post(
            'http://localhost:8000/wp-json//wp/v2/posts',
            title, { headers:{'Authorization' : `Basic ${tokenY}`}}
        );
        console.log(response.data)
        commit ("newCard", response.data)
    },


};

const mutations= {
    setListItems:(state,list) => (state.listItems = list),
    setCards: (state, cardItems) => (state.cards = cardItems),
    newCard: (state, newCard) => state.cards.unshift(newCard),

};


export default{
    state,
    getters,
    actions,
    mutations,
}