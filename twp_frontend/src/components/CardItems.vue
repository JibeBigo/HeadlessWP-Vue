<template>
  <div class="d-flex justify-space-between">
    <v-dialog v-model="dialog" min-height="1200" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-card class="mb-2 cardItem" elevation="2" outlined v-bind="attrs" v-on="on">
          <v-card-text class="px-2 pt-2 pb-0">{{ newCardTitle }}</v-card-text>
          <v-icon v-if="card.content.rendered" class="ml-2">{{ icons.mdiPlaylistCheck }}</v-icon>
        </v-card>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          <input
            v-on:click="inputStyle"
            v-on:blur="onCloseInput"
            class="textarea-update-card-title"
            ref="input"
            type="text"
            v-bind:class="{updateFocusCardTitle:input}"
            v-on:keyup.enter="submitNewTitleCardInModal(card)"
            v-model="newCardTitle"
          />
          <!-- {{ card.title.rendered }} -->
        </v-card-title>

        <v-card-subtitle class="mt-1">
          <p id="txtColor">in list {{ list.name }}</p>
        </v-card-subtitle>

        <v-card-text class="d-flex flex-row-reverse align-center">
          <div width="30%">
            <v-list>
              <v-list-item class="mb-3" id="alignItem">Actions</v-list-item>
              <v-list-item>
                <v-btn @click="archiveCard(card.id)" class="d-flex align-items">
                  <div>
                    <v-icon>{{ icons.mdiArchive }}</v-icon>
                  </div>
                  <div>
                    <p class="ml-1 mb-0">Archive card</p>
                  </div>
                </v-btn>
              </v-list-item>
            </v-list>
          </div>
          <div width="70%">
            <div class="d-flex align-items mb-3">
              <v-icon>{{ icons.mdiPlaylistCheck }}</v-icon>
              <h1 class="ml-1 mb-0">Description</h1>
            </div>

            <div>
              <v-btn
                v-bind:class="{none:formDescOn}"
                @click="toggleDesc"
              >Add a more Detailed description...</v-btn>
              <div v-if="formDescOn" v-click-outside="toggleCloseAddDesc">
                <v-form @submit="onSubmitDesc(card)">
                  <v-card width="250">
                    <v-textarea
                      class="mr-5 ml-5"
                      clearable
                      counter
                      placeholder="Add a more detailed description..."
                      rows="2"
                      v-model="description"
                    ></v-textarea>
                    <v-btn color="green lighten-1" class="white--text ml-4" type="submit">Save</v-btn>
                    <v-btn @click="toggleDesc" icon>
                      <v-icon>{{icons.mdiClose}}</v-icon>
                    </v-btn>
                  </v-card>
                </v-form>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-text class="mt-5">{{ renderComment(description) }}</v-card-text>

        <v-card-text class="pl-4 pb-0">
          <span>
            <strong>Comments</strong>
          </span>

          <v-card-text class="d-flex pa-0">
            <v-avatar color="primary" size="30" class="white--text mt-2">JB</v-avatar>
            <v-text-field
              v-model="newComment"
              @focus="focused=true"
              class="pb-0 pt-1 ml-3 font-weight-light"
              label="Write a comment..."
            ></v-text-field>
            <v-btn
              color="primary"
              v-if="focused"
              :disabled="newComment.length < 1"
              class="mt-1"
              @click="submitComment()"
            >Save</v-btn>
          </v-card-text>

          <div v-for="comment in allComments" :key="comment.id" class="mt-2">
            <div v-if="comment.post === card.id">
              <v-avatar color="primary" size="30" class="white--text">JB</v-avatar>
              <strong class="ml-5 mr-2">{{ comment.author_name }}</strong>
              <span>{{ timeAgo(Date.parse(comment.date)) }}</span>
              <br />
              <v-card class="pa-2 ml-10">
                <span v-show="!comment.edit">{{ comment.content.rendered }}</span>
                <input
                  type="text"
                  ref="input"
                  v-model="comment.content.rendered"
                  v-show="comment.edit"
                  class="edit-comment-input pl-2"
                />
                <v-icon
                  class="float-right mt-1 ml-1"
                  v-show="comment.edit"
                  @click="toggleEditComment(this, comment)"
                >{{icons.mdiClose}}</v-icon>
                <v-btn
                  color="success"
                  class="float-right ml-1"
                  v-show="comment.edit"
                  @click="saveEditComment(this, comment)"
                >Save</v-btn>
                <v-icon
                  class="float-right ml-1"
                  color="red lighten-1"
                  v-show="!comment.edit"
                  @click="deleteComment(comment.id)"
                >{{ icons.mdiDelete }}</v-icon>
                <v-icon
                  class="float-right"
                  color="primary"
                  v-show="!comment.edit"
                  @click="toggleEditComment(this, comment)"
                >{{ icons.mdiPencil }}</v-icon>
              </v-card>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div>
      <v-card class="mb-2" elevation="2" outlined>
        <v-btn @click="toggleTitlePost" depressed icon x-small>
          <!-- v-click-outside="toggleCloseTitleCard" -->
          <v-icon>{{ icons.mdiPencil }}</v-icon>
        </v-btn>
      </v-card>
    </div>

    <div v-if="modalTitleCard" class="modalEditTitleCard">
      <v-form @submit="submitNewTitleCard(card)">
        <v-card>
          <v-card-title class="d-flex">
            <v-text-field v-model="newCardTitle"></v-text-field>
            <v-btn @click="toggleTitlePost" class="modalCorner" icon>
              <!-- @click="toggleCloseTitleCard" -->
              <v-icon>{{icons.mdiClose}}</v-icon>
            </v-btn>
          </v-card-title>
          <v-btn class="white--text ml-4 mb-1" color="green lighten-1" type="submit">Save</v-btn>
        </v-card>
      </v-form>
    </div>
  </div>
</template>

<script>
import {
  mdiPlaylistCheck,
  mdiArchive,
  mdiClose,
  mdiDelete,
  mdiPencil,
} from "@mdi/js";
import { mapGetters, mapActions } from "vuex";
// import ClickOutside from "vue-click-outside";

export default {
  props: ["card", "list"],
  name: "CardItems",

  data() {
    return {
      dialog: false,
      formDescOn: false,
      formOn: false,
      modalTitleCard: false,
      icons: { mdiPlaylistCheck, mdiDelete, mdiPencil, mdiArchive, mdiClose },
      focused: false,
      description: this.renderDesc(this.card.content.rendered),
      newCardTitle: this.card.title.rendered,
      newComment: "",
      input: false,
    };
  },
  computed: {
    ...mapGetters(["allComments"]),
  },
  methods: {
    ...mapActions([
      "addComment",
      "deleteComment",
      "deleteCard",
      "addDescription",
      "editCardTitle",
      "editCardTitleInModal",
    ]),
    archiveCard(id) {
      this.deleteCard(id);
    },

    toggleDesc() {
      this.formDescOn = !this.formDescOn;
    },

    renderDesc: (description) => {
      return description.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, "");
    },

    renderComment: (comment) => {
      return comment.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, "");
    },
    submitComment: function () {
      const comment = {
        author: 1,
        post: this.card.id,
        content: this.newComment,
      };
      this.addComment(comment);
      this.newComment = "";
    },
    toggleEditComment: function (ev, comment) {
      comment.edit = !comment.edit;
    },
    saveEditComment: function (ev, comment) {
      this.toggleEditComment(ev, comment);
      this.editComment(comment);
    },
    timeAgo: (date) => {
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
      }
      if (Math.floor(seconds) < 30) return "just now";
      else return Math.floor(seconds) + " seconds ago";
    },

    toggleCloseAddDesc() {
      this.formDescOn = false;
    },

    toggleCloseTitleCard() {
      this.modalTitleCard = false;
    },

    toggleTitlePost() {
      this.modalTitleCard = !this.modalTitleCard;
    },

    onSubmitDesc(card) {
      event.preventDefault();
      let newDesc = {
        id: card.id,
        content: this.description,
      };
      this.addDescription(newDesc);
      this.toggleDesc();
    },

    submitNewTitleCard(card) {
      console.log(card.id);
      console.log(card.title);
      event.preventDefault();
      let updCardTitle = {
        id: card.id,
        title: this.newCardTitle,
      };
      this.editCardTitle(updCardTitle);
      this.toggleTitlePost();
    },

    //function to open input when cliking
    inputStyle() {
      this.input = true;
    },

    //function to close input when clicking outside
    onCloseInput() {
      this.input = false;
    },

    submitNewTitleCardInModal(card) {
      event.preventDefault();
      let updCardTitleInModal = {
        id: card.id,
        title: this.newCardTitle,
      };
      this.editCardTitleInModal(updCardTitleInModal);
    },

    // mounted() {
    //     this.popupItem = this.$el;
    // },

    // directives: {
    //     ClickOutside,
    // },
  },
};
</script>

<style scoped>
#alignItem {
  min-height: 0px;
}
#txtColor {
  font-weight: bold;
  color: #64b5f6;
  text-decoration: underline;
}
.cardItem {
  min-width: 255px;
}
.modalCorner {
  position: absolute;
  right: 0;
  top: 0;
}
.modalEditTitleCard {
  position: absolute;
  width: 276px;
  z-index: 1;
}
.textarea-update-card-title {
  width: 100%;
  height: 30px;
  outline: none;
  text-indent: 5px;
  border: 1px solid #e0e0e0;
  background-color: #e0e0e0;
}
.updateFocusCardTitle {
  background-color: #e0e0e0;
  border: 2px solid #e0e0e0;
  border-radius: 2px;
}
.v-icon:hover {
  cursor: pointer;
}
.edit-comment-input {
  background-color: white;
  border: 2px solid #1e88e5;
  border-radius: 2px;
  width: 390px;
  height: 38px;
}
</style>

