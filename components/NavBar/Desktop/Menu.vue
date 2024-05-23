<script setup lang="ts">
import type { MenuItem } from "@/types/menuTypes";
import { HEADER_MENU } from "~/constants/headerMenu";

const route = useRoute();
const activeIndex = ref(-1);
const highlightLeft = ref(0);
const ulRef: Ref<HTMLElement | null> = ref(null);
const isMouseOverMenu = ref(false);

const handleClickMenuItem = (item: MenuItem, index: number) => {
  if (item.items.length === 0) {
    navigateTo(item.url);
    return;
  }
  if (activeIndex.value === index) {
    activeIndex.value = -1;
  } else {
    activeIndex.value = index as number;
  }
};

const handleCloseMenu = () => {
  activeIndex.value = -1;
  isMouseOverMenu.value = false;
};

const handleMouseOver = (event: MouseEvent, index: number) => {
  activeIndex.value = index;
  isMouseOverMenu.value = true;
  highlightLeft.value = getHighlightLeft(event);
};

const handleMouseLeaveMenu = () => {
  isMouseOverMenu.value = false;
};

const getHighlightLeft = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const targetRect = target.getBoundingClientRect();
  const ulRect = ulRef.value?.getBoundingClientRect();
  return ulRect ? targetRect.left - ulRect.left : 0;
};

const isHighlightItem = computed(
  () => (item: MenuItem) => route.path.startsWith(item.url)
);
</script>

<template>
  <nav>
    <ul ref="ulRef" class="flex relative" @mouseleave="handleMouseLeaveMenu">
      <li
        class="z-0 absolute bg-secondary w-[130px] lg:w-[180px] h-full top-0 transition-all duration-500 ease-in-out"
        :style="{
          left: `${highlightLeft}px`,
          opacity: isMouseOverMenu ? 0.2 : 0,
        }"
      ></li>
      <li
        v-for="(item, index) in HEADER_MENU"
        :key="item.title"
        class="relative py-1 group w-[130px] lg:w-[180px]"
        :class="{
          'highlight-item': isHighlightItem(item),
        }"
        @mouseleave="handleCloseMenu"
        @mouseover="handleMouseOver($event, index)"
      >
        <a
          :href="item.url"
          class="relative py-1.5 flex items-center justify-center border-s-2 border-primary text-primary cursor-pointer"
          @click.prevent="handleClickMenuItem(item, index)"
        >
          {{ item.title }}
        </a>

        <NavBarSubMenu
          v-if="item.items.length > 0"
          :item="item"
          :index="index"
          :activeIndex="activeIndex"
          @closeMenu="handleCloseMenu"
        />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.slide-enter-active {
  transition: height 0.4s ease-in-out;
}

.highlight-item:after {
  @apply absolute bottom-0 w-3/4 h-1 bg-secondary;
  content: "";
  opacity: 0.8;
  left: 12.5%;
}
</style>
