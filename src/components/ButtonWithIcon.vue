<template>
  <button
    title="Añadir a Mi Lista"
    class="rounded-[5px] text-white flex items-center h-14 w-[17.22vw] min-w-44 justify-center gap-3.5"
  >
    <span :class="props.icon" role="img" aria-hidden="true" class="text-2xl"></span>
    {{ props.title }}
  </button>
</template>
<script setup>
const props = defineProps({
  title: String,
  icon: String,
})
</script>
