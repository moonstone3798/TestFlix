<script setup>
import { onMounted } from 'vue'
import IconMenu from './icons/IconMenu.vue'
import IconNotification from './icons/IconNotification.vue'
import IconProfile from './icons/IconProfile.vue'
import { initFlowbite } from 'flowbite'
import ButtonComponent from './ButtonComponent.vue'
import AddMovieModal from './AddMovieModal.vue'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <div class="text-center">
    <button
      type="button"
      data-drawer-target="drawer-right-example"
      data-drawer-show="drawer-right-example"
      data-drawer-placement="right"
      aria-controls="drawer-right-example"
    >
      <IconMenu />
    </button>
  </div>
  <div
    id="drawer-right-example"
    class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-radial-top-right md:w-1/2 w-full lg:w-1/3 text-white"
    tabindex="-1"
    aria-labelledby="drawer-right-label"
  >
    <path
      d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
    />
    <div class="flex flex-col items-center">
      <div class="w-4/5">
        <div class="flex justify-between items-center mb-6">
          <button
            type="button"
            class="icon-[material-symbols--close]"
            data-drawer-hide="drawer-right-example"
            aria-controls="drawer-right-example"
          ></button>
          <div class="flex items-center gap-x-6">
            <IconNotification class="hidden md:block" />
            <IconProfile />
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <span class="icon-[line-md--home] mr-8" role="img" aria-hidden="true"></span>
              Inicio
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
              <span class="icon-[tabler--ticket] mr-8" role="img" aria-hidden="true"></span>
              Agregadas Recientemente
            </li>
            <li>
              <span
                class="icon-[material-symbols-light--trending-up-rounded] mr-8"
                role="img"
                aria-hidden="true"
              ></span>
              Tendencia
            </li>
            <li>
              <span
                class="icon-[icon-park-outline--like] mr-8"
                role="img"
                aria-hidden="true"
              ></span>
              Mis Películas
            </li>
            <li>
              <span class="icon-[mynaui--plus] mr-8" role="img" aria-hidden="true"></span>
              Mi Lista
            </li>
            <li class="flex mt-10 items-center">
              <AddMovieModal />
            </li>
          </ul>
        </nav>
        <ButtonComponent title="CERRAR SESIÓN" :class="'bg-[#D1A2FF]'" class="mt-12" />
      </div>
    </div>
  </div>
</template>
