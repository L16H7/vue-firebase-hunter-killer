<template lang="pug">
  v-container
    v-flex(
      sm4
    )
      game-menu
</template>
<script>
import GameMenu from '@/components/GameMenu.vue';

export default {
  components: {
    GameMenu,
  },
};
</script>
