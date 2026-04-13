<script setup lang="ts">
defineProps<{
  sources: Array<{
    label: string
    href: string
  }>
}>()
</script>

<template>
  <div class="source-note absolute inset-x-12 bottom-8 h-6 overflow-hidden whitespace-nowrap text-[0.7rem] leading-6 text-zinc-500 dark:text-zinc-400">
    <span class="mr-2 uppercase tracking-[0.14em]">Source</span>
    <span v-for="(source, index) in sources" :key="source.href">
      <a
        :href="source.href"
        target="_blank"
        rel="noopener noreferrer"
        class="underline decoration-zinc-300 underline-offset-3 hover:text-zinc-700 dark:decoration-zinc-600 dark:hover:text-zinc-200"
      >
        {{ source.label }}
      </a>
      <span v-if="index < sources.length - 1" class="mx-2 text-zinc-400 dark:text-zinc-500">/</span>
    </span>
  </div>
</template>
