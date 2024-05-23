<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="px-2">
    <div
      class="border-t-2 border-primary py-8 flex items-center justify-center"
    >
      <div class="text-center text-primary">
        <p>
          <b
            >Designed and Developed by
            <a
              href="https://ember-chen.site/"
              aria-label="Link to Ember Chen's portfolio website"
              class="underline"
            >
              Ember Chen</a
            ></b
          >
        </p>
        <p class="mt-2 text-sm font-serif">
          Copyright © {{ currentYear }}. All Rights Reserved.
        </p>
      </div>
    </div>
    <div class="border-t-4 border-primary pb-2"></div>
  </footer>
</template>
