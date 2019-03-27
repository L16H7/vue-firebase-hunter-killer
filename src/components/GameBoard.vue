<template lang="pug">
  v-container
    v-layout
      v-text-field(
        solo
        placeholder="Start Position"
        v-model="position"
      )
      v-btn(
        color="primary"
        @click="setPlayerPosition"
        :disabled="isPlayerReady"
      ) Start

    v-layout(
      v-if="!isGameReady"
    )
      v-chip(
        color="primary"
        label
        outline
        ) Waiting for other player...

    v-layout(
      v-for="i in gridsPerRow"
    )
      v-flex(
        v-for="(grid, j) in itemCountInRow(i)"
        :key="j"
      )
        v-btn.grid(
          block
          :disabled="!isGameReady || !isMyTurn"
          @click="fireEnemyGrid( ((i - 1) * gridsPerRow) + j )"
        )
          span(v-if="!isPlayerReady") {{ ((i - 1) * gridsPerRow) + j }}
          span(v-else)
            v-icon {{ getIcon(  ((i - 1) * gridsPerRow) + j ) }}
</template>
<script>
export default {
  data: () => ({
    gridsPerRow: 4,
    position: 0,
    isPlayerReady: false,
  }),
  computed: {
    board() {
      return this.$store.state.game.board;
    },

    isGameReady() {
      const { board } = this.$store.state.game;
      const isPlayer1Set = board.indexOf(1) > -1;
      const isPlayer2Set = board.indexOf(2) > -1;

      return (isPlayer1Set && isPlayer2Set);
    },

    isMyTurn() {
      return (this.$store.state.game.currentPlayer
         === this.$store.state.player);
    },
  },
  methods: {
    itemCountInRow(index) {
      return this.board.slice((index - 1) * this.gridsPerRow, index * this.gridsPerRow);
    },

    getIcon(coordinate) {
      return (coordinate === parseInt(this.position, 10)) ? 'directions_boat' : 'waves';
    },

    setPlayerPosition() {
      if (this.position < 0 || this.position > 15) {
        this.position = 0;
        return;
      }
      this.$store.dispatch('setPlayerPosition', this.position);
      this.isPlayerReady = true;
    },

    fireEnemyGrid(coordinate) {
      this.$store.dispatch('fireEnemyGrid', coordinate);
    },
  },
};
</script>
<style scoped>
.flex >>> .v-btn.grid {
  height: 10vw;
  margin: 0px;
}
.layout >>> .flex {
  margin: 1px;
}
</style>
