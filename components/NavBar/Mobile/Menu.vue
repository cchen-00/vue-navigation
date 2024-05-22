<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { MenuItem } from "@/types/menuTypes";
import { HEADER_MENU } from "~/constants/headerMenu";
const route = useRoute();
const activeIndex = ref(-1);

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["closeMenu"]);

const handleCloseMenu = () => {
  activeIndex.value = -1;
  emit("closeMenu");
};

const handleClickMenuItem = (item: MenuItem, index: number) => {
  if (item.items.length === 0) {
    navigateTo(item.url);
    emit("closeMenu");
  }
  if (activeIndex.value === index) {
    activeIndex.value = -1;
  } else {
    activeIndex.value = index as number;
  }
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

const isHighlightItem = computed(
  () => (item: MenuItem) => route.path.startsWith(item.url)
);
</script>

<template>
  <div
    class="fixed top-0 right-0 h-screen transition-all duration-400 ease-in-out bg-neutral-950 bg-opacity-50"
    :class="isOpen ? 'w-full opacity-1' : 'w-0 opacity-0 pointer-events-none'"
    @click="handleCloseMenu"
  >
    <nav
      @click.stop
      class="absolute top-0 right-0 w-4/5 h-screen pb-36 z-10 border-4 border-primary menu-bg overflow-auto"
    >
      <div
        class="sticky z-10 top-0 py-3 border-b-2 border-primary flex justify-end menu-bg"
      >
        <button
          class="h-[56px] w-[56px] border-s-2 border-primary"
          @click="handleCloseMenu"
        >
          X
        </button>
      </div>

      <ul>
        <li
          v-for="(item, index) in HEADER_MENU"
          :key="item.title"
          class="relative py-3 ps-4 group w-full border-b-2 border-primary cursor-pointer"
          @click.prevent="handleClickMenuItem(item, index)"
        >
          <a
            :href="item.url"
            class="relative text-2xl text-primary"
            :class="{
              'border-b-4 border-secondary': isHighlightItem(item),
            }"
          >
            {{ item.title }}
            <span v-if="item.items.length > 0">+</span>
          </a>
          <transition
            name="slide"
            @before-enter="setInitialHeightBeforeEnter"
            @enter="setHeightOnEnter"
            @leave="setHeightBeforeLeave"
          >
            <ul
              v-show="
                item.items.length > 0 &&
                (index === activeIndex || $route.path.startsWith(item.url))
              "
              ref="menu"
              class="my-4 ms-5 z-0 left-0 space-y-2 overflow-hidden border-s-2 border-primary w-5/6"
            >
              <li
                v-for="subitem in item.items"
                :key="subitem.title"
                class="ps-4"
              >
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
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.menu-bg {
  background: url("@/assets/images/background-sm.svg") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.slide-enter-active {
  transition: height 0.3s ease-in-out;
}

.slide-enter-to,
.slide-leave-active {
  transition: height 0.3s ease-in-out;
}
</style>
