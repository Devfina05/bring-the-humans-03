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

// Validate VIDEO.json before copying: it must be JSON with a string `url`.
// A placeholder address is still copied (the gate refuses it, as it should);
// a malformed file fails here, loudly, instead of handing the gate junk.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const videoPath = join(BOT_DIR, 'VIDEO.json');
let video: unknown;
try {
  video = JSON.parse(readFileSync(videoPath, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof video !== 'object' || video === null || typeof (video as { url?: unknown }).url !== 'string') {
  console.error('VIDEO.json must be an object with a string "url" field.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(videoPath, join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
