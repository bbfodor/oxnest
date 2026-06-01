# oxnest

[![CI](https://github.com/bbfodor/oxnest/actions/workflows/ci.yml/badge.svg)](https://github.com/bbfodor/oxnest/actions/workflows/ci.yml)

An opinionated [NestJS](https://nestjs.com/) starter template for new backend projects. It features state-of-the-art tooling with type-aware linting out of the box.

**Stack:**

- [SWC](https://swc.rs/)
- [Vitest](https://vitest.dev/)
- [Oxc](https://oxc.rs/) (oxlint + oxfmt)

## Prerequisites

- [Node](https://nodejs.org/) -- see [`.node-version`](.node-version)
- [pnpm](https://pnpm.io/) -- see `packageManager` in [`package.json`](package.json)

Use the [Oxc](https://marketplace.cursorapi.com/items/?itemName=oxc.oxc-vscode) extension in VS Code (or forks) to enable linting and format-on-save in your IDE (can be customized in [`settings.json`](.vscode/settings.json)). You may need to point the extension to your Node binary when using a version manager (eg. fnm, nvm) like so:

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

Path aliases:

- `@src` -> `./src`
- `@test` -> `./test`

Auto test file generation is disabled in `nest-cli.json`. This is a deliberate choice to not litter the src dir with test files. You should add tests manually in the `test/` folder while mimicking the src folder structure.

## Use as a template

Clone this repo or use GitHub's **Use this template** feature as a starting point for your next project.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and general guidelines.

## License

MIT -- see [LICENSE](LICENSE).
