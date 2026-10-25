<template>
  <div class="flex items-start justify-between mt-8">
    <div class="cover-copy">
      <div class="cover-kicker">Cloudflare Workers Tech Talks in Tokyo #7</div>
      <div class="cover-date">2026/4/13</div>
    </div>
    <SpeakerProfile />
  </div>
</template>

<style scoped>
.cover-copy {
  padding-top: 0.5rem;
}

.cover-kicker {
  font-size: 1.05rem;
  color: var(--deck-text-muted);
  margin-bottom: 0.8rem;
}

.cover-date {
  font-size: 0.95rem;
  color: var(--deck-text-soft);
}
</style>
