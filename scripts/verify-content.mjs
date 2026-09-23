import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, shape(value[key])]),
    );
  assert.notEqual(value, '', 'Translation values must not be empty');
  return typeof value;
}
for (const namespace of ['common', 'experience', 'projects']) {
  const read = (lang) =>
    JSON.parse(
      readFileSync(
        new URL(`../src/i18n/locales/${lang}/${namespace}.json`, import.meta.url),
        'utf8',
      ),
    );
  assert.deepEqual(
    shape(read('fr')),
    shape(read('en')),
    `${namespace}: FR/EN keys, types and array lengths must match`,
  );
  if (namespace === 'projects') {
    for (const [slug, project] of Object.entries(read('fr'))) {
      for (const field of [
        'period',
        'title',
        'subtitle',
        'description',
        'context',
        'problem',
        'solution',
        'role',
        'architecture',
        'features',
        'concepts',
        'challenges',
        'learning',
      ])
        assert.ok(project[field], `${slug}: missing ${field}`);
    }
  }
  console.log(`OK: ${namespace} — FR/EN parity`);
}
