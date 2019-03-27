<template lang="pug">
  v-container
    v-flex(
      sm4
      v-if="!playersReady"
    )
      game-menu

    v-flex(
      v-else
    ) gameboard
</template>
<script>
import GameMenu from '@/components/GameMenu.vue';

export default {
  components: {
    GameMenu,
  },
  computed: {
    playersReady() {
      return this.$store.state.game.playersReady;
    },
  },
};
</script>
