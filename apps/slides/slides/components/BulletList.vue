<template>
  <ul class="bullet-list">
    <slot />
  </ul>
</template>

<style scoped>
.bullet-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
  font-size: 0.94rem;
  line-height: 1.6rem;
}

.bullet-list :deep(li) {
  position: relative;
  padding-left: 1.05rem;
  text-align: left;
}

.bullet-list :deep(li)::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background: var(--deck-accent);
  opacity: 0.85;
}

.bullet-list :deep(li > *) {
  margin: 0;
  text-align: left;
}
</style>
