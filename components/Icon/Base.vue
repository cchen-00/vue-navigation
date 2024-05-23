<script lang="ts" setup>
const props = defineProps({
  activeIndex: Number,
  size: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: String,
    default: "currentColor",
  },
  strokeWidth: {
    type: [Number, String],
    default: 1.5,
  },
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :fill="color"
    :stroke="color"
    :stroke-width="strokeWidth"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </svg>
</template>
