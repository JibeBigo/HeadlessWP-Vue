<template>
  <div class="d-flex">
    <div class="container-listCards d-flex">
      <div class="card-side-btn" v-for="list in allListItems" :key="list.id">
        <List v-bind:list="list" />
      </div>
    </div>
    <div class="addListButton">
      <v-btn v-bind:class="{none:formOn}" @click="toggle" color="primary">
        <v-icon size="15">mdi-plus</v-icon>Add another list
      </v-btn>
      <div v-if="formOn">
        <v-form @submit="submit">
          <v-card width="250">
            <v-text-field class="mr-5 ml-5" label="title" v-on="title"></v-text-field>
            <v-btn color="green lighten-1">Add List</v-btn>
            <v-btn @click="toggle" icon>X</v-btn>
          </v-card>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import List from "../components/List";

export default {
  name: "ListItems",

  data() {
    return {
      formOn: false,
      title: "",
    };
  },

  components: {
    List,
  },

  computed: {
    ...mapGetters(["allListItems"]),
  },

  methods: {
    ...mapActions(["fetchListItems"]),

    toggle() {
      this.formOn = !this.formOn;
    },

    submit() {
      event.preventDefault();
      console.log(this.title);
    },
  },

  created() {
    this.fetchListItems();
  },
};
</script>

<style scoped>
.container-listCards {
  margin-top: 15px;
  margin-left: 15px;
}

.addListButton{
  margin-top: 15px;
}

.card-side-btn {
  display: flex;
}
.none {
  display: none;
}

.v-main__wrap{
  background-color:#0288D1;
}
</style>