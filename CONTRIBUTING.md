# Contributing to oxnest

Thanks for helping improve this template. Issues and pull requests are welcome.

## Development setup

Use the same tool versions as the [CI](.github/workflows/ci.yml):

- **Node** -- [`.node-version`](.node-version) and [`.nvmrc`](.nvmrc) (keep in sync)
- **pnpm** -- `packageManager` in [`package.json`](package.json)

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

## Path aliases

Define import aliases in [`tsconfig.json`](tsconfig.json) `compilerOptions.paths` only.

The SWC config file (`.swcrc`) is generated from that config. Do not edit or commit it. The `prepare` lifecycle hook runs [`scripts/gen-swcrc.mjs`](scripts/gen-swcrc.mjs) on install to write this file. To change this config, edit `tsconfig.json` or the generator script, then run the `prepare` package script to regenerate `.swcrc`.

## Tests

- Place unit tests in `test/` as `*.test.ts`.
- Place e2e tests in `test/` as `*.test.e2e.ts`.
- Mirror the `src/` folder structure under `test/`.
- Do not add `*.spec.ts` files under `src/` — test generation is disabled in `nest-cli.json` on purpose.

## Dependency updates

### Why we delay installs

Compromised npm packages are often discovered and yanked within days of a malicious release. By the time a CVE or community report surfaces, many projects have already pulled the bad version into their trees.

This template uses a **7-day delay** on routine version updates to reduce that exposure:

1. **Dependabot** waits before opening update PRs ([`.github/dependabot.yml`](.github/dependabot.yml)).
2. **pnpm** refuses to install releases younger than 7 days ([`pnpm-workspace.yaml`](pnpm-workspace.yaml)).

Together, they give us some time to spot potentially bad releases before they land in here. This is not a guarantee though, but a deliberate tradeoff where we exchange slightly older dependencies for some stability.

**Security updates are not delayed.** Dependabot still opens PRs for known vulnerabilities as soon as a fix is available, and pnpm’s cooldown does not apply to those.

### How it works

Dependabot opens weekly batched PRs for dependency upgrades, but a version must be at least a week old before pulling it in. The `@types/node` package's major upgrades are ignored by these batches.

If you need to bump the Node version then do it together with `@types/node` manually, and write the new version to [`.node-version`](.node-version) and [`.nvmrc`](.nvmrc). Keep that package on the same major version as Node itself. Prefer the LTS versions that are at least a week old when bumping these and pnpm.

## Pull requests

- Keep changes focused. Prefer small, reviewable PRs.
- Update the README when there are relevant changes.
- Describe what changed and why in the PR body.

## Questions

Open an issue for bugs, ideas, or questions. For template usage help, check the [README](README.md) first.
