import axios from "axios"
const token ='eWFuaXMuYmVraHRhb3VpQGVwaXRlY2guZXU6WWIxOTExOTMyMDI2'

const state = {
  listItems: [],
  user: [],
  users: [],
};

const actions = {
  async fetchListItems({ commit }) {
    const response = await axios.get(
      "http://localhost:8000/wp-json/wp/v2/categories",
    );
    commit("setListItems", response.data);
  },

  async fetchUsers({ commit }) {
    const response = await axios.get(
      "http://localhost:8000/wp-json/wp/v2/users/",
      {
        auth: {
          username: "jb",
          password: "GBRwoADbd9IiTfqazYwI$vFw",
        },
      },
    );
    console.log(response.data);
    commit("setUsers", response.data);
  },
  //   async createUser({ commit }, user) {
  //     var response = await axios.post(
  //       "http://localhost:8000/?rest_route=/wp/v2/users",
  //       {
  //         name: user.name,
  //         email: user.email,
  //         password: user.password,
  //       },
  //     );
  //     commit("newUser", response.data.note);
  //     // const newNote = actions.fetchNote(response.data.note._id);
  //     // commit("newNote", newNote);
  //   },
};
const mutations = {
  setListItems: (state, list) => (state.listItems = list),
  setUsers: (state, user) => (state.users = user),
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
const getters = {
  allListItems: (state) => state.listItems,
  allUsers: (state) => state.users,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
