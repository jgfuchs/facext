# facext

## Overview

`facext` is a Google Chrome extension which pauses video streams, such as YouTube and Netflix, when your face is not in view of your computer's webcam. Additionally, you can enable emotion detection, which displays a chart with your emotions (based on your facial expressions) in real time.

## Getting started

First, clone the repository. Then open Google Chrome and go to `chrome://extensions`. Click "Load unpacked extension...", navigate to the `facext` directory, and click "Open". The `facext` icon will appear to the right of the Chrome search bar.

When using `facext` for the first time, find `facext` in `chrome://extensions` and click "Options". When prompted, click "Allow" to allow `facext` to use the computer's webcam.

## Using facext

To use `facext`, navigate to a page with a video you want to watch. Now click on the `facext` icon next to the Chrome search bar. As soon as `facext` sees your face, the video will begin playing.

Whenever your face goes out of view of the webcam, the video will pause. As soon as your face returns, the video will resume.

## Enabling emotion detection

To enable emotion detection, go to `chrome://extensions`, find `facext`, and click "Options". On the "Options" page, click the checkbox next to "Display emotions".

Now when you navigate to a page with video and launch `facext`, a chart with your emotions (based on your facial expressions) will appear below the `facext` icon.

Note: Emotion detection can take around 20 seconds to load when `facext` is first launched. Please be patient.

## Keyboard shortcut

To set a keyboard shortcut, go to `chrome://extensions`, scroll to the bottom, and click on "Keyboard shortcuts". Then click to set a shortcut for `facext`. Recommended shortcut: "Ctrl+Shift+F".
