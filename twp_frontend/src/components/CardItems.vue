<template>
    <div>
        <v-dialog
            v-model="dialog"
            min-height="800"
            width="600"
        >
            <template v-slot:activator="{ on, attrs }">
                    <v-card
                        class="mb-4 rounded-tl-xl rounded-br-xl"
                        elevation="10"
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        width="220"
                    >
                        <v-card-title> {{ card.title.rendered }} </v-card-title>
                        <v-card-text> 
                            <v-icon v-if="card.content.rendered"> {{ icons.mdiPlaylistCheck }} </v-icon>
                            <v-icon v-else></v-icon>
                        </v-card-text>
                    </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script>
import { mdiPlaylistCheck } from '@mdi/js'

export default {
    props: ["card"],
    name: "CardItems",

    data () {
        return {
            dialog: false,
            icons: { mdiPlaylistCheck },
        }
    },

}
</script>

<style>

</style>

