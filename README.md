# Oxnest

[![CI](https://github.com/bbfodor/oxnest/actions/workflows/ci.yml/badge.svg)](https://github.com/bbfodor/oxnest/actions/workflows/ci.yml)
[![status: experimental](https://img.shields.io/badge/status-experimental-orange)](#oxnest)
[![Powered by Oxc](https://img.shields.io/badge/powered%20by-Oxc-7c3aed)](https://oxc.rs/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A lightweight [NestJS](https://nestjs.com/) starter template powered by the [Oxidation Compiler](https://oxc.rs/). It features a modern, high performance toolchain built around Rust. Everything comes preconfigured so you can start building right away.

## Why?

The Nest CLI produces new projects with a slow and outdated toolchain by default. **Oxnest** swaps that chain for state of the art tooling based on Rust:

|            | Default Nest starter | Oxnest                               |
| ---------- | -------------------- | ------------------------------------ |
| Linting    | ESLint + plugins     | oxlint                               |
| Type check | tsc                  | oxlint (tsgolint)                    |
| Transform  | tsc                  | Oxc / [SWC](https://swc.rs/)         |
| Formatting | Prettier             | oxfmt                                |
| Testing    | Jest                 | [Vitest](https://vitest.dev/) (+Oxc) |

> [!NOTE]
> This template is in early development and uses SWC in the build pipeline for now, as the Nest CLI does not provide a native Oxc builder currently.

## Features

- **Automation** - [Lefthook](https://lefthook.dev/) pre-commit hooks and GitHub Actions
- **Vitest** - Unit and e2e test separation, V8 engine
- **Dependency hygiene** - Audit and dedupe checks, Dependabot/pnpm minimum release age
- **Stricter lint** - Suspicious and pedantic categories as errors
- **Configuration** - Path aliases, format on save

## Prerequisites

- [Node](https://nodejs.org/) -- Use version from the [.node-version](.node-version) file (or [.nvmrc](.nvmrc) for nvm)
- [pnpm](https://pnpm.io/) -- Use version from the `packageManager` property in [package.json](package.json)

Use the [Oxc](https://marketplace.cursorapi.com/items/?itemName=oxc.oxc-vscode) extension in VS Code (or forks) to enable linting and format on save in your IDE (can be customized in [settings.json](.vscode/settings.json)). The extension reports lint rules as well, while type errors come from the TypeScript language server. You may need to point the extension to your Node binary when using a version manager (eg. fnm, nvm) like so:

```jsonc
// User Settings JSON
{
  "oxc.path.node": "<path_to_your_node_bin>",
}
```

## Quick start

```bash
pnpm install
pnpm run start:dev
```

The app listens on port `3000` by default (override via the `PORT` env variable).

## Main scripts

| Script           | Description                         |
| ---------------- | ----------------------------------- |
| `start`          | Start the Nest server               |
| `test`           | Run all unit tests                  |
| `test:e2e`       | Run all E2E tests                   |
| `lint`           | Lint the codebase                   |
| `lint:typecheck` | Lint the codebase and type check it |
| `fmt`            | Format the codebase                 |

## Project layout

```text
src/          Application code
test/         Unit (*.test.ts) and e2e (*.test.e2e.ts) tests
```

### Path aliases

- `@src` -> `./src`
- `@test` -> `./test`

See [CONTRIBUTING.md - Path aliases](CONTRIBUTING.md#path-aliases) for how to edit aliases.

### Tests

Auto test file generation is disabled in [nest-cli.json](nest-cli.json). This is a deliberate choice to not litter the src dir with test files. You should add tests manually in the `test/` folder while mimicking the src folder structure.

See [CONTRIBUTING.md - Tests](CONTRIBUTING.md#tests) for general best practices.

## Use as a template

Clone this repo or use GitHub's **Use this template** feature as a starting point for your next project.

## Dependabot & dependency updates

Routine dependency updates are batched with a **7 day delay**, so newly published versions have time to surface issues before they land here. See [CONTRIBUTING.md - Dependency updates](CONTRIBUTING.md#dependency-updates) for how this works with pnpm.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and general guidelines.

## License

MIT -- see [LICENSE](LICENSE).
