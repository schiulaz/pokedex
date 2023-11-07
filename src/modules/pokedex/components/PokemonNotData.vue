<template>
  <div class="text-center q-ma-lg">
    <h1 class="title">Uh-oh!</h1>
    <h5>You look lost on your journey!</h5>
    <q-btn
      @click="emit('clearSearch', '')"
      rounded
      color="primary"
      size="sm"
      class="q-my-sm"
      >Go Back Home</q-btn
    >
  </div>
</template>

<script setup>
const emit = defineEmits(["clearSearch", ""]);
</script>

<style scoped>
.title {
  font-size: 36px;
  line-height: 43px;
  font-weight: 700;
}
.description {
  font-size: 20px;
  line-height: 30px;
  font-weight: 500;
}
</style>
