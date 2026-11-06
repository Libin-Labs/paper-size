import { isoPaper, mmToPoints } from '@lp-labs/paper-size';
if (isoPaper('A', 4).widthMm !== 210 || mmToPoints(25.4) !== 72) throw new Error('Paper');
// @ts-expect-error invalid argument must be rejected by declarations
isoPaper('D', 4);
