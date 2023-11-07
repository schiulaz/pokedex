import { api } from "src/boot/axios";
export function getPokemons({ commit }) {
  return new Promise((resolve, reject) => {
    commit('SET_LOADING', true)
    api.get(`pokemon`)
      .then(async res => {
        commit('SET_POKEMONS', res.data)
        resolve(res.data);
        setTimeout(() => {
          commit('SET_LOADING', false)
        }, 3000);

      })
      .catch(err => {
        reject(err)
        setTimeout(() => {
          commit('SET_LOADING', false)
        }, 3000);
      });
  })
}

export function getPokemon({ commit }, name) {
  return new Promise((resolve, reject) => {
    api.get(`pokemon/${name}`)
      .then(async res => {
        commit('SET_SELECTED_POKEMON', res.data)
        resolve(res.data);
      })
      .catch(err => {
        reject(err)
      });
  })
}
