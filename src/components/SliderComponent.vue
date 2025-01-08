<script setup>
import MovieCard from './MovieCard.vue'
import { ref, onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { subMonths } from 'date-fns'

onMounted(() => {
  getMovies(), initFlowbite()
})
const movies = ref([])
const option = ref('TENDENCIA')
const getMovies = async () => {
  try {
    const url = 'https://677c8c3d4496848554c6c7c0.mockapi.io/api/v1/movies'

    const response = await fetch(url)
    const json = await response.json()

    console.log('reponse de el fetch', response)

    console.log('JSON', json)
    let filteredMovies = []
    if (option.value === 'MIS PELICULAS') {
      filteredMovies = json.filter((movie) => movie.myList === true)
    } else if (option.value === 'AGREGADAS RECIENTEM.') {
      const result = subMonths(new Date(), 6)
      filteredMovies = json.filter((movie) => movie.created_at == result)
    } else {
      filteredMovies = json.filter((movie) => movie.trend === true)
    }
    movies.value = filteredMovies
  } catch (error) {
    console.log('Error: ', error)
  }
}

const chooseOption = (value) => {
  option.value = value
  getMovies()
}
</script>
<template>
  <div class="flex flex-col items-center pt-4">
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      type="button"
    >
      VER: <span class="text-[#D1A2FF]"> {{ option }}</span>
      <svg
        class="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
    <div id="dropdown" class="z-10 hidden bg-[#242424] divide-y divide-gray-100 shadow w-44">
      <ul class="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
        <li>
          <a
            class="block px-4 py-2 hover:bg-zinc-700 text-[#D1A2FF]"
            @click="chooseOption('TENDENCIA')"
            >TENDENCIA</a
          >
        </li>
        <li>
          <a class="block px-4 py-2 hover:bg-zinc-700" @click="chooseOption('MIS PELICULAS')"
            >MIS PELICULAS</a
          >
        </li>
        <li>
          <a class="block px-4 py-2 hover:bg-zinc-700" @click="chooseOption('AGREGADAS RECIENTEM.')"
            >AGREGADAS RECIENTEM.</a
          >
        </li>
      </ul>
    </div>
    <div class="flex flex-col items-center gap-2">
      <span
        v-if="movies.length > 4"
        class="icon-[formkit--up] text-white"
        role="img"
        aria-hidden="true"
      ></span>
      <div class="flex flex-col gap-4">
        <MovieCard v-for="movie in movies.slice(0, 4)" :name="movie.name" :img="movie.img" />
      </div>
      <span
        v-if="movies.length > 4"
        class="icon-[formkit--up] rotate-180 text-white"
        role="img"
        aria-hidden="true"
      ></span>
    </div>
  </div>
</template>
