import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export const react = [
  {
    ...reactPlugin.configs.flat.recommended,
    files: ['**/*.{jsx,tsx}'],
  },
  {
    ...reactPlugin.configs.flat['jsx-runtime'],
    files: ['**/*.{jsx,tsx}'],
  },
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
