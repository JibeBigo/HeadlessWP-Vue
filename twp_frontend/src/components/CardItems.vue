<template>
  <div>
    <v-dialog v-model="dialog" min-height="1200" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-card class="mb-2 cardItem" elevation="2" outlined v-bind="attrs" v-on="on">
          <v-card-text class="px-2 py-2">{{ card.title.rendered }}</v-card-text>
        </v-card>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">{{ card.title.rendered }}</v-card-title>

        <v-card-text class="mt-5">{{ renderComment(card.content.rendered) }}</v-card-text>

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
                <span>{{ renderComment(comment.content.rendered) }}</span>
                <v-icon
                  class="float-right ml-1"
                  color="red lighten-1"
                  @click="deleteComment(comment.id)"
                >{{ icons.mdiDelete }}</v-icon>
                <v-icon class="float-right" color="primary">{{ icons.mdiPencil }}</v-icon>
              </v-card>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiPlaylistCheck, mdiDelete, mdiPencil } from "@mdi/js";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["card"],
  name: "CardItems",

  data() {
    return {
      dialog: false,
      icons: { mdiPlaylistCheck, mdiDelete, mdiPencil },
      focused: false,
      newComment: "",
      editComment: "editing..."
    };
  },
  computed: {
    ...mapGetters(["allComments"]),
  },
  methods: {
    ...mapActions(["addComment", "deleteComment"]),
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
  },
};
</script>

<style scoped>
.cardItem {
  min-width: 255px;
}
.v-icon:hover {
  cursor: pointer;
}
</style>

