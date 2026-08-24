# Rezio, master recording

`Questionnaire.mov` is the original for `../Questionnaire.mp4`. 2268x1274,
2.67 Mbps. It was deleted in commit `e59b6de` and recovered from git history,
so it now lives here rather than only inside `.git`.

This folder is excluded from the Jekyll build via `_config.yml`.

The shipped mp4 is 1600x898 at 0.19 Mbps, but the case study renders it at
1160 CSS px, which is 2320 device pixels on a 2x display. Re-export from the
master at native width instead:

```bash
ffmpeg -i Questionnaire.mov -c:v libx264 -crf 20 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an ../Questionnaire.mp4
```
