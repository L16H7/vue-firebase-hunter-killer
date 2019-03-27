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
      v-if="isGameReady && isMyTurn"
    )
      v-chip(
        color="primary"
        label
        outline
        ) Enemy attacked {{ enemyAttackedGrid }}!

    v-layout(
      v-if="isGameOver"
    )
      v-chip(
        color="primary"
        label
        outline
      ) {{ whoWin() }}
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
          :class="getColor( ((i - 1) * gridsPerRow) + j )"
        )
          span(v-if="!isPlayerReady") {{ ((i - 1) * gridsPerRow) + j }}
          span(v-else)
            v-icon {{ getIcon(  ((i - 1) * gridsPerRow) + j ) }}
</template>
<script>
export default {
  data: () => ({
    gridsPerRow: 4,
    position: '',
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

    enemyAttackedGrid() {
      return this.$store.state.game.lastHit;
    },

    isGameOver() {
      const { lastHit } = this.$store.state.game;
      const { board } = this.$store.state.game;
      if (board[lastHit] !== 0) {
        return board[lastHit];
      }
      return '';
    },
  },
  methods: {
    itemCountInRow(index) {
      return this.board.slice((index - 1) * this.gridsPerRow, index * this.gridsPerRow);
    },

    getIcon(coordinate) {
      return (coordinate === parseInt(this.position, 10)) ? 'directions_boat' : 'waves';
    },

    getColor(coordinate) {
      return (coordinate === this.enemyAttackedGrid) ? 'red' : '';
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

    whoWin() {
      const you = this.$store.state.player;
      if (this.isGameOver === you) {
        return 'You Lost!';
      }
      return 'You Win!';
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
@media screen and (max-width: 700px) {
  .flex >>> .v-btn.grid {
    height: 80px;
    width: 40px !important;
  }
}
</style>
