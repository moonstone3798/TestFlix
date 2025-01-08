<script setup>
import IconRightArrow from './icons/IconRightArrow.vue'
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import vueDropzone from 'dropzone-vue3'
import IconClip from './icons/IconClip.vue'
import ButtonComponent from './ButtonComponent.vue'
const dropzoneOptions = ref({
  url: 'https://httpbin.org/post',
  thumbnailWidth: 150,
  maxFilesize: 0.5,
  headers: { 'My-Awesome-Header': 'header value' },
})
onMounted(() => {
  initFlowbite()
})
</script>
<template>
  <button
    class="flex items-center w-1/2 justify-around"
    data-modal-target="popup-modal"
    data-modal-toggle="popup-modal"
    type="button"
  >
    <IconRightArrow />
    <h3 class="text-white font-medium text-xs leading-5 tracking-[0.156rem]">AGREGAR PELÍCULA</h3>
  </button>
  <div
    id="popup-modal"
    tabindex="-1"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-[#242424] shadow">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-zinc-700 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          data-modal-hide="popup-modal"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div class="p-4 md:p-5 text-center">
          <h5 class="text-[#D1A2FF] mb-6 font-medium tracking-[2px] text-xs">AGREGAR PELÍCULA</h5>

          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-[20vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#242424] hover:bg-zinc-700"
            >
              <div class="flex items-center gap-x-4 justify-center w-full pt-5 pb-6">
                <IconClip />
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Agregá un archivo o arrastralo y soltalo aquí
                </p>
              </div>
              <input id="dropzone-file" ref="myVueDropzone" type="file" class="hidden" />
              <!-- <vue-dropzone ref="myVueDropzone" :options="dropzoneOptions" /> -->
            </label>
          </div>
          <ButtonComponent title="SUBIR PELÍCULA" :class="'bg-[#929292]'" class="mt-4" />
        </div>
      </div>
    </div>
  </div>
</template>
