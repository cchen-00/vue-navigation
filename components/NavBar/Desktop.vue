<script setup lang="ts">
import type { MenuItem, MenuSubItem } from "@/types/menuTypes";
import { HEADER_MENU } from "~/constants/headerMenu";

const route = useRoute();
const activeIndex = ref(-1);
const highlightLeft = ref(0);
const ulRef: Ref<HTMLElement | null> = ref(null);
const isMouseOverMenu = ref(false);

const handleClickMenuItem = (item: MenuItem, index: Number) => {
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

const handleClickSubMenu = (item: MenuItem, subitem: MenuSubItem) => {
  navigateTo(`${item.url}${subitem.url}`);
  handleCloseMenu();
};

const handleCloseMenu = () => {
  activeIndex.value = -1;
  isMouseOverMenu.value = false;
};

const beforeEnter = (el: Element) => {
  (el as HTMLElement).style.height = "0";
};

const enter = (el: Element) => {
  (el as HTMLElement).style.height = el.scrollHeight + "px";
};

const handleMouseOver = (event: MouseEvent, index: Number) => {
  isMouseOverMenu.value = true;
  highlightLeft.value = getHighlightLeft(event);
  handleMouseOverMenuItem(index);
};

const handleMouseOverMenuItem = (index: Number) => {
  activeIndex.value = index as number;
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
</script>

<template>
  <div class="sticky z-10 top-0 px-2 pt-2 bg-svg">
    <div class="border-t-4 border-primary pt-1"></div>
    <div class="h-[110px] flex">
      <div class="pt-4">
        <NuxtLink to="/">
          <img src="/logo.png" alt="Visit San Francisco Logo" width="620px" />
        </NuxtLink>
      </div>
    </div>
    <header
      class="flex justify-between items-center space-x-1 border-b-2 border-t-2 border-primary"
    >
      <!--  <NuxtLink to="/">
         <img src="/logo.png" alt="Visit San Francisco Logo" width="260px" /> 
          </NuxtLink> -->
      <p
        class="flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap cursor-pointer underline text-secondary"
      >
        Top 20 Attractions in San Francisco
      </p>
      <nav>
        <ul
          ref="ulRef"
          class="flex relative"
          @mouseleave="handleMouseLeaveMenu"
        >
          <li
            class="absolute bg-secondary w-[130px] h-full top-0 opacity-0 transition-all duration-500 ease-in-out"
            :style="{
              left: `${highlightLeft}px`,
              opacity: isMouseOverMenu ? 0.2 : 0,
            }"
          ></li>
          <li
            v-for="(item, index) in HEADER_MENU"
            :key="item.title"
            class="relative py-1 group w-[130px]"
            :class="{
              'highlight-item': route.path.startsWith(item.url),
            }"
            @mouseleave="handleCloseMenu"
            @mouseover="handleMouseOver($event, index)"
          >
            <a
              :href="item.url"
              class="relative flex items-center justify-center border-s-2 border-primary text-primary cursor-pointer"
              @click.prevent="handleClickMenuItem(item, index)"
            >
              {{ item.title }}
            </a>
            <transition name="slide" @before-enter="beforeEnter" @enter="enter">
              <ul
                v-if="item.items.length > 0 && index === activeIndex"
                ref="menu"
                class="absolute left-0 mt-1 space-y-2 overflow-hidden border-s-2 border-b-2 border-e-2 border-primary w-full menu-dropdown"
              >
                <li
                  v-for="subitem in item.items"
                  :key="subitem.title"
                  class="hover:bg-secondary hover:bg-opacity-20 cursor-pointer"
                  @click.prevent="handleClickSubMenu(item, subitem)"
                >
                  <NuxtLink
                    :to="`${item.url}${subitem.url}`"
                    class="cursor-pointer mx-2 text-sm text-primary"
                    :class="{
                      'border-b-2 border-secondary':
                        route.path === `${item.url}${subitem.url}`,
                    }"
                  >
                    {{ subitem.title }}
                  </NuxtLink>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.slide-enter-active {
  transition: height 0.4s ease-in-out;
}

.highlight-item:after {
  @apply absolute bottom-0 w-4/5 h-0.5 bg-secondary;
  content: "";
  left: 10%;
}

.menu-dropdown {
  background: url("@/assets/images/background-sm.svg");
  background-attachment: absolute;
  background-size: 300px 500px;
  background-position: left top;
}
.menu-dropdown:before,
.menu-dropdown:after {
  content: "";
  display: block;
  height: 12px;
}
</style>
