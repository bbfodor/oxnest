# oxnest

[![CI](https://github.com/bbfodor/oxnest/actions/workflows/ci.yml/badge.svg)](https://github.com/bbfodor/oxnest/actions/workflows/ci.yml)

A lightweight [NestJS](https://nestjs.com/) starter template powered by the Oxidation Compiler. It features a modern, high-performance toolchain built around Rust. Everything comes preconfigured out of the box, so you can start building right away.

**Stack:**

- [Oxc](https://oxc.rs/) -- Transpilation (`oxc-transform`), type-aware linting (`oxlint`), and quick formatting (`oxfmt`).
- [Vitest](https://vitest.dev/) -- A fast current-generation testing framework utilizing the Oxc transformer.

> [!NOTE]
> The template uses SWC in the build pipeline for now, as the Nest CLI does not provide a native Oxc builder currently.

## Prerequisites

- [Node](https://nodejs.org/) -- Use version from the [.node-version](.node-version) file (or [.nvmrc](.nvmrc) for nvm)
- [pnpm](https://pnpm.io/) -- Use version from the `packageManager` property in [package.json](package.json)

Use the [Oxc](https://marketplace.cursorapi.com/items/?itemName=oxc.oxc-vscode) extension in VS Code (or forks) to enable linting and format-on-save in your IDE (can be customized in [settings.json](.vscode/settings.json)). You may need to point the extension to your Node binary when using a version manager (eg. fnm, nvm) like so:

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

| Script     | Description                   |
| ---------- | ----------------------------- |
| `start`    | Start the Nest server         |
| `test`     | Run all unit tests            |
| `test:e2e` | Run all E2E tests             |
| `lint`     | Perform linting with auto-fix |
| `fmt`      | Format the codebase           |

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

Routine dependency updates are batched weekly with a **7-day delay**, so newly published versions have time to surface issues before they land here. Security fixes are not delayed. See [CONTRIBUTING.md - Dependency updates](CONTRIBUTING.md#dependency-updates) for how this works with pnpm.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and general guidelines.

## License

MIT -- see [LICENSE](LICENSE).
