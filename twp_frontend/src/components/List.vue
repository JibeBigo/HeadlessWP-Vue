<template>
    <div class="container-card">
        <v-card class="mr-5" width="250" min-height="200">
           <v-card-title>{{card.description}}</v-card-title>
           <!-- <v-list-cards>SPOT FOR THE COMMENT CARD BODY</v-list-cards> -->
        </v-card>
    </div>
</template>

<script>
export default {
    name:"List",
    props:["card"]
}

</script>

<style scoped>
.container-card{
    display: flex;
}
</style>