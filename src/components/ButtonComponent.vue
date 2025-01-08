<script setup>
const props = defineProps({
  title: String,
})
</script>
<template>
  <button class="rounded-[5px] h-10 px-6 text-black font-medium tracking-[2px] text-xs">
    {{ props.title }}
  </button>
</template>
