<template lang="pug">
  v-container
    v-layout
      v-btn(
        color="primary"
        @click="createGame"
        :disabled="!!generatedGameId"
      ) Create
      v-text-field(
        solo
        disabled
        v-model="generatedGameId"
      )

    v-layout(
      v-if="!!generatedGameId"
    )
      v-chip(
      color="primary"
      label
      outline
      ) Waiting for other player...

    v-layout(
      v-else
    )
      v-text-field(
        solo
        v-model="gameId"
      )
      v-btn(
        color="primary"
        @click="joinGame"
      ) Join
</template>
<script>
export default {
  data: () => ({
    gameId: '',
  }),
  computed: {
    generatedGameId() {
      return this.$store.state.gameId;
    },
  },
  methods: {
    createGame() {
      const gameId = Math.random().toString(36).substring(7).toUpperCase();
      this.$store.dispatch('createGame', gameId);
    },

    joinGame() {
      this.$store.dispatch('joinGame', this.gameId);
    },
  },
};
</script>
