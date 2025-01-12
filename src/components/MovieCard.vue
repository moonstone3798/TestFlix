<script setup>
import IconPlay from './icons/IconPlay.vue'
import { getYear } from 'date-fns'
import { ref } from 'vue'
import axiosMockApi from '@/plugins/axiosMockApi'
const { instance } = axiosMockApi
const hover = ref(false)
const props = defineProps({
  movie: Object,
})
const likeState = ref(props.movie.like)
const listState = ref(props.movie.myList)
const year = getYear(new Date(props.movie.created_at))
const giveLike = async (id) => {
  likeState.value = !likeState.value
  try {
    await instance.put(`movies/${id}`, {
      like: likeState.value,
    })
  } catch (error) {
    console.log('Error: ', error)
  }
}
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
<template>
  <div
    class="flex flex-col hover:lg:w-[17vw] md:w-[22vw] lg:w-[15.27vw] w-[87vw]"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div
      :style="{
        backgroundImage: `url(/img/${props.movie.img})`,
      }"
      class="relative flex h-[27vh] bg-cover gap-2 rounded-t"
      :class="
        hover
          ? 'md:h-[17.81vh] items-end justify-around duration-700	'
          : 'md:h-[16vh] flex-col items-center justify-center rounded-b'
      "
    >
      <div
        class="absolute inset-0 bg-dark-gradient from-gray-800 transition-opacity duration-500"
        :class="hover ? 'opacity-75 ' : 'opacity-0 '"
      ></div>
      <IconPlay :class="hover && 'w-[1.6vw] h-[2.57vh] z-10	'" />
      <p
        v-text="props.movie.name"
        :class="hover && 'z-10	'"
        class="font-medium text-base leading-4 tracking-[4px] text-white"
      />
      <div class="text-white text-xl gap-y-2" :class="hover ? 'flex flex-col ' : 'hidden'">
        <button
          :class="listState ? 'icon-[tabler--check]' : 'icon-[mynaui--plus]'"
          role="img"
          @click="addToMyList(props.movie.id)"
        ></button>
        <button
          :class="likeState ? 'icon-[bxs--heart]' : 'icon-[mdi-light--heart]'"
          role="img"
          @click="giveLike(props.movie.id)"
        ></button>
      </div>
    </div>
    <div
      class="rounded-b min-h-[8.69vh] px-2 pt-2 text-white text-[0.68rem] pb-1"
      :class="hover ? 'block bg-[#242424] ' : 'hidden'"
    >
      <p v-text="props.movie.description" />
      <div class="flex justify-between">
        <div class="flex items-center">
          <span
            class="icon-[material-symbols--star] text-[#D1A2FF]"
            role="img"
            aria-hidden="true"
          ></span>
          <p v-text="props.movie.points" />
        </div>
        <p v-text="year" />
      </div>
    </div>
  </div>
</template>
