<template>
  <div
    class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto ease-in-out duration-300 bg-radial-top-right md:w-1/2 w-full text-white"
    :class="isOpenMenu ? 'translate-x-0' : 'translate-x-full'"
    tabindex="-1"
  >
    <path
      d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
    />
    <div class="flex flex-col items-center">
      <div class="md:w-4/5 w-full">
        <div class="flex justify-between items-center mb-6">
          <button
            type="button"
            class="icon-[material-symbols--close]"
            @click="openModal(false)"
          ></button>
          <h2
            class="text-[#D1A2FF] tracking-[0.25rem] font-medium text-3xl leading-10 md:hidden flex"
          >
            <span class="font-bold">TEST</span>FLIX
          </h2>
          <div class="flex items-center gap-x-6">
            <IconNotification class="hidden md:block" />
            <IconProfile />
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <RouterLink to="/">
                <span class="icon-[line-md--home] mr-8" role="img" aria-hidden="true"></span>
                Inicio</RouterLink
              >
            </li>
            <li>
              <span class="icon-[mdi-light--star] mr-8" role="img" aria-hidden="true"></span>
              Series
            </li>
            <li>
              <span class="icon-[cil--movie] mr-8" role="img" aria-hidden="true"></span>
              Películas
            </li>
            <li>
              <RouterLink to="/agregadas-recientemente">
                <span class="icon-[tabler--ticket] mr-8" role="img" aria-hidden="true"></span>
                Agregadas Recientemente
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/tendencia">
                <span
                  class="icon-[material-symbols-light--trending-up-rounded] mr-8"
                  role="img"
                  aria-hidden="true"
                ></span>
                Tendencia
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/mis-peliculas">
                <span
                  class="icon-[icon-park-outline--like] mr-8"
                  role="img"
                  aria-hidden="true"
                ></span>
                Mis Películas
              </RouterLink>
            </li>
            <li>
              <span class="icon-[mynaui--plus] mr-8" role="img" aria-hidden="true"></span>
              Mi Lista
            </li>
            <li class="flex mt-10 items-center">
              <button
                class="flex items-center gap-x-8"
                type="button"
                @click="goHomeWithOpenModal()"
              >
                <IconRightArrow />
                <h3 class="text-white font-medium text-xs leading-5 tracking-[0.156rem]">
                  AGREGAR PELÍCULA
                </h3>
              </button>
            </li>
          </ul>
        </nav>
        <div class="flex md:block justify-center">
          <ButtonComponent title="CERRAR SESIÓN" :class="'bg-[#D1A2FF]'" class="mt-12" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, watch } from 'vue'
import IconNotification from './icons/IconNotification.vue'
import IconProfile from './icons/IconProfile.vue'
import ButtonComponent from './ButtonComponent.vue'
import IconRightArrow from './icons/IconRightArrow.vue'

const isOpenMenu = ref(false)
const emit = defineEmits(['show-add-movie-modal', 'close-menu'])
const prop = defineProps({
  isMenuModalShow: Boolean,
})
const openModal = (value) => {
  isOpenMenu.value = value

  emit('close-menu', false)
}
const goHomeWithOpenModal = () => {
  emit('show-add-movie-modal', true)
  openModal(false)
}

watch(
  () => prop.isMenuModalShow,
  (newVal) => {
    isOpenMenu.value = newVal
  },
)
</script>
