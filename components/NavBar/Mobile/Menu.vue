<script setup lang="ts">
import type { MenuItem } from "@/types/menuTypes";
import { HEADER_MENU } from "@/constants/headerMenu";
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
      class="absolute top-0 right-0 w-4/5 h-screen pb-36 pe-2 z-10 border-s-4 border-primary menu-bg overflow-auto"
    >
      <div class="sticky z-10 top-0 border-b-2 menu-bg">
        <div class="pt-2 border-b-4 border-primary"></div>
        <div
          class="border-t-2 py-1 mt-1 border-b-2 border-primary flex justify-end"
        >
          <button
            class="h-[44px] ps-2 pe-0 border-s-2 border-primary"
            @click="handleCloseMenu"
          >
            <IconBase size="44" class="stroke-primary">
              <IconClose />
            </IconBase>
          </button>
        </div>
      </div>

      <ul>
        <li
          v-for="(item, index) in HEADER_MENU"
          :key="item.title"
          class="relative py-3 ps-4 group w-full border-b-2 border-primary"
        >
          <a
            :href="item.url"
            @click.prevent="handleClickMenuItem(item, index)"
            class="relative text-2xl text-primary"
            :class="{
              'border-b-4 border-secondary': isHighlightItem(item),
            }"
          >
            {{ item.title }}
            <IconBase
              v-if="item.items.length > 0"
              class="inline-block mb-1 stroke-primary transition-all"
              :class="{
                'transform rotate-45': activeIndex === index,
              }"
            >
              <IconPlus />
            </IconBase>
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
  </div>
</template>

<style scoped>
.menu-bg {
  background: url("/background.png") no-repeat top right fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
