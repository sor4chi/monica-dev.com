<template>
  <div class="callout-card">
    <slot />
  </div>
</template>

<style scoped>
.callout-card {
  margin: 2rem auto;
  max-width: 42rem;
  border: 1px solid var(--deck-surface-border);
  border-radius: 1rem;
  background: var(--deck-surface);
  padding: 1rem 1.25rem;
  color: var(--deck-text-main);
  text-align: center;
}
</style>
