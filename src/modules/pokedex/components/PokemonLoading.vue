<template>
  <q-page class="loading-container">
    <img src="~assets/Loader.svg" class="loading-icon" />
  </q-page>
</template>

<script setup>
</script>



<style scoped>
.loading-container {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-icon {
  width: 106px;
  animation: rotate-animation 2s infinite linear;
}
@keyframes rotate-animation {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
