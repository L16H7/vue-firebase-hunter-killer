<template lang="pug">
  v-container(
    style="display: flex; justify-content: center;"
  )
    v-flex(
      sm4
      xs10
      v-if="!playersReady"
    )
      game-menu

    v-flex(
      sm6
      xs12
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
