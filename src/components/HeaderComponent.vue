<script setup>
import AddMovieModal from './AddMovieModal.vue'
import IconNotification from './icons/IconNotification.vue'
import IconProfile from './icons/IconProfile.vue'
import MenuComponent from './MenuComponent.vue'
</script>

<template>
  <div class="flex w-[85%] justify-between mt-8 items-center">
    <h2 class="text-[#D1A2FF] tracking-[0.25rem] font-medium text-3xl leading-10">
      <span class="font-bold">TEST</span>FLIX
    </h2>
    <div class="w-1/3 flex justify-around items-center">
      <AddMovieModal class="'hidden md:flex" />
      <MenuComponent />
      <IconNotification class="hidden md:block" />
      <IconProfile />
    </div>
  </div>
</template>

<style scoped></style>
