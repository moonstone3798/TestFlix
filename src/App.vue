<script setup>
import Header from './components/HeaderComponent.vue'
import Main from './components/MainComponent.vue'
</script>

<template>
  <div id="bgImage" class="bg-cover h-screen bg-no-repeat w-screen font-open-sans bg-breaking-bad">
    <header class="flex justify-center items-center w-screen">
      <Header />
    </header>

    <main>
      <Main></Main>
    </main>
  </div>
</template>

<style scoped>
@media (max-width: 4262px) {
  #bgImage {
    background-position-x: 32%;
  }
}
</style>
