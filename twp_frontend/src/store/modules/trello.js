import axios from "axios"
const token ='eWFuaXMuYmVraHRhb3VpQGVwaXRlY2guZXU6WWIxOTExOTMyMDI2'

const state = {
    listItems:[],
    user :[]
};

const actions= {

    async fetchListItems({commit}){
        const response = await axios.get('http://localhost:8000/?rest_route=/wp/v2/categories')
        console.log(response.data)
        commit("setListItems", response.data)
    },

    async addList({commit},newList){
        
        let response
        response = await axios.post('http://localhost:8000/?rest_route=/wp/v2/categories',newList,{
            headers:{'Authorization':`Basic ${token}`
            }
            
        })
        .then( response =>{
            console.log(response)
        }).catch(err =>{
            console.log(err)
        })
        console.log(response)

        commit("newList",newList)
    }
};
const mutations= {
    setListItems:(state,list) => (state.listItems = list),
    newList:(state,newList) => state.listItems.push(newList)
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