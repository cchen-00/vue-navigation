<script setup lang="ts">
import { SCROLLING_TITLES } from "@/constants/scrollingTitles";
const SCROLL_INTERVAL = 5000;

let currentIndex = ref(0);
let scrollInterval = ref(null);

const startScroll = () => {
  scrollInterval.value = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % SCROLLING_TITLES.length;
  }, SCROLL_INTERVAL);
};

const stopScroll = () => {
  clearInterval(scrollInterval.value);
};

onMounted(startScroll);
onBeforeUnmount(stopScroll);
</script>

<template>
  <div
    class="flex-grow overflow-hidden scroll-container h-[24px]"
    @mouseenter="stopScroll"
    @mouseleave="startScroll"
  >
    <div
      class="transition-all duration-500"
      :style="{
        transform: `translate3d(0, -${
          currentIndex * (100 / SCROLLING_TITLES.length)
        }%, 0)`,
      }"
    >
      <a
        v-for="item in SCROLLING_TITLES"
        :key="item.title"
        :href="item.url"
        :aria-label="`Link to ${item.title}`"
      >
        <p
          class="h-full overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap cursor-pointer underline text-secondary"
        >
          {{ item.title }}
        </p>
      </a>
    </div>
  </div>
</template>
