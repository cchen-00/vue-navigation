<script setup lang="ts">
import type { MenuItem } from "@/types/menuTypes";

const props = defineProps({
  item: Object as () => MenuItem,
  index: Number,
  activeIndex: Number,
});

const emit = defineEmits(["closeMenu"]);
const handleCloseMenu = () => {
  emit("closeMenu");
};

const setInitialHeightBeforeEnter = (el: Element) => {
  (el as HTMLElement).style.height = "0";
};

const setHeightOnEnter = (el: Element) => {
  (el as HTMLElement).style.height = el.scrollHeight + "px";
};

const setHeightBeforeLeave = (el: Element) => {
  (el as HTMLElement).style.height = "0";
};
</script>

<template>
  <transition
    name="slide"
    @before-enter="setInitialHeightBeforeEnter"
    @enter="setHeightOnEnter"
    @leave="setHeightBeforeLeave"
  >
    <ul
      v-show="index === activeIndex"
      ref="menu"
      class="my-4 ms-5 z-0 left-0 space-y-2 overflow-hidden border-s-2 border-primary w-5/6"
    >
      <li v-for="subitem in item.items" :key="subitem.title" class="ps-4">
        <NuxtLink
          :to="`${item.url}${subitem.url}`"
          @click="handleCloseMenu"
          class="cursor-pointer"
          :class="{
            'border-b-4 border-secondary text-primary':
              $route.path === `${item.url}${subitem.url}`,
          }"
        >
          {{ subitem.title }}
        </NuxtLink>
      </li>
    </ul>
  </transition>
</template>

<style scoped>
.slide-enter-active {
  transition: height 0.3s ease-in-out;
}

.slide-enter-to,
.slide-leave-active {
  transition: height 0.3s ease-in-out;
}
</style>
