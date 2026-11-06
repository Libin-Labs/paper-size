import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('A4 reference', () => {
  assert.deepEqual(api.isoPaper('A', 4), { widthMm: 210, heightMm: 297 });
});
test('B5 and C4 reference', () => {
  assert.deepEqual(api.isoPaper('B', 5), { widthMm: 176, heightMm: 250 });
  assert.deepEqual(api.isoPaper('C', 4), { widthMm: 229, heightMm: 324 });
});
test('landscape', () => {
  assert.deepEqual(api.isoPaper('A', 5, true), { widthMm: 210, heightMm: 148 });
});
test('point inch conversion', () => {
  assert.equal(api.mmToPoints(25.4), 72);
  assert.equal(api.pointsToMm(72), 25.4);
});
test('invalid series bounds', () => {
  assert.throws(() => api.isoPaper('D', 0));
  assert.throws(() => api.isoPaper('A', 11));
  assert.throws(() => api.isoPaper('A', 4, 'yes'));
  assert.throws(() => api.mmToPoints(-1));
});
test('standard aspect and area ordering', () => {
  for (const s of ['A', 'B', 'C']) {
    let previous = Infinity;
    for (let i = 0; i <= 10; i++) {
      const p = api.isoPaper(s, i);
      assert.ok(p.widthMm < p.heightMm);
      assert.ok(Math.abs(p.heightMm / p.widthMm - Math.SQRT2) < 0.05);
      assert.ok(p.widthMm * p.heightMm < previous);
      previous = p.widthMm * p.heightMm;
    }
  }
});
