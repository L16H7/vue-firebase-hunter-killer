import Vue from 'vue';
import Vuex from 'vuex';
import database from './firebaseConfig';

Vue.use(Vuex);

const gamesRef = database.ref('games');

export default new Vuex.Store({
  state: {
    game: {},
    gameId: '',
    player: 0, // Player1 => 1, Player2 => 2
  },
  mutations: {
    setGame: (state, game) => {
      state.game = game;
    },

    setGameId: (state, gameId) => {
      state.gameId = gameId;
    },

    setPlayer: (state, player) => {
      state.player = player;
    },
  },
  actions: {
    createGame: ({ commit }, gameId) => {
      gamesRef.child(gameId).set({
        board: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        playersReady: false,
      });
      commit('setGameId', gameId);
      commit('setPlayer', 1);
    },

    joinGame: async ({ commit }, gameId) => {
      const gameRef = gamesRef.child(gameId);
      gameRef.update({
        playersReady: true,
      });
      commit('setGameId', gameId);
      commit('setPlayer', 2);
    },

    setPlayerPosition: ({ state }, position) => {
      const { board } = state.game;
      board[position] = state.player;

      const gameRef = gamesRef.child(state.gameId);
      gameRef.update({
        board,
      });
    },

    gameUpdated({ commit }, gameId) {
      gamesRef.child(gameId).on('value', (snapshot) => {
        commit('setGame', snapshot.val());
      });
    },
  },
});
