import axios from "axios";

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
