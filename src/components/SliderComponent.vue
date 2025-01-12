<template>
  <div class="flex flex-col items-center pt-4 min-h-[78.75vh]">
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      type="button"
    >
      VER:
      <span class="text-[#D1A2FF] pl-2">
        {{ route.name }}
      </span>
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
    <div
      id="dropdown"
      class="z-10 hidden bg-[#242424] divide-y divide-gray-100 shadow md:w-44 w-full"
    >
      <ul class="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
        <li>
          <router-link
            to="/tendencia"
            class="block px-4 py-2 hover:bg-zinc-700"
            :class="{ 'text-[#D1A2FF]': $route.name === 'TENDENCIA' }"
          >
            TENDENCIA
          </router-link>
        </li>
        <li>
          <router-link
            to="/mis-peliculas"
            class="block px-4 py-2 hover:bg-zinc-700"
            :class="{ 'text-[#D1A2FF]': $route.name === 'MIS PELICULAS' }"
          >
            MIS PELICULAS
          </router-link>
        </li>
        <li>
          <router-link
            to="/agregadas-recientemente"
            class="block px-4 py-2 hover:bg-zinc-700"
            :class="{ 'text-[#D1A2FF]': $route.name === 'AGREGADAS RECIENTEM.' }"
          >
            AGREGADAS RECIENTEM.
          </router-link>
        </li>
      </ul>
    </div>
    <div class="flex flex-col items-center gap-2 mt-2">
      <button
        v-show="minIndex > 0"
        class="icon-[formkit--up] text-white"
        role="img"
        aria-hidden="true"
        @click="prevMovie"
      ></button>
      <div class="flex flex-col gap-4 items-center">
        <MovieCard
          v-for="movie in filteredMovies.slice(minIndex, minIndex + 4)"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <button
        v-show="minIndex + 4 < filteredMovies.length"
        class="icon-[formkit--up] rotate-180 text-white"
        role="img"
        aria-hidden="true"
        @click="nextMovie"
      ></button>
    </div>
  </div>
</template>
<script setup>
import MovieCard from './MovieCard.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { initFlowbite } from 'flowbite'
import { subMonths } from 'date-fns'
import axiosMockApi from '@/plugins/axiosMockApi'
const { instance } = axiosMockApi

const filter = ref([])
const minIndex = ref(0)
const route = useRoute()

const getMovies = async () => {
  try {
    const { data } = await instance.get('/movies')
    filter.value = data
  } catch (error) {
    console.log('Error: ', error)
  }
}

const filteredMovies = computed(() => {
  if (route.name === 'MIS PELICULAS') {
    return filter.value.filter((movie) => movie.like === true)
  } else if (route.name === 'AGREGADAS RECIENTEM.') {
    const result = subMonths(new Date(), 8)
    return filter.value.filter((movie) => new Date(movie.created_at) >= result)
  } else {
    return filter.value.filter((movie) => movie.trend === true)
  }
})

onMounted(() => {
  getMovies()
  initFlowbite()
})

const prevMovie = () => {
  if (minIndex.value > 0) {
    minIndex.value -= 1
  }
}

const nextMovie = () => {
  if (minIndex.value + 4 < filteredMovies.value.length) {
    minIndex.value += 1
  }
}
</script>
