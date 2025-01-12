<template>
  <button
    class="rounded-[5px] h-10 px-6 text-black font-medium tracking-[2px] w-[66vw] md:w-[17.22vw] md:text-xs text-md h-[6.89vh]"
  >
    {{ props.title }}
  </button>
</template>
<script setup>
const props = defineProps({
  title: String,
})
</script>
