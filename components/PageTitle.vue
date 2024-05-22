<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["lg", "md", "sm"].includes(value),
  },
});

const titleClass = computed(() => {
  return {
    "text-4xl": props.size === "lg",
    "text-3xl": props.size === "md",
    "text-2xl": props.size === "sm",
  };
});
const titleTag = computed(() => {
  if (props.size === "lg") {
    return "h1";
  } else if (props.size === "md") {
    return "h2";
  } else if (props.size === "sm") {
    return "h3";
  }
});
</script>

<template>
  <component
    :is="titleTag"
    class="text-neutral-400"
    :class="titleClass"
  >
    {{ title }}
  </component>
</template>
