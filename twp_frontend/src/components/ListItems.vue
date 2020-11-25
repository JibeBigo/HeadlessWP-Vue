<template>
<div>
  <div class="container-listCards">
    <div class="card-side-btn" v-for="list in allListItems" :key="list.id">
     <List v-bind:list="list"/>
</div>
<v-btn v-bind:class="{none:formOn}" @click="toggle" color="primary"><v-icon size="15">mdi-plus</v-icon> Add another list</v-btn>
     <div v-if="formOn">
        <v-form @submit="onSubmit">
         <v-card width="250">
           <v-text-field class="mr-5 ml-5" label="title" v-model="title"></v-text-field>
           <v-btn color="green lighten-1" type="submit">Add List</v-btn>
           <v-btn @click="toggle" icon>X</v-btn>
          </v-card>
        </v-form>
     </div>
  </div>
</div>

</template>

<script>
import {mapGetters,mapActions} from "vuex"
import List from "../components/List"
export default {
    name:"ListItems",

    data(){
      return{
        formOn:false,
        title:""
      }
    },

    components:{
      List
    },

    computed:{
    ...mapGetters(["allListItems"])
    },

    methods:{
      ...mapActions(["fetchListItems","addList"]),

      toggle(){
        this.formOn = !this.formOn
      },

      onSubmit(){
        event.preventDefault()
        console.log(this.title)
        let newList = {
          description:"",
          name:this.title,
          slug:this.title.toLowerCase(),
          parent_id:0,
          meta:[]
        }
        this.title=""
        this.addList(newList)
        console.log(newList)
      }
    },

    created (){
    this.fetchListItems()
    }
}

</script>

<style>
.container-listCards{
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

.card-side-btn{
  display: flex;
}
.none{
  display:none
}
.container-listCards{
  display: flex;
}
</style>