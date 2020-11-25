<template>
  <div class="home">
    <CardItem />
  </div>
</template>

<script>
// @ is an alias to /src
import CardItem from '@/components/CardItem.vue'


export default {
  name: 'Home',
  components: {
    CardItem,
  }
}
</script>
