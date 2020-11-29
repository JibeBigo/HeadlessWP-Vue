import axios from "axios"
const token = "amJzaWx2ZXN0cmVAaG90bWFpbC5mcjpHQlJ3b0FEYmQ5SWlUZnFhell3SSR2Rnc";

const state = {
    listItems: [],
    cards: [],
    user: [],
    users: [],
    comments: [],
};

const getters = {
    allListItems: (state) => state.listItems,
    allCards: (state) => state.cards,
    allUsers: (state) => state.users,
    allComments: (state) => state.comments,
};

const actions = {
  async fetchComments({ commit }) {
    const response = await axios.get(
      "http://localhost:8000/wp-json/wp/v2/comments?_fields=author_name,post,content,date,id",
    );
    response.data.forEach((comment) => {
      comment.content.rendered = comment.content.rendered.replace(
        /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        "",
      );
      comment.edit = false;
    });
    commit("setComments", response.data);
  },

  async addComment({ commit }, comment) {
    const response = await axios.post(
      "http://localhost:8000/wp-json/wp/v2/comments",
      comment,
      {
        headers: { Authorization: `Basic ${token}` },
      },
    );
    response.data.content.rendered = response.data.content.rendered.replace(
      /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      "",
    );
    response.data.edit = false;
    commit("newComment", response.data);
  },

  async deleteComment({ commit }, id) {
    const response = await axios.delete(
      `http://localhost:8000/wp-json/wp/v2/comments/${id}?force=true`,
      {
        headers: { Authorization: `Basic ${token}` },
      },
    );
    commit("removeComment", response.data.previous.id);
  },

  async editComment({ commit }, comment) {
    comment.content.raw = comment.content.rendered;
    const response =await axios.post(
      `http://localhost:8000/wp-json/wp/v2/comments/${comment.id}`, comment,
      {
        headers: { Authorization: `Basic ${token}` },
      },
    );
    console.log(response)
    commit("updateComment");
  },

  async fetchUsers({ commit }) {
    const response = await axios.get(
      "http://localhost:8000/wp-json/wp/v2/users/",
      {
        headers: { Authorization: `Basic ${token}` },
      },
    );
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
  async fetchListItems({ commit }) {
    const response = await axios.get(
      "http://localhost:8000/wp-json/wp/v2/categories",
    );
    commit("setListItems", response.data);
  },

  async addList({ commit }, newList) {
    let response;
    response = await axios
      .post("http://localhost:8000/wp-json/wp/v2/categories", newList, {
        headers: { Authorization: `Basic ${token}` },
      })
    commit("newList", response.data);
  },

  async deleteList({ commit }, id) {
    await axios
      .delete(
        `http://localhost:8000/wp-json/wp/v2/categories/${id}?force=true`,
        {
          headers: { Authorization: `Basic ${token}` },
        },
      )
    commit("removeList", id);
  },

  async updateList({ commit }, { updateList, id }) {
    console.log(updateList);
    console.log(id);
    let response = await axios.post(
      `http://localhost:8000/wp-json/wp/v2/categories/${id}`,
      updateList,
      {
        headers: { Authorization: `Basic ${token}` },
      },
    );
    console.log(response);

    commit("freshList", updateList);
  },

  async fetchCards({ commit }) {
    const response = await axios.get(
      "http://localhost:8000/wp-json//wp/v2/posts",
    );
    commit("setCards", response.data);
  },

  async addCard({ commit }, title) {
    let response = await axios.post(
      "http://localhost:8000/wp-json//wp/v2/posts",
      title,
      { headers: { Authorization: `Basic ${token}` } },
    );
    console.log(response.data);
    commit("newCard", response.data);
  },

  async deleteCard({ commit }, id) {
    await axios.delete(
      `http://localhost:8000/wp-json//wp/v2/posts/${id}?force=true`,
      {
        headers: { Authorization: `Basic ${token}` },
      },
    );
    commit("removeCard", id);
  },
  async addDescription({ commit }, description) {
        const response = await axios.post(
        `http://localhost:8000/wp-json/wp/v2/posts/${description.id}`,
        description,
        {
            headers: { Authorization: `Basic ${token}` },
        },
        );
        console.log(response)
        commit("updateCard", response.data);
    },

    async editCardTitle({ commit }, newTitle) {
        let response = await axios.post(
        `http://localhost:8000/wp-json/wp/v2/posts/${newTitle.id}`,
        newTitle,
        {
            headers: { Authorization: `Basic ${token}` },
        },
        );

        console.log(response);
        commit("updateCardTitle", response.data);
    },

    async editCardTitleInModal({ commit }, updateNewTitle) {
        let response = await axios.post(
        `http://localhost:8000/wp-json/wp/v2/posts/${updateNewTitle.id}`,
        updateNewTitle,
        {
            headers: { Authorization: `Basic ${token}` },
        },
        );
        console.log(response);

        commit("updateCardTitleInModal", response.data);
    },
};


const mutations = {
    setListItems: (state, list) => (state.listItems = list),
    newList: (state, newList) => state.listItems.push(newList),
    removeList: (state, id) =>
        (state.listItems = state.listItems.filter((list) => list.id != id)),
    setCards: (state, cardItems) => (state.cards = cardItems),
    newCard: (state, newCard) => state.cards.unshift(newCard),
    removeCard:(state,id) => state.cards = state.cards.filter(card => card.id != id),
    setUsers: (state, users) => (state.users = users),
    setComments: (state, comments) => (state.comments = comments),
    newComment: (state, comment) => state.comments.unshift(comment),
    removeComment: (state, id) =>
        (state.comments = state.comments.filter((comment) => comment.id != id)),
    updateComment: () => {
        // do nothing cause it works
        // let index = state.comments.findIndex((oldComment) => oldComment.id === comment.id);
        // state.comments[index].content.rendered = comment.content.rendered;
    },
    freshList: () => { return true },
    updateCard: (state) => console.log(state),
    updateCardTitle: (state) => console.log(state),
    updateCardTitleInModal: (state) => console.log(state),

};

export default {
    state,
    getters,
    actions,
    mutations,
};
