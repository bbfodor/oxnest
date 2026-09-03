import { appendFileSync, readFileSync } from 'node:fs';
import { relative } from 'node:path';

const BAR_WIDTH = 10;
const BAR_FILL = '█';
const BAR_TRACK = '\u00A0';

const METRICS = ['statements', 'branches', 'functions', 'lines'] as const;

type Metric = (typeof METRICS)[number];

interface CoverageMetric {
  total: number;
  covered: number;
  pct: number;
}

type CoverageEntry = Record<Metric, CoverageMetric>;

interface CoverageSummary {
  total: CoverageEntry;
  [file: string]: CoverageEntry;
}

const stepSummaryPath = process.env.GITHUB_STEP_SUMMARY ?? '';

if (!stepSummaryPath) throw new Error('GITHUB_STEP_SUMMARY is not set.');

const isCoverageSummary = (value: unknown): value is CoverageSummary =>
  typeof value === 'object' && value !== null && 'total' in value;

const parsed: unknown = JSON.parse(readFileSync('coverage/coverage-summary.json', 'utf8'));

if (!isCoverageSummary(parsed)) throw new Error('Unexpected coverage summary shape.');

const summary = parsed;

const title = (value: string) => value[0].toUpperCase() + value.slice(1);
const pct = (metric: CoverageMetric) => (metric.total === 0 ? '--' : `${metric.pct}%`);
const bar = (metric: CoverageMetric) => {
  const filled = metric.total === 0 ? 0 : Math.round((metric.pct / 100) * BAR_WIDTH);
  return `${BAR_FILL.repeat(filled)}${BAR_TRACK.repeat(BAR_WIDTH - filled)}`;
};

const { total, ...files } = summary;

const lines = [
  '## Coverage',
  '',
  '| Metric | | % | Covered |',
  '| --- | --- | ---: | ---: |',
  ...METRICS.map(
    (key) =>
      `| ${title(key)} | \`${bar(total[key])}\` | ${pct(total[key])} | ${total[key].covered}/${total[key].total} |`,
  ),
  '',
];

const entries = Object.entries(files);

if (entries.length > 0) {
  lines.push(
    '<details><summary>Per file</summary>',
    '',
    `| File | ${METRICS.map((key) => title(key)).join(' | ')} |`,
    `| --- | ${METRICS.map(() => '---:').join(' | ')} |`,
    ...entries.map(
      ([file, metrics]) =>
        `| \`${relative(process.cwd(), file).replaceAll('\\', '/')}\` | ${METRICS.map((key) => pct(metrics[key])).join(' | ')} |`,
    ),
    '',
    '</details>',
    '',
  );
}

appendFileSync(stepSummaryPath, lines.join('\n'));
