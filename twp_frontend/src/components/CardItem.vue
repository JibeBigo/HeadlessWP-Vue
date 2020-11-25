<template>
    <v-card
        class="m-4 rounded-tl-xl rounded-br-xl"
        elevation="24"
        outlined
    >
        <v-card-title>Test</v-card-title>
        <v-card-text>
            <v-icon> {{ icons.mdiPlaylistCheck}} </v-icon>
        </v-card-text>

    </v-card>
</template>

<script>
import { mdiPlaylistCheck } from '@mdi/js'

export default {
    name: "CardItem",
    data () {
        return {
            icons: { mdiPlaylistCheck },
        }
    }

}
</script>

<style>

</style>

