<template>
  <header class="bg-white dark:bg-[#1A1E23] py-4">
    <div class="flex items-center">
      <div class="flex items-center">
        <div class="ml-16">
          <NuxtLink to="/">
            <img
              :src="isDark ? 'logo-dark.webp' : 'logo-light.webp'"
              alt="Logo"
              class="h-12"
            />
          </NuxtLink>
        </div>
        <div class="ml-20">
          <div class="relative flex items-center">
            <input
              placeholder="Search..."
              class="text-black dark:text-white dark:placeholder:text-tblack-400 pl-4 pr-11 py-3.5 outline-none bg-transparent ring-1 ring-black/20 dark:ring-tblack-200 focus:ring-black/40 dark:focus:ring-tblack-300 rounded-full w-80 transition-all duration-300"
            />
            <Icon
              name="i-solar-minimalistic-magnifer-linear"
              class="absolute right-4 text-black/50 dark:text-tblack-400"
            />
          </div>
        </div>
      </div>
      <div class="ml-auto flex items-center">
        <div class="me-4">
          <Icon
            :name="isDark ? 'i-solar-sun-2-bold' : 'i-solar-moon-bold'"
            class="text-2xl text-black dark:text-tblack-400 cursor-pointer"
            @click="changeTheme"
          />
        </div>
        <button
          class="mr-6 text-lg font-semibold bg-tprimary-200 dark:bg-tprimary-100 hover:bg-tprimary-300 dark:hover:bg-tprimary-400 text-tblack-100 px-6 py-3 flex items-center rounded-full space-x-2 transition-all duration-300"
        >
          Connect Wallet
          <Icon name="i-solar-wallet-money-bold" class="text-2xl ml-2" />
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const changeTheme = () => {
  colorMode.value = isDark.value ? "light" : "dark";
};
</script>
