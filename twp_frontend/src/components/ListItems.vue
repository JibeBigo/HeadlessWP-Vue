<template>
  <div>
    <div class="container-listCards">
      <div class="card-side-btn" v-for="(list,index) in allListItems" :key="index">
        <List v-bind:list="list" />
      </div>
      <v-btn v-bind:class="{none:formOn}" @click="toggle" color="blue lighten-2">
        <v-icon size="15">mdi-plus</v-icon>Add another list
      </v-btn>
      <div class="modal" v-if="formOn">
        <v-form @submit="onSubmit">
          <v-card width="250">
            <v-text-field class="mr-5 ml-5" placeholder="Enter list title..." v-model="title"></v-text-field>
            <v-btn color="green lighten-1" class="white--text ml-4" type="submit">Add List</v-btn>
            <v-btn @click="toggle" icon>
              <v-icon>{{icons.mdiClose}}</v-icon>
            </v-btn>
          </v-card>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import List from "../components/List";
import { mdiClose } from "@mdi/js";

export default {
  name: "ListItems",

  props: ["allListItemsFiltered"],

  data() {
    return {
      icons: { mdiClose },
      formOn: false,
      title: "",
    };
  },

  components: {
    List,
  },

  computed: {
    ...mapGetters(["allListItems", "allComments"]),
  },

  methods: {
    ...mapActions(["fetchListItems", "addList", "fetchComments"]),

    toggle() {
      this.formOn = !this.formOn;
    },
    onSubmit() {
      event.preventDefault();
      console.log(this.title);
      let newList = {
        description: "",
        name: this.title,
        slug: this.title.toLowerCase(),
        parent_id: 0,
        meta: [],
      };
      this.title = "";
      this.addList(newList);
      console.log(newList);
    },
    submit() {
      event.preventDefault();
      console.log(this.title);
    },
  },

  created() {
    this.fetchListItems();
    this.fetchComments();
  },
};
</script>

<style scoped>
.container-listCards {
  margin-top: 15px;
  margin-left: 15px;
}

.addListButton {
  margin-top: 15px;
}

.card-side-btn {
  display: flex;
  height: fit-content;
}
.none {
  display: none;
}

.v-main__wrap {
  background-color: #0288d1;
}
.container-listCards {
  display: flex;
}
.modal {
  z-index: 1;
}
</style>