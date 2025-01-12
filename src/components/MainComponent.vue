<template>
  <div class="flex md:flex-row flex-col md:items-end md: justify-around">
    <div class="md:w-[51vw] pt-32 md:pb-[10.79vh] md:pt-0 flex md:block flex-col items-center">
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
          :icon="listState ? 'icon-[tabler--check]' : 'icon-[mynaui--plus]'"
          class="md:flex hidden border border-white"
          :class="'bg-[#24242480] 	'"
          @click="addToMyList(firstMovie.id)"
        />
        <button
          title="Añadir a Mi Lista"
          class="bg-[#242424] md:hidden block border px-2 border-white rounded-[5px] text-white flex items-center h-14 justify-center gap-3.5"
          @click="addToMyList(firstMovie.id)"
        >
          <span
            :class="listState ? 'icon-[tabler--check]' : 'icon-[mynaui--plus]'"
            class="text-2xl"
            role="img"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
    <div class="bg-[#242424] md:bg-transparent pb-14 md:pb-0 mt-3">
      <SliderComponent />
    </div>
  </div>
</template>
<script setup>
import Button from './ButtonWithIcon.vue'
import SliderComponent from './SliderComponent.vue'
import axiosMockApi from '@/plugins/axiosMockApi'
import { ref } from 'vue'

const firstMovie = ref({})
const getFirstMovie = async () => {
  try {
    const response = await instance.get(`movies/1`)
    firstMovie.value = response.data
  } catch (error) {
    console.log('Error: ', error)
  }
}
const listState = ref(firstMovie.value.myList)
const { instance } = axiosMockApi

const addToMyList = async (id) => {
  listState.value = !listState.value

  try {
    await instance.put(`movies/${id}`, {
      myList: listState.value,
    })
  } catch (error) {
    console.log('Error: ', error)
  }
}
</script>
