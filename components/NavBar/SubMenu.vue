<script setup lang="ts">
import type { MenuItem, MenuSubItem } from "@/types/menuTypes";

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

const handleClickSubMenu = (item: MenuItem, subitem: MenuSubItem) => {
  navigateTo(`${item.url}${subitem.url}`);
  handleCloseMenu();
};
</script>

<template>
  <transition
    name="slide"
    @before-enter="setInitialHeightBeforeEnter"
    @enter="setHeightOnEnter"
    @leave="setHeightBeforeLeave"
  >
    <ul v-show="index === activeIndex" ref="menu" class="menu-list">
      <li
        v-for="subitem in item.items"
        :key="subitem.title"
        class="ps-4 md:ps-2 md:hover:bg-secondary md:hover:bg-opacity-20 cursor-pointer"
        @click.prevent="handleClickSubMenu(item, subitem)"
      >
        <NuxtLink
          :to="`${item.url}${subitem.url}`"
          class="cursor-pointer text-primary text-xl md:text-base"
          :class="{
            'border-b-2 border-secondary':
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

.menu-list {
  @apply z-0 left-0 space-y-2 overflow-hidden my-3 ms-5 border-s-2 border-primary w-5/6;
}

@screen md {
  .menu-list {
    @apply absolute mt-1 my-0 ms-0 border-2 w-full;
    background: url("/background.png");
    background-attachment: absolute;
    background-position: center center;
  }

  .menu-list:before,
  .menu-list:after {
    content: "";
    display: block;
    height: 12px;
  }
}
</style>
