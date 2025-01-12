<template>
  <div class="flex w-[85%] justify-between mt-6 items-center">
    <div class="flex md:hidden">
      <button type="button" @click="handleShowMenuModal(true)">
        <IconMenu :class="'md:scale-x-[1] scale-x-[-1] '" />
      </button>
      <MenuComponent
        @show-add-movie-modal="handleShowAddMovieModal"
        @close-menu="handleShowMenuModal"
        :is-menu-modal-show="isMenuModalShow"
      />
      <AddMovieOffcanvas
        @show-menu-modal="handleShowMenuModal"
        :is-add-modal-show="isAddMovieModalShow"
        @close-modal="handleShowAddMovieModal"
      />
    </div>
    <h2 class="text-[#D1A2FF] tracking-[0.25rem] font-medium text-3xl leading-10">
      <span class="font-bold">TEST</span>FLIX
    </h2>
    <div class="md:w-1/3 flex items-center justify-between">
      <div class="hidden md:flex justify-around gap-x-[2.77vw]">
        <button
          class="flex items-center gap-x-8"
          type="button"
          @click="handleShowAddMovieModal(true)"
        >
          <IconRightArrow />
          <h3 class="text-white font-medium text-xs leading-5 tracking-[0.156rem]">
            AGREGAR PELÍCULA
          </h3>
        </button>

        <AddMovieModal
          :is-add-modal-show="isAddMovieModalShow"
          @close-modal="handleShowAddMovieModal"
        />

        <button type="button" @click="handleShowMenuModal(true)">
          <IconMenu :class="'md:scale-x-[1] scale-x-[-1] '" />
        </button>
        <MenuComponent
          @show-add-movie-modal="handleShowAddMovieModal"
          @close-menu="handleShowMenuModal"
          :is-menu-modal-show="isMenuModalShow"
        />

        <IconNotification />
      </div>
      <IconProfile />
    </div>
  </div>
</template>
<script setup>
import AddMovieModal from './AddMovieModal.vue'
import IconNotification from './icons/IconNotification.vue'
import IconProfile from './icons/IconProfile.vue'
import IconRightArrow from './icons/IconRightArrow.vue'
import MenuComponent from './MenuComponent.vue'
import { ref } from 'vue'
import IconMenu from './icons/IconMenu.vue'
import AddMovieOffcanvas from './AddMovieOffcanvas.vue'

const isAddMovieModalShow = ref(false)
const isMenuModalShow = ref(false)
const handleShowAddMovieModal = (value) => {
  isAddMovieModalShow.value = value
}
const handleShowMenuModal = (value) => {
  isMenuModalShow.value = value
}
</script>
