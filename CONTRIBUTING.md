# Contributing to oxnest

Thanks for helping improve this template. Issues and pull requests are welcome.

## Development setup

Use the same tool versions as the [CI](.github/workflows/ci.yml). If you need newer versions then you have to update the CI as well. Prefer using LTS where possible.

Install dependencies:

```bash
pnpm install
```

## Before opening a pull request

Run these sanity checks:

```bash
pnpm run lint:check
pnpm run fmt:check
pnpm run build
pnpm run test
pnpm run test:e2e
```

Fix linter and formatting issues:

```bash
pnpm run lint
pnpm run fmt
```

## Tests

- Place unit tests in `test/` as `*.test.ts`.
- Place e2e tests in `test/` as `*.test.e2e.ts`.
- Mirror the `src/` folder structure under `test/`.
- Do not add `*.spec.ts` files under `src/` — test generation is disabled in `nest-cli.json` on purpose.

## Pull requests

- Keep changes focused. Prefer small, reviewable PRs.
- Update the README when there are relevant changes.
- Describe what changed and why in the PR body.

## Questions

Open an issue for bugs, ideas, or questions. For template usage help, check the [README](README.md) first.
