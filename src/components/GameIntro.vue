<template>
  <q-page class="bg-grey-2 column justify-center items-center">
    <img alt="image" :src="image" style="width: 200px" />
    <h1>{{ title }}</h1>
    <div class="row justify-center q-pa-md">
      <h2 class="col-12 col-md-8 text-center">
        {{ description }}
      </h2>
    </div>
    <q-btn @click="start()" rounded color="primary" size="md" class="q-mt-lg"
      >Get Started
    </q-btn>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  linkTo: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const start = () => router.push(props.linkTo);
</script>



<style scoped>
</style>
