import type { Plugin } from "unified";
import type { Root } from "mdast";
import type { Handler } from "mdast-util-to-hast";

type PluginFn = Plugin<[], Root>;
type Handlers = Record<string, Handler>;

export const createRemarkPlugin = (pluginFn: PluginFn): PluginFn => {
  return pluginFn;
};

export const createRehypeHandlers = (handlers: Handlers): Handlers => {
  return handlers;
};

export const createRemarkRehypePlugin = (
  pluginFn: PluginFn,
  handlers: Handlers
) => {
  const plugin = pluginFn as PluginFn & {
    handlers: Handlers;
  };

  plugin.handlers = handlers;

  return plugin;
};
