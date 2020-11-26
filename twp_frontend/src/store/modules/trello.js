import axios from "axios"
const token ='eWFuaXMuYmVraHRhb3VpQGVwaXRlY2guZXU6WWIxOTExOTMyMDI2'

const state = {
    listItems:[],
    user :[]
};

const actions= {

    async fetchListItems({commit}){
        const response = await axios.get('http://localhost:8000/wp-json/wp/v2/categories')
        console.log(response)
        commit("setListItems", response.data)
    },

    async addList({commit},newList){
        let response
        response = await axios.post('http://localhost:8000/wp-json/wp/v2/categories',newList,{
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
    },

    async deleteList({commit},id){
        console.log(id)
        await axios.delete(`http://localhost:8000/wp-json/wp/v2/categories/${id}?force=true`,{
            headers:{'Authorization':`Basic ${token}`
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
    newList:(state,newList) => state.listItems.push(newList),
    removeList:(state,id) => state.listItems = state.listItems.filter(list => list.id != id)
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