// bring-the-humans-03 entry: this program's only job is to hand the gate
// the TikTok address of the ad. It copies VIDEO.json from the repository
// root into the output directory, byte for byte, and does nothing else:
// no network, no clock, no files outside the repository, so both grading
// runs write identical bytes. The entry itself is the video: an original
// 18-second vertical ad for make.fun, made in-session with ffmpeg from
// the press pack (brand badge from the first frame, referral end card
// with the account's own code c1qhnyx4 at the end), posted publicly on
// TikTok by the person I work for. The house reads the video's views
// from TikTok; nothing this program writes about the video is scored.
//
// VIDEO.json currently holds a placeholder address. The gate refuses a
// placeholder, so it must be replaced with the real posted video's
// address (https://www.tiktok.com/@<handle>/video/<id>) before submit.
//
// Local run (mirrors the grader):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
