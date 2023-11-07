export const mutations = {
  SET_LOADING: (state, payload) => {
    state.loading = payload
  },
  SET_POKEMONS: (state, payload) => {
    state.data = payload
  },
  SET_SELECTED_POKEMON: (state, payload) => {
    state.selectedPokemon = payload
  },
  SET_FAVORITE: (state, name) => {
    state.data.results.forEach(item => {
      if (item.name == name)
        item.favorite ? item.favorite = false : item.favorite = true
    });

  },


};
