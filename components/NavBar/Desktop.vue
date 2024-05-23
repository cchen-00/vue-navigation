<script setup lang="ts">
const { isScrollTop } = useScrollPosition();
</script>

<template>
  <div class="sticky z-10 top-0 px-2 pt-2 bg-svg">
    <div class="border-t-4 border-primary pt-1"></div>
    <div
      class="flex transition-all duration-400 ease-in-out overflow-hidden"
      :class="isScrollTop ? 'h-[120px]' : 'h-0'"
    >
      <NavBarDesktopDecor />
    </div>
    <header
      class="flex justify-between items-center space-x-1 border-b-2 border-t-2 border-primary"
    >
      <p
        v-if="isScrollTop"
        class="flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap cursor-pointer underline text-secondary"
      >
        Top 20 Attractions in San Francisco
      </p>
      <NuxtLink v-else to="/">
        <img src="/logo.png" alt="Visit San Francisco Logo" width="260px" />
      </NuxtLink>

      <NavBarDesktopMenu />
    </header>
  </div>
</template>
