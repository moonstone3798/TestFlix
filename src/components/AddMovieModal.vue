<template>
  <div
    :class="isOpen ? 'flex' : 'hidden'"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-[#242424] shadow">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-zinc-700 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          @click="(openAddModal(false), (state = 'start'), cleanData())"
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
          <form @submit.prevent="uploadFile">
            <h5
              class="text-[#D1A2FF] mb-6 font-medium tracking-[2px] text-xs"
              v-text="state === 'success' ? 'TESTFLIX' : 'AGREGAR PELÍCULA'"
            />

            <div
              class="relative flex items-center justify-center w-full"
              @dragover.prevent
              @drop.prevent="handleFileChange"
              v-if="state === 'start'"
            >
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-[20vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#242424] hover:bg-zinc-700 relative"
              >
                <div
                  class="flex items-center gap-x-4 justify-center w-full pt-5 pb-6 pointer-events-none"
                >
                  <IconClip />
                  <p
                    class="text-xs text-gray-500 dark:text-gray-400"
                    v-text="
                      file ? ` ${file.name}` : `Agregá un archivo o arrastralo y soltalo aquí`
                    "
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
            <p v-if="state === 'cancel'" class="w-2/5 text-left text-white">
              No se pudo cargar la película...
            </p>

            <div class="flex justify-center mt-4">
              <div v-if="state === 'loading'" class="flex flex-col items-center">
                <p class="text-white mt-2 text-md">Cargando...</p>
                <span class="text-white text-2xl mt-2">{{ progress }}%</span>
              </div>

              <div
                v-if="state === 'cancel'"
                class="absolute mt-8 flex flex-col items-center gap-y-2"
              >
                <p class="text-white">ERROR</p>
                <IconRefresh @click="((state = 'start'), cleanData())" />
              </div>
              <IconCheck v-if="state === 'success'" />
              <svg
                v-if="state === 'cancel' || state === 'loading'"
                viewBox="0 0 250 250"
                class="circular-progress h-32 w-32"
              >
                <circle
                  class="bg"
                  :style="{
                    stroke: state === 'cancel' && 'red',
                    strokeWidth: state === 'cancel' && '15px',
                  }"
                ></circle>
                <circle class="fg" :style="{ stroke: state === 'cancel' && 'red' }"></circle>
              </svg>
              <button
                v-if="state === 'loading'"
                type="button"
                class="mt-2 text-white py-2 px-4 rounded"
                @click="cancelUpload"
              >
                Cancelar
              </button>
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
                class="bg-[#929292] mt-4 mb-6"
                :disabled="state === 'loading' || state === 'cancel'"
              />
            </div>
            <div v-if="state === 'success'">
              <p v-text="` ${name} fue correctamente subida.`" class="text-white" />
              <ButtonComponent
                title="IR A HOME"
                type="submit"
                class="bg-white mt-4 mb-6"
                @click="goHome()"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconClip from './icons/IconClip.vue'
import { ref, watch, defineEmits } from 'vue'
import axiosMockApi from '@/plugins/axiosMockApi'
import IconRefresh from './icons/iconRefresh.vue'
import ButtonComponent from './ButtonComponent.vue'
import IconCheck from './icons/IconCheck.vue'
import router from '@/router'

const file = ref(null)
const name = ref('')
const uploadCanceled = ref(false)
const { instance2 } = axiosMockApi
const state = ref('start')
const prop = defineProps({
  isAddModalShow: Boolean,
})
const emit = defineEmits(['close-modal'])
const isOpen = ref(false)
const openAddModal = (value) => {
  isOpen.value = value
  emit('close-modal', false)
  state.value = 'start'
}
const handleFileChange = (event) => {
  const selectedFile = event.target.files[0]
  file.value = selectedFile
}
watch(
  () => prop.isAddModalShow,
  (newVal) => {
    isOpen.value = newVal
  },
)

const goHome = () => {
  cleanData()
  openAddModal(false)
  router.push('/')
}

const progress = ref(0)

const uploadFile = async () => {
  if (!name.value) {
    message.value = 'El nombre es requerido'
    return
  }
  if (!file.value) {
    message.value = 'La imagen es necesaria'
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
</script>
<style scoped>
.circular-progress {
  --size: 250px;
  --half-size: calc(var(--size) / 2);
  --stroke-width: 15px;
  --bg-stroke-width: 6px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
  animation: progress-animation 5s linear 0s 1 forwards;
}

.circular-progress circle {
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
}

.circular-progress circle.bg {
  stroke: #919191;
  stroke-width: var(--bg-stroke-width);
}

.circular-progress circle.fg {
  transform: rotate(-90deg);
  stroke-width: var(--stroke-width);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: #d1a2ff;
}

@property --progress {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

@keyframes progress-animation {
  from {
    --progress: 0;
  }
  to {
    --progress: 100;
  }
}
</style>
