<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="rounded-2xl border border-zinc-200/70 bg-white/45 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.045)] backdrop-blur-sm dark:border-zinc-700/70 dark:bg-zinc-900/35">
    <div
      v-if="label"
      class="text-[0.69rem] font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
    >
      {{ label }}
    </div>
    <div :class="label ? 'mt-2.5' : ''">
      <slot />
    </div>
  </div>
</template>
