<script setup>
const route = useRoute();
const { getFormattedTitle } = useUtilities();
const title = getFormattedTitle(route.params.stayItem);
</script>

<template>
  <div>
    <PageTitle title="Where to stay" size="sm" />
    <PageTitle :title="title" size="lg" />
  </div>
</template>
