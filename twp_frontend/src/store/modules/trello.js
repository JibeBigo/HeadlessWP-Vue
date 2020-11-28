import axios from "axios"
const token ="eWFuaXMuYmVraHRhb3VpQGVwaXRlY2guZXU6WWIxOTExOTMyMDI2"

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
        console.log(response)
        commit("setListItems", response.data);
    },

    async addList({ commit }, newList) {
        let response;
        response = await axios
        .post("http://localhost:8000/wp-json/wp/v2/categories", newList, {
            headers: { Authorization: `Basic ${token}` },
        })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
        console.log(response);

        commit("newList", newList);
    },

    async deleteList({ commit }, id) {
        await axios
        .delete(
            `http://localhost:8000/wp-json/wp/v2/categories/${id}?force=true`,
            {
            headers: { Authorization: `Basic ${token}` },
            },
        )
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });

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
        console.log(response.data)
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
    await axios.delete(`http://localhost:8000/wp-json//wp/v2/posts/${id}?force=true`, {
    headers: { 'Authorization': `Basic ${token}` }
    });
    commit("removeCard", id)
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
};

export default {
    state,
    getters,
    actions,
    mutations,
};
