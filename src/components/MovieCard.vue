<script setup>
import IconPlay from './icons/IconPlay.vue'
const props = defineProps({
  img: String,
  name: String,
})
</script>
<template>
  <div
    :style="{ backgroundImage: `url(/img/${props.img})` }"
    class="flex flex-col items-center lg:w-[15vw] md:w-[22vw] md:h-[16vh] h-[27vh] w-[87vw] bg-cover justify-center gap-2"
  >
    <IconPlay />
    <p v-text="props.name" class="font-medium text-base leading-4 tracking-[4px] text-white" />
  </div>
</template>
