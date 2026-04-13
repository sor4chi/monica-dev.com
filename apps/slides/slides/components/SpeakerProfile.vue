<template>
  <div class="speaker-profile w-fit flex items-center gap-4 px-4">
    <img
      src="https://monica-dev.com/assets/icon.webp"
      alt="Sor4chi / Monica"
      class="speaker-avatar h-20 w-20 rounded-full object-cover ring-2"
    />
    <div class="flex flex-col gap-1 justify-center">
      <div class="text-[1.15rem] font-semibold leading-6">Sor4chi / Monica</div>
      <div class="speaker-meta whitespace-nowrap text-sm leading-5">
        SWE (Video Processing) @ AbemaTV, Inc.
      </div>
      <div class="text-sm flex items-center gap-2">
        <a
          href="https://monica-dev.com/"
          target="_blank"
          class="speaker-link underline underline-offset-3"
        >
          https://monica-dev.com
        </a>
        <a
          href="https://x.com/sor4chi"
          target="_blank"
          class="speaker-link underline underline-offset-3"
        >
          @sor4chi
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.speaker-profile {
  color: var(--deck-text-main);
}

.speaker-avatar {
  --un-ring-color: var(--deck-ring);
}

.speaker-meta {
  color: var(--deck-text-muted);
}

.speaker-link {
  color: var(--deck-link);
  text-decoration-color: var(--deck-link-decoration);
}
</style>
