<template>
    <v-card
        class="m-4 rounded-tl-xl rounded-br-xl"
        elevation="10"
        outlined
        width="100%"
    >
        <v-card-title> {{ card.title.rendered }} </v-card-title>
        <v-card-text> 
            <v-icon v-if="card.content.rendered"> {{ icons.mdiPlaylistCheck }} </v-icon>
            <v-icon v-else></v-icon>
        </v-card-text>

    </v-card>
</template>

<script>
import { mdiPlaylistCheck } from '@mdi/js'

export default {
    props: ["card"],
    name: "CardItems",

    data () {
        return {
            icons: { mdiPlaylistCheck },
        }
    },

}
</script>

<style>

</style>

