# Quick Customization Guide

All settings and text can be edited directly in:
👉 [src/config.js](src/config.js)

### Common Customizations:

| What to change | Location in `src/config.js` |
| --- | --- |
| Friend's Name / Nickname | `recipient.fullName`, `recipient.nickname` |
| Card 1 Greeting & Subtitles | `page1.greeting`, `page1.invitationLine1`, etc. |
| Opening Video File | `page1.openingVideo.src` (put file in `public/assets/videos/`) |
| Gallery Photos & Captions | `page2.gallery` list (put files in `public/assets/photos/`) |
| Surprise Media Type | `page3.surpriseMedia.type` (`"video"` or `"image"`) |
| Surprise Media File | `page3.surpriseMedia.src` |
| Final Letter Text | `page3.finalMessage.paragraphs` |
| Final Photo File & Caption | `page3.finalPhoto.src`, `page3.finalPhoto.caption` |
| Background Music Song | `music.src` (put MP3 in `public/assets/music/`) |
