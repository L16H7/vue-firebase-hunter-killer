<template lang="pug">
  v-container
    v-flex(
      sm4
      v-if="!playersReady"
    )
      game-menu

    v-flex(
      v-else
    )
      game-board
</template>
<script>
import GameMenu from '@/components/GameMenu.vue';
import GameBoard from '@/components/GameBoard.vue';

export default {
  components: {
    GameMenu,
    GameBoard,
  },
  computed: {
    playersReady() {
      return this.$store.state.game.playersReady;
    },
  },
};
</script>
