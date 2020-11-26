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
                    elevation="5"
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

            <v-card>
            <v-card-title class="headline grey lighten-2">
            Privacy Policy
            </v-card-title>

            <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="dialog = false"
            >
                I accept
            </v-btn>
            </v-card-actions>
      </v-card>
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

