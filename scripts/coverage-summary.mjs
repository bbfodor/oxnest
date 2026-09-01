import { appendFileSync, readFileSync } from 'node:fs';
import { relative } from 'node:path';

const METRICS = ['statements', 'branches', 'functions', 'lines'];

const summary = JSON.parse(readFileSync('coverage/coverage-summary.json', 'utf8'));
const title = (value) => value[0].toUpperCase() + value.slice(1);
const pct = (metric) => (metric.total === 0 ? '--' : `${metric.pct}%`);
const bar = (metric) => (metric.total === 0 ? '' : '█'.repeat(Math.round(metric.pct / 10)));

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
    `| File | ${METRICS.map(title).join(' | ')} |`,
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

appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n'));
