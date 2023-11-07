<template>
  <q-card style="width: 90%">
    <div class="row justify-center items-center content-center pokemon-card-bg">
      <img
        :src="selectedPokemon.sprites.other.dream_world.front_default"
        style="height: 150px"
      />
    </div>
    <div class="pokemon-card-close-btn q-pa-md">
      <q-btn flat round dense v-close-popup>
        <img src="~assets/close-icon.svg" />
      </q-btn>
    </div>

    <q-card-section>
      <h3 class="text-capitalize text-weight-bold">
        Name:
        <span class="text-weight-regular">{{ selectedPokemon.name }}</span>
      </h3>
      <q-separator class="q-my-sm"></q-separator>
      <h3 class="text-capitalize text-weight-bold">
        Weight:
        <span class="text-weight-regular">{{ selectedPokemon.weight }}</span>
      </h3>
      <q-separator class="q-my-sm"></q-separator>
      <h3 class="text-capitalize text-weight-bold">
        Height:
        <span class="text-weight-regular">{{ selectedPokemon.height }}</span>
      </h3>
      <q-separator class="q-my-sm"></q-separator>
      <h3 class="text-capitalize text-weight-bold">
        Types:
        <span
          v-for="(t, index) in selectedPokemon.types"
          v-bind:key="t"
          class="text-weight-regular"
        >
          {{ t.type.name }}
          {{ index < selectedPokemon.types.length - 1 ? ", " : "" }}</span
        >
      </h3>
    </q-card-section>
    <q-card-actions
      class="row justify-between items-center content-center q-my-md"
      ><q-btn
        @click="copyToClipboard(selectedPokemon)"
        rounded
        color="primary"
        size="sm"
        class="q-mx-sm"
        ><span class="q-px-sm">Share to my friends</span></q-btn
      >

      <img
        v-if="isFavorite"
        @click="setFavorite(selectedPokemon.name)"
        src="~assets/star-favorite.svg"
        style="width: 40px; cursor: pointer"
      />
      <img
        v-else
        @click="setFavorite(selectedPokemon.name)"
        src="~assets/star.svg"
        style="width: 40px; cursor: pointer"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const $q = useQuasar();
const store = useStore();

const props = defineProps({
  selectedPokemon: {
    type: Object,
    required: true,
  },
});

const copyToClipboard = async (selectedPokemon) => {
  let text = `Name: ${selectedPokemon.name}, Weight: ${
    selectedPokemon.weight
  }, Height${selectedPokemon.height}, Types: ${selectedPokemon.types.map(
    (t) => t.type.name
  )}`;
  try {
    await navigator.clipboard.writeText(text);
    $q.notify({
      message: "Attributes have been copied",
      icon: "content_copy",
      color: "primary",
      position: "top-right",
    });
  } catch (err) {
    $q.notify({
      message: "Attributes have not been copied",
      icon: "warning",
      color: "negative",
      position: "top-right",
    });
  }
};

const isFavorite = computed(() => {
  let selected = store.state.Pokedex.data.results.find(
    (item) => item.name == props.selectedPokemon.name
  );
  if (selected.favorite) return true;
  else return false;
});

const setFavorite = (name) => {
  store.commit("Pokedex/SET_FAVORITE", name);
};
</script>



<style scoped>
.pokemon-card-bg {
  background-image: url("./../../../assets/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  height: 220px;
}

.pokemon-card-close-btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
