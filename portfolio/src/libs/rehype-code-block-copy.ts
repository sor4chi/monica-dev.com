import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const PRE_REGEX = /<pre.*?>([\s\S]*?)<\/pre>/g;
const html = (strings: TemplateStringsArray, ...values: string[]) =>
  strings
    .map((string, index) => string + (values[index] || ""))
    .join("")
    .trim();

const COPY_ICON = html`
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="code-copy-icon"
  >
    <path
      d="M20.394 9.51379H11.394C10.2895 9.51379 9.39404 10.4092 9.39404 11.5138V20.5138C9.39404 21.6184 10.2895 22.5138 11.394 22.5138H20.394C21.4986 22.5138 22.394 21.6184 22.394 20.5138V11.5138C22.394 10.4092 21.4986 9.51379 20.394 9.51379Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.39404 15.5138H4.39404C3.86361 15.5138 3.3549 15.3031 2.97983 14.928C2.60476 14.5529 2.39404 14.0442 2.39404 13.5138V4.51379C2.39404 3.98336 2.60476 3.47465 2.97983 3.09958C3.3549 2.72451 3.86361 2.51379 4.39404 2.51379H13.394C13.9245 2.51379 14.4332 2.72451 14.8083 3.09958C15.1833 3.47465 15.394 3.98336 15.394 4.51379V5.51379"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

const CHECK_ICON = html`
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    class="code-check-icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

const COPY_BUTTON = html`
  <button class="code-copy-button" aria-label="Copy code">
    ${COPY_ICON} ${CHECK_ICON}
  </button>
`;

const plugin: Plugin = () => (tree) => {
  visit(tree, "raw", (node: { value: string; type: string }) => {
    if (!node.value.startsWith("<pre")) return;
    node.value = node.value.replace(
      PRE_REGEX,
      `<div class="code-block"><pre>${COPY_BUTTON}$1</pre></div>`,
    );
  });
};

export default plugin;
