<script setup>
const route = useRoute();
const { getFormattedTitle } = useUtilities();
const title = getFormattedTitle(route.params.todoItem);
</script>

<template>
  <div>
    <PageTitle title="Things to do" size="sm" />
    <PageTitle :title="title" size="lg" />
  </div>
</template>
