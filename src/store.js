import Vue from 'vue';
import Vuex from 'vuex';
import database from './firebaseConfig';

Vue.use(Vuex);

const gamesRef = database.ref('games');

export default new Vuex.Store({
  state: {
    gameId: '',
  },
  mutations: {
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

    listenForGames({ state }) {
      gamesRef.child(state.gameId).on('child_changed', (snapshot) => {
        console.log(snapshot.val());
      });
    },
  },
});
