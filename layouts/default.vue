<script lang="ts" setup>
useHead({
  title: "Visit San Francisco",
});
</script>

<template>
  <div class="bg-img">
    <NavBarDesktop class="hidden md:block" />
    <NavBarMobile class="block md:hidden" />
    <div class="px-2 py-8 h-[100vh]">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.bg-img {
  background: url("/background.png") no-repeat left top fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
