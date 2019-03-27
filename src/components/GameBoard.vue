<template lang="pug">
  v-container
    v-layout(
      v-for="i in gridsPerRow"
    )
      v-flex(
        v-for="(grid, j) in itemCountInRow(i)"
        :key="j"
      ) {{ grid }}
</template>
<script>
export default {
  data: () => ({
    gridsPerRow: 4,
  }),
  computed: {
    board() {
      return this.$store.state.game.board;
    },
  },
  methods: {
    itemCountInRow(index) {
      return this.board.slice((index - 1) * this.gridsPerRow, index * this.gridsPerRow);
    },
  },
};
</script>
