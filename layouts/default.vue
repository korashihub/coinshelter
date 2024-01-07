<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <div class="flex grow">
      <AppSidebar />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
