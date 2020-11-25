import axios from "axios"

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
        const response = await axios.get('http://localhost:8000/?rest_route=/wp/v2/categories')
        commit("setListItems", response.data)
    },

    async fetchCards({ commit }) {
        const response = await axios.get('http://localhost:8000/?rest_route=/wp/v2/posts')
        console.log(response.data)
        commit("setCards", response.data)
    },

    async addCard ({ commit }, title) {
        let response = await axios.post(
            'http://localhost:8000/?rest_route=/wp/v2/posts',
            { title }
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