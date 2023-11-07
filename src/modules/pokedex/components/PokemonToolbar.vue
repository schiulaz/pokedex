<template >
  <template v-if="!isLoading">
    <div style="position: absolute; bottom: 0; width: 100%">
      <q-toolbar
        class="row justify-center bg-white pokemon-shadow-2"
        color="primary"
      >
        <q-btn
          @click="emit('selectedList', false)"
          rounded
          :color="!favorites ? 'primary' : 'secondary'"
          size="sm"
          class="row justify-center q-mx-sm text-capitalize"
          ><q-icon name="list" size="20px" class="q-mr-sm"></q-icon>All
        </q-btn>
        <q-btn
          @click="emit('selectedList', true)"
          rounded
          :color="favorites ? 'primary' : 'secondary'"
          size="sm"
          class="row justify-center q-mx-sm text-capitalize"
        >
          <img
            src="~assets/star-white.svg"
            style="width: 12px"
            class="q-mr-sm"
          />Favorites</q-btn
        >
      </q-toolbar>
    </div>
  </template>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
const props = defineProps({
  favorites: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["selectedList"]);
const store = useStore();

const isLoading = computed(() => store.state.Pokedex.loading);

onMounted(async () => {});
</script>

<style scoped>
.pokemon-shadow-2 {
  box-shadow: 1px 1px 12px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 1px 1px 12px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 1px 12px 1px rgba(0, 0, 0, 0.2);
}
</style>
