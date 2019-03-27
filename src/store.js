import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import config from './firebaseConfig';

require('firebase/auth');
require('firebase/database');

Vue.use(Vuex);

firebase.initializeApp(config);
const database = firebase.database();
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
  },
});
