import axios from "axios"

const state = {
    listItems:[],
    user :[]
};

const actions= {

    async fetchListItems({commit}){
        const response = await axios.get('http://localhost:8000/?rest_route=/wp/v2/categories')
        console.log(response.data)
        commit("setListItems", response.data)
    }
};
const mutations= {
    setListItems:(state,list) => (state.listItems = list)
};
const getters= {
    allListItems:(state) => state.listItems
};

export default{
    state,
    mutations,
    actions,
    getters,

}