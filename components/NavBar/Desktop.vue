<script setup lang="ts">
import type { MenuItem } from "@/types/menuTypes";
import { HEADER_MENU } from "~/constants/headerMenu";
</script>

<template>
  <div class="sticky z-10 top-0 px-2 pt-2 bg-svg">
    <div class="border-t-4 border-primary pt-1"></div>
    <div class="h-[110px] flex">
      <div class="pt-4">
        <img src="/logo.png" alt="Visit San Francisco Logo" width="620px" />
      </div>
    </div>
    <header
      class="flex justify-between items-center space-x-1 border-b-2 border-t-2 border-primary"
    >
      <!-- h-[60px]  -->
      <!-- <img src="/logo.png" alt="Visit San Francisco Logo" width="260px" /> -->
      <p
        class="flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap cursor-pointer underline text-secondary"
      >
        Top 20 Attractions in San Francisco
      </p>
      <nav>
        <ul class="flex relative">
          <li
            v-for="(item, index) in HEADER_MENU"
            :key="item.title"
            class="relative py-1 group w-[130px]"
          >
            <!-- border border-1 border-red-500 -->
            <a
              :href="item.url"
              class="relative flex items-center justify-center border-s-2 border-primary text-primary cursor-pointer"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
