<script setup lang="ts">
const dateString = ref("");

onMounted(() => {
  dateString.value = new Date().toLocaleDateString();
});
</script>

<template>
  <div class="w-full flex py-1.5">
    <div class="pt-4">
      <NuxtLink to="/">
        <img src="/logo.png" alt="Visit San Francisco Logo" width="620px" />
      </NuxtLink>
    </div>

    <div class="mx-3 flex-grow overflow-hidden city-img"></div>

    <div class="flex flex-col">
      <p class="text-neutral-600 text-lg mb-1 font-black text-right">
        {{ dateString }}
      </p>

      <div
        class="relative min-w-[148px] flex-grow border-neutral-400 border-dashed border-2"
      >
        <a href="/" aria-label="`Link to Limited offers">
          <p
            class="font-serif font-black text-2xl leading-6 text-neutral-500 scale-[90%]"
          >
            Travel more, <br />
            spend less.
          </p>
          <p class="font-serif leading-5 ms-2 text-secondary">
            Limited offers!
          </p>
        </a>
        <IconBase
          size="20"
          strokeWidth="0"
          class="absolute bottom-0 right-1 opacity-50"
        >
          <IconHalfScissor />
        </IconBase>
      </div>
    </div>
  </div>
</template>

<style scoped>
.city-img {
  background: url("@/assets/images/city.png");
  background-attachment: absolute;
  background-size: auto 116px;
  background-position: left bottom;
  mix-blend-mode: multiply;
}
</style>
