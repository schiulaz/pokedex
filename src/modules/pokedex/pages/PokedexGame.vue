<template >
  <template v-if="!isLoading">
    <q-page class="bg-grey-2 container q-pa-md">
      <div class="row justify-center">
        <div class="col-12 col-md-6">
          <q-input
            dense
            filled
            label="Search"
            v-model="search"
            bg-color="white"
            color="grey"
            class="pokemon-shadow-1 q-my-md"
          >
            <template v-slot:prepend> <q-icon name="search" /> </template
          ></q-input>
          <q-scroll-area
            style="height: calc(100vh - 140px)"
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
          >
            <div v-if="results?.length > 0" class="q-my-lg">
              <q-card
                v-for="item in results"
                v-bind:key="item"
                flat
                class="q-pa-md q-my-md row justify-between items-center"
              >
                <h3 @click="openModal(item.name)" class="pokemon-name">
                  {{ item?.name }}
                </h3>

                <img
                  @click="setFavorite(item.name)"
                  v-if="item.favorite"
                  src="~assets/star-favorite.svg"
                  style="width: 44px; cursor: pointer"
                />
                <img
                  v-else
                  @click="setFavorite(item.name)"
                  src="~assets/star.svg"
                  style="width: 44px; cursor: pointer"
                />
              </q-card>
            </div>
            <div v-else><PokemonNotData @clearSearch="clearSearch" /></div>
          </q-scroll-area>

          <q-dialog v-model="detailDialog">
            <PokemonCardDialog :selectedPokemon="selectedPokemon" />
          </q-dialog>
        </div>
      </div>
    </q-page>

    <PokemonToolbar @selectedList="selectedList" :favorites="favorites" />
  </template>
  <template v-else>
    <PokemonLoading v-if="isLoading" />
  </template>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

import PokemonCardDialog from "src/modules/pokedex/components/PokemonCardDialog.vue";
import PokemonNotData from "src//modules/pokedex/components/PokemonNotData.vue";
import PokemonLoading from "src//modules/pokedex/components/PokemonLoading.vue";
import PokemonToolbar from "src/modules/pokedex/components/PokemonToolbar.vue";

const store = useStore();
const data = ref(null);
const search = ref(null);
const detailDialog = ref(false);
const favorites = ref(false);
const starImage = new Image();
const selectedPokemon = ref(null);
const thumbStyle = {
  right: "0px",
  backgroundColor: "#6e6b7b",
  width: "2px",
  opacity: 0.2,
};

const barStyle = {
  right: "2px",

  backgroundColor: "#6e6b7b",
  width: "2px",
  opacity: 0.0,
};

const isLoading = computed(() => store.state.Pokedex.loading);
const list = computed(() => store.state.Pokedex.data?.results);
const results = computed(() => {
  if (favorites.value) {
    if (search.value)
      return filterBySearch(list.value.filter((item) => item.favorite));
    else return list.value.filter((item) => item.favorite);
  } else {
    if (search.value) return filterBySearch(list.value);
    else return list.value;
  }
});

const loadData = async () => await store.dispatch("Pokedex/getPokemons");

const setFavorite = (name) => {
  store.commit("Pokedex/SET_FAVORITE", name);
};

const filterBySearch = (list) => {
  return list.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
};

const clearSearch = () => {
  search.value = "";
  favorites.value = false;
};

const selectedList = (value) => {
  favorites.value = value;
};

const openModal = async (name) => {
  selectedPokemon.value = await store.dispatch("Pokedex/getPokemon", name);
  detailDialog.value = true;
};

onMounted(async () => {
  data.value = await loadData();
  starImage.src = "src/assets/star-favorite.svg";
});
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: auto;
  padding-bottom: 40px;
}

.pokemon-name {
  cursor: pointer;
  text-transform: capitalize;
}
.pokemon-name:hover {
  opacity: 0.4;
}

.pokemon-shadow-1 {
  box-shadow: 1px 1px 12px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 1px 1px 12px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 1px 12px 1px rgba(0, 0, 0, 0.1);
}
</style>
