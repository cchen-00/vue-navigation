<script setup>
const route = useRoute();
const { getFormattedTitle } = useUtilities();
const title = getFormattedTitle(route.params.foodItem);
</script>

<template>
  <PageTitle title="Eat & Drink" size="sm" />
  <PageTitle :title="title" size="lg" />
</template>
