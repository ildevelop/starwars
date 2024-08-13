# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Getting Started

To start, you'll need to have Node.js (14 or higher) installed on your machine. Then:

1. Clone this repository: `git clone https://github.com/your-username/this-repo.git`
2. Navigate into the project directory: `cd this-repo`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm run dev` or `yarn dev`

## Features

This template includes:

* A basic React setup with Vite
* ESLint rules for type checking and stylistic consistency
* Support for Fast Refresh using Babel or SWC

## Running Tests

To run tests, execute the following command in your terminal: `npm run test` or `yarn test`

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
