<script setup lang="ts">
const isOpen = ref(false);

const openMenu = () => {
  isOpen.value = true;
};
const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <div class="sticky z-10 top-0 px-2 pt-2 bg-img">
    <div class="border-t-4 border-primary pt-1"></div>
    <header
      class="py-1 flex justify-between items-center space-x-1 border-b-2 border-t-2 border-primary"
    >
      <img src="/logo.png" alt="Visit San Francisco Logo" width="260px" />

      <button
        class="h-[44px] border-s-2 border-primary pe-1 ps-2"
        aria-label="Open Menu"
        @click="openMenu"
      >
        <IconBase size="40" class="stroke-primary">
          <IconBurger />
        </IconBase>
      </button>
      <NavBarMobileMenu :isOpen="isOpen" @closeMenu="closeMenu" />
    </header>
  </div>
</template>

<style scoped></style>
