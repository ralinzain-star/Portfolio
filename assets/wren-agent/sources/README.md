# Wren AI Agent, master recording

`Knowledge.mov` is the original screen recording the case study clips were cut
from. 3420x1928, 60fps, 103.4s. Keep it: the exported mp4s next to it are
1600px wide and cannot be re-sharpened, so any future re-cut has to start here.

This folder is listed in `_config.yml` under `exclude`, so Jekyll never copies
it into the published site. It lives in the repo purely as an archive.

## What was cut from where

Timings recovered by frame-matching the shipped clips back against the master
(mean correlation 0.9994, so these are exact rather than estimated):

| Clip | Master in / out | Speed | Result |
|---|---|---|---|
| `teach-clarify.mp4` | 33.0s to 68.0s | 1.70x | 20.6s |
| `teach-publish.mp4` | 78.0s to 103.1s | 1.30x | 19.3s |

`mode-strategy.mp4` and `question-box.mp4` do NOT come from this recording
(frame correlation ~0.00) and are not referenced by any page.

## Re-cutting

The case study renders these full width at 1220 CSS px, which is 2440 device
pixels on a 2x display, so export at 2440 wide or more. Anything narrower gets
upscaled by the browser and goes soft.

```bash
ffmpeg -ss 33.0 -t 35.0 -i Knowledge.mov \
  -vf "setpts=PTS/1.70,scale=2560:-2" -r 60 \
  -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p \
  -movflags +faststart -an ../teach-clarify.mp4
```

Do not export screen recordings below roughly 2 Mbps. The versions that shipped
in August 2026 were around 0.24 Mbps, which left a median frame of 113 bytes and
smeared every scroll and transition.
