<template>
  <div
    class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto ease-in-out duration-300 bg-[#242424] bg-md:w-1/2 w-full text-white"
    :class="isOffCanvasShow ? 'translate-x-0' : 'translate-x-full'"
    tabindex="-1"
  >
    <path
      d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
    />
    <div class="flex flex-col items-center">
      <div class="md:w-4/5 w-full">
        <div class="flex justify-between items-center mb-6">
          <IconMenu :class="'md:scale-x-[1] scale-x-[-1] '" @click="goHomeWithOpenModal" />
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
        <div class="p-4 md:p-5 text-center">
          <form @submit.prevent="uploadFile">
            <h5
              class="text-[#D1A2FF] mb-6 font-medium tracking-[2px] text-lg"
              v-if="state !== 'success'"
              v-text="'AGREGAR PELÍCULA'"
            />

            <div
              class="relative flex items-center justify-center w-full"
              @dragover.prevent
              @drop.prevent="handleFileChange"
              v-if="state === 'start'"
            >
              <label
                for="dropzone-file"
                class="flex flex-col items-center mt-10 justify-center w-full h-[10vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#242424] hover:bg-zinc-700 relative"
              >
                <div
                  class="flex items-center gap-x-4 justify-center w-full pt-5 pb-6 pointer-events-none"
                >
                  <IconClip />
                  <p
                    class="text-sm text-gray-500 dark:text-gray-400"
                    v-text="file ? ` ${file.name}` : `Agregá un archivo`"
                  />
                </div>
                <input
                  id="dropzone-file"
                  ref="fileInput"
                  type="file"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  @change="handleFileChange"
                />
              </label>
            </div>
            <div class="flex flex-col">
              <p v-if="state === 'cancel'" class="text-white">
                ERROR! No se pudo cargar la película
              </p>
              <div v-if="state === 'loading'" class="flex items-center">
                <p class="text-white mt-2 text-md">Cargando...</p>
                <span class="text-white text-2xl mt-2">{{ progress }}%</span>
              </div>
              <div class="flex justify-center mt-4">
                <IconCheck v-if="state === 'success'" />
                <div
                  v-if="state !== 'start' && state !== 'success'"
                  class="w-full bg-gray-200 h-2.5 dark:bg-gray-700"
                >
                  <div
                    class="bg-[#d1a2ff] h-2.5"
                    :style="{
                      width: state === 'loading' ? progress + '%' : '100%',
                      backgroundColor: state === 'cancel' && 'red',
                    }"
                  ></div>
                </div>
              </div>
              <div class="flex justify-end mt-2">
                <button
                  v-if="state === 'loading' && progress !== 100"
                  type="button"
                  class="mt-2 text-white py-2 px-4 rounded"
                  @click="cancelUpload"
                >
                  Cancelar
                </button>
                <p
                  v-text="'¡LISTO!'"
                  class="text-[#D1A2FF]"
                  v-if="progress === 100 && state === 'loading'"
                />
                <IconRefresh @click="((state = 'start'), cleanData())" v-if="state === 'cancel'" />
              </div>
            </div>
            <div class="mt-8 flex flex-col items-center gap-y-2" v-if="state !== 'success'">
              <input
                placeholder="Ingresa el título"
                v-model="name"
                class="bg-transparent lg:w-[11vw] text-center outline-none border-b text-white border-white"
              />

              <ButtonComponent
                title="Subir archivo"
                type="submit"
                class="bg-[#929292] mt-4"
                :disabled="state === 'loading' || state === 'cancel'"
              />
            </div>
            <div v-if="state === 'success'">
              <p v-text="` ${name} fue correctamente subida.`" class="text-white text-md" />
              <ButtonComponent
                title="IR A HOME"
                type="submit"
                class="bg-white mt-4 mb-6"
                @click="goHome()"
              />
            </div>
            <ButtonComponent
              v-if="state !== 'success'"
              title="SALIR"
              :class="'bg-[#24242480] border border-white text-white'"
              class="mt-12"
              @click="(openModal(false), (state = 'start'), cleanData())"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, watch } from 'vue'
import IconMenu from './icons/IconMenu.vue'
import IconNotification from './icons/IconNotification.vue'
import IconProfile from './icons/IconProfile.vue'
import ButtonComponent from './ButtonComponent.vue'
import axiosMockApi from '@/plugins/axiosMockApi'
import IconRefresh from './icons/iconRefresh.vue'
import IconClip from './icons/IconClip.vue'
import IconCheck from './icons/IconCheck.vue'
import router from '@/router'
const file = ref(null)
const name = ref('')
const uploadCanceled = ref(false)
const { instance2 } = axiosMockApi
const state = ref('start')

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0]
  file.value = selectedFile
}
const isOffCanvasShow = ref(false)
const emit = defineEmits(['close-modal'])
const prop = defineProps({
  isAddModalShow: Boolean,
})
const openModal = (value) => {
  isOffCanvasShow.value = value
  emit('close-modal', false)
  state.value = 'start'
}
const goHomeWithOpenModal = () => {
  emit('show-menu-modal', true)
  openModal(false)
}

watch(
  () => prop.isAddModalShow,
  (newVal) => {
    isOffCanvasShow.value = newVal
  },
)

const progress = ref(0)

const uploadFile = async () => {
  if (!name.value) {
    message.value = 'El nombre es requerido'
    return
  }

  state.value = 'loading'
  uploadCanceled.value = false
  progress.value = 0

  try {
    const interval = setInterval(() => {
      if (progress.value < 100) {
        progress.value += 10
      }
    }, 500)
    await new Promise((resolve, reject) => {
      if (uploadCanceled.value) {
        clearInterval(interval)
        reject('Carga cancelada')
      } else {
        setTimeout(() => {
          clearInterval(interval)
          resolve()
        }, 5000)
      }
    })

    if (uploadCanceled.value) return

    await instance2.post('/movies', {
      img: file.value.name,
      name: name.value,
      points: 0,
      description: null,
    })
    state.value = 'success'
  } catch (error) {
    console.error('Error al subir el archivo:', error)
  }
}
const cleanData = () => {
  name.value = ''
  file.value = null
}
const cancelUpload = () => {
  uploadCanceled.value = true
  state.value = 'cancel'
}

const goHome = () => {
  cleanData()
  openModal(false)
  router.push('/')
}
</script>
