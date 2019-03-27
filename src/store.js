import Vue from 'vue';
import Vuex from 'vuex';
import database from './firebaseConfig';

Vue.use(Vuex);

const gamesRef = database.ref('games');

export default new Vuex.Store({
  state: {
    game: {},
    gameId: '',
  },
  mutations: {
    setGame: (state, game) => {
      state.game = game;
    },

    setGameId: (state, gameId) => {
      state.gameId = gameId;
    },
  },
  actions: {
    createGame: ({ commit }, gameId) => {
      gamesRef.child(gameId).set({
        board: [0, 0, 0, 0],
        playersReady: false,
      });
      commit('setGameId', gameId);
    },

    joinGame: async (action, gameId) => {
      const gameRef = gamesRef.child(gameId);
      gameRef.update({
        playersReady: true,
      });
    },

    gameUpdated({ commit }, gameId) {
      gamesRef.child(gameId).on('value', (snapshot) => {
        commit('setGame', snapshot.val());
      });
    },
  },
});
