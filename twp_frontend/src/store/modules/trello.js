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
        commit ("newCard", response.data)
    },

    async addList({commit},newList){
        let response
        response = await axios.post('http://localhost:8000/wp-json/wp/v2/categories',newList,{
            headers:{'Authorization':`Basic ${tokenY}`
            }
            
        })
        .then( response =>{
            console.log(response)
        }).catch(err =>{
            console.log(err)
        })
        console.log(response)

        commit("newList",newList)
    },

    async deleteList({commit},id){
        console.log(id)
        await axios.delete(`http://localhost:8000/wp-json/wp/v2/categories/${id}?force=true`,{
            headers:{'Authorization':`Basic ${tokenY}`
            }
        }).then(response =>{
            console.log(response)
        }).catch(err =>{
            console.log(err)
        })

        commit("removeList",id)
    }
};

const mutations= {
    setListItems:(state,list) => (state.listItems = list),
    setCards: (state, cardItems) => (state.cards = cardItems),
    newCard: (state, newCard) => state.cards.unshift(newCard),
    newList:(state,newList) => state.listItems.push(newList),
    removeList:(state,id) => state.listItems = state.listItems.filter(list => list.id != id)
};


export default{
    state,
    getters,
    actions,
    mutations,
}