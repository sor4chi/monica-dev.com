import type { EventContext } from "@cloudflare/workers-types";

export const onRequestGet = async (context: EventContext<{}, string, Date>) => {
  return new Response("Hello ;D");
};
