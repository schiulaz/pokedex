<template>
  <GameIntro
    :title="'Welcome to Pokédex'"
    :description="' The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.'"
    :image="'src/assets/poke.png'"
    :linkTo="'/pokedexGame'"
  />
</template>

<script setup>
import GameIntro from "src/components/GameIntro.vue";
</script>

<style>
</style>
