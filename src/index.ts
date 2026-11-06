function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export type PaperSeries = 'A' | 'B' | 'C';
const sizes: Readonly<Record<PaperSeries, readonly (readonly [number, number])[]>> = {
  A: [
    [841, 1189],
    [594, 841],
    [420, 594],
    [297, 420],
    [210, 297],
    [148, 210],
    [105, 148],
    [74, 105],
    [52, 74],
    [37, 52],
    [26, 37],
  ],
  B: [
    [1000, 1414],
    [707, 1000],
    [500, 707],
    [353, 500],
    [250, 353],
    [176, 250],
    [125, 176],
    [88, 125],
    [62, 88],
    [44, 62],
    [31, 44],
  ],
  C: [
    [917, 1297],
    [648, 917],
    [458, 648],
    [324, 458],
    [229, 324],
    [162, 229],
    [114, 162],
    [81, 114],
    [57, 81],
    [40, 57],
    [28, 40],
  ],
};
export function isoPaper(
  series: PaperSeries,
  index: number,
  landscape = false,
): { widthMm: number; heightMm: number } {
  if (series !== 'A' && series !== 'B' && series !== 'C') throw new RangeError('Unknown series');
  integer(index, 0, 10);
  if (typeof landscape !== 'boolean') throw new TypeError('Expected boolean');
  const [w, h] = sizes[series][index]!;
  return { widthMm: landscape ? h : w, heightMm: landscape ? w : h };
}
export function mmToPoints(mm: number): number {
  return finite((finite(mm, 0) / 25.4) * 72, 0);
}
export function pointsToMm(points: number): number {
  return finite((finite(points, 0) / 72) * 25.4, 0);
}
