<template>
    <div class="container-card">
        <v-card class="mr-2 blue-grey lighten-5" width="272" min-height="100">
        <div class="d-flex justify-space-between align-center">
            <v-card-title class="pointer py-0">
            <input
                ref="input"
                v-on:keyup.enter="updateTitleList(list)"
                @click="inputStyle"
                @blur="onCloseInput"
                v-bind:class="{updateFocus:input}"
                class="textarea-update"
                type="text"
                v-model="newListTitle"
            />
            </v-card-title>
            <v-btn v-click-outside="toggleCloseModal" @click="toggleModal" icon>
            <v-icon>{{icons.mdiDotsHorizontal}}</v-icon>
            </v-btn>
        </div>
        <div v-if="modalList" class="modal">
            <v-card>
            <v-card-title class="d-flex justify-center">
                <span>List Actions</span>
                <v-btn class="modalCorner" @click="toggleCloseModal" icon>
                <v-icon>{{icons.mdiClose}}</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider class="ml-5 mr-5"></v-divider>
            <v-card-text>
                <v-list>
                <div class="container-deleteList">
                    <p class="deleteListAction">Delete List</p>
                    <v-btn @click="cancelList(list.id)" icon color="red lighten-1">
                    <v-icon>{{icons.mdiCloseCircleOutline}}</v-icon>
                    </v-btn>
                </div>
                </v-list>
            </v-card-text>
            </v-card>
        </div>
    
        <!-- <v-list-cards>SPOT FOR THE COMMENT CARD BODY</v-list-cards> -->
        <div v-for="card in allCards" :key="card.id">
        <v-list-item v-if="card.categories[0] === list.id" class="mx-auto px-2">
            <CardItems v-bind:card="card" v-bind:list="list" />
        </v-list-item>
        </div>
        <div class="addCard">
        <v-btn v-bind:class="{none:formOn}" @click="toggle"   v-click-outside="toggleCloseAddCard" depressed>
            <v-icon size="15">mdi-plus</v-icon>Add another card
        </v-btn>
        <div v-if="formOn">
            <v-form @submit="onSubmit">
            <v-card width="250">
                <v-textarea
                v-model="cardTitle"
                class="mr-5 ml-5"
                placeholder="Enter a title for this card..."
                rows="2"
                ></v-textarea>
                <v-btn class="ml-4 white--text mb-2" color="green lighten-1" type="submit">Add Card</v-btn>
                <v-btn class="mb-2" @click="toggle" icon><v-icon>{{icons.mdiClose}}</v-icon></v-btn>
            </v-card>
            </v-form>
        </div>
        </div>
        </v-card>
    </div>
</template>
<script>
import { mdiDotsHorizontal, mdiClose, mdiCloseCircleOutline } from "@mdi/js";
import CardItems from "@/components/CardItems.vue";
import { mapGetters, mapActions } from "vuex";
import ClickOutside from "vue-click-outside";
export default {
    name: "List",
    props: ["list"],
    data() {
        return {
        icons: { mdiDotsHorizontal, mdiClose, mdiCloseCircleOutline },
        modalList: false,
        cardTitle: "",
        formOn: false,
        newListTitle: this.list.name,
        input: false,
        };
    },
    components: { CardItems },
    methods: {
        ...mapActions(["deleteList", "fetchCards", "addCard", "updateList"]),
        toggleModal() {
            this.modalList = !this.modalList
        },
        toggleCloseModal() {
        this.modalList = false;
        },
        toggle() {
        this.formOn = !this.formOn;
        },
        toggleCloseAddCard(){
            this.formOn = false
        },
        //function to open input when cliking
        inputStyle() {
        this.input = true;
        },
        //function to close input when clicking outside
        onCloseInput() {
        this.input = false;
        },
        cancelList(id) {
        console.log(id);
        this.deleteList(id);
        },
        onSubmit(event) {
        event.preventDefault();
        let newCard = {
            title: this.cardTitle,
            status: "publish",
            content: "",
            categories: this.list.id,
        };
        console.log(newCard,"newCard");
        this.addCard(newCard);
        this.cardTitle = "";
        },
        updateTitleList(list) {
        event.preventDefault();
        const id = list.id;
        console.log(id, "id");
        let updateList = {
            id: list.id,
            description: list.description,
            name: this.newListTitle,
            slug: list.slug,
            parent: list.parent,
            meta: list.meta,
        };
        this.updateList({ updateList, id });
        },
    },
    computed: {
        ...mapGetters(["allCards"]),
    },
    created() {
        this.fetchCards();
    },
    mounted() {
        this.popupItem = this.$el;
    },
    directives: {
        ClickOutside,
    },
};
</script>
<style scoped>
.addCard {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
.container-card {
  display: flex;
}
.modal {
  position: absolute;
  left: 190px;
  top: 55px;
  width: 300px;
  z-index: 1;
}
.container-deleteList {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.deleteListAction {
  margin-bottom: 0px;
}
.modalCorner {
  position: absolute;
  right: 0;
  top: 0;
}
.textarea-update {
  width: 100%;
  height: 25px;
  outline: none;
  text-indent: 5px;
  border:1px solid #eceff1;
 background-color:#eceff1;
}
.updateFocus {
    background-color: white;
    border: 2px solid #1e88e5;
    border-radius: 2px;
}
::placeholder {
  font-size: 15px;
  padding-bottom: 10px;
  color: black;
}
.none{
    display: none;
}
</style>