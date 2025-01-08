<script setup>
import Button from './ButtonWithIcon.vue'
import SliderComponent from './SliderComponent.vue'
</script>

<template>
  <div class="flex md:flex-row flex-col md:items-end">
    <div class="md:w-3/4 md:pl-24 pt-32 md:pt-0 flex md:block flex-col items-center">
      <h4 class="text-white text-base md:text-xl font-medium leading-6">ORIGINAL DE TESTFLIX</h4>
      <h1
        class="text-[#D1A2FF] tracking-[1rem] md:text-[5vw] text-4xl text-center md:text-left md:text-[4.3em] font-medium md:leading-[100px] leading-[77px]"
      >
        BREAKING BAD
      </h1>
      <div class="flex gap-4">
        <Button title="REPRODUCIR" icon="icon-[mdi-light--play]" :class="'bg-[#242424]'" />
        <Button
          title="MI LISTA"
          icon="icon-[mynaui--plus]"
          class="md:flex hidden border border-white"
          :class="'bg-[#24242480] 	'"
        />
        <button
          class="bg-[#242424] md:hidden block border px-2 border-white rounded-[5px] text-white flex items-center h-14 justify-center gap-3.5"
        >
          <span class="icon-[mynaui--plus] text-2xl" role="img" aria-hidden="true"></span>
        </button>
      </div>
    </div>
    <div class="md:w-1/4 min-h-[80vh] bg-[#242424] md:bg-transparent pb-14 md:pb-0 mt-4">
      <SliderComponent />
    </div>
  </div>
</template>

<style scoped></style>
