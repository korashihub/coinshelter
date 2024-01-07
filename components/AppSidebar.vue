<template>
  <aside class="bg-white dark:bg-[#1A1E23] p-8">
    <div class="flex flex-col space-y-6">
      <NuxtLink
        v-for="(item, index) in sidebar"
        :key="index"
        :to="item.link"
        class="text-lg font-medium py-2.5 px-4 flex items-center gap-2.5 rounded-xl transition-all duration-300 w-56"
        :class="{
          'text-tblack-100 bg-tprimary-200 dark:bg-tprimary-100 hover:bg-tprimary-400 dark:hover:bg-tprimary-300':
            route.path === item.link,
          'text-tblack-400 hover:text-black dark:hover:text-white':
            route.path !== item.link,
        }"
      >
        <Icon :name="item.icon" class="text-2xl" />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const route = useRoute();

const sidebar: Ref<SidebarItem[]> = ref([
  {
    name: "Market",
    icon: "i-solar-home-2-bold",
    link: "/",
  },
  {
    name: "Buy Cripto",
    icon: "i-solar-cart-large-linear",
    link: "/buy-cripto",
  },
  {
    name: "Swap",
    icon: "i-solar-transfer-horizontal-linear",
    link: "/swap",
  },
  {
    name: "Exchange",
    icon: "i-solar-tuning-linear",
    link: "/exchange",
  },
  {
    name: "Earn",
    icon: "i-solar-dollar-minimalistic-linear",
    link: "/earn",
  },
  {
    name: "Settings",
    icon: "i-solar-settings-linear",
    link: "/settings",
  },
  {
    name: "Help",
    icon: "i-solar-question-circle-linear",
    link: "/help",
  },
]);

interface SidebarItem {
  name: string;
  icon: string;
  link: string;
}
</script>
