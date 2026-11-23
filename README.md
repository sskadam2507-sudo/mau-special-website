# MAU – A Little World of Our Bond ✨

A high-end, cinematic, interactive three-page digital gift created specially for **Mayuri ("Mau")**. Designed with an editorial aesthetic, soft champagne and warm blush color palette, realistic 3D envelope card, interactive memory scrapbook, and an unexpected surprise reveal.

---

## 🌟 The 3-Page Experience Journey

1. **Page 1 – The Mystery Card & Opening Moment**
   - Soft ambient particle background and warm gradient lighting.
   - Realistic 3D invitation card with gold accents, wax seal, and depth.
   - On click: 3D envelope opening animation revealing a cinematic video player.
   - Automatically navigates to Page 2 the exact moment the opening video finishes.

2. **Page 2 – Our Memories Gallery**
   - Heading: *"Our Little World"*
   - Editorial scrapbook photo gallery with varied tilts, delicate borders, tags, and captions.
   - Full-screen interactive Lightbox with Next/Previous navigation, keyboard shortcuts (`←`, `→`, `ESC`), and image counter.
   - Bottom callout: *"Wait... There's Something More!"* with a prominent *"Reveal Your Surprise ✨"* button that triggers an immediate cinematic transition.

3. **Page 3 – The Unexpected Surprise & Final Message**
   - Celebratory warm confetti burst upon entry.
   - Surprise Reveal container: supports **either a surprise video OR a surprise photograph** (configurable with one toggle in `src/config.js`).
   - Final heartfelt letter on elegant stationery styling.
   - Final uploaded photograph in a luxury frame with the quote: *"Some bonds are simply special."*
   - Closing line: *"Made with care, just for Mau. ♡"*
   - Relive option to replay the journey from the beginning anytime.

4. **Floating Background Music Player**
   - Ambient calming acoustic track with rotating vinyl disc indicator.
   - Play/pause toggle and volume slider.
   - **Smart audio coordination**: Automatically pauses background music when videos are playing, and resumes when videos end.

---

## 📁 Where to Put Your Photos, Videos & Music

All uploadable assets live inside the `public/assets/` folder. Simply replace the sample files with your own while keeping the filenames (or update their paths in `src/config.js`):

```text
public/
└── assets/
    ├── videos/
    │   ├── opening-video.mp4      <-- Your opening video (Page 1)
    │   └── surprise-video.mp4     <-- Your surprise video (Page 3)
    │
    ├── photos/
    │   ├── memory-01.jpg          <-- Gallery photo 1 (Page 2)
    │   ├── memory-02.jpg          <-- Gallery photo 2
    │   ├── memory-03.jpg          <-- Gallery photo 3
    │   ├── memory-04.jpg          <-- Gallery photo 4
    │   ├── memory-05.jpg          <-- Gallery photo 5
    │   ├── memory-06.jpg          <-- Gallery photo 6
    │   └── final-photo.jpg        <-- Large final photo (Page 3)
    │
    └── music/
        └── background-music.mp3   <-- Soft background song (MP3)
```

> **Tip:** You can upload JPG, PNG, or WebP images, and MP4 or WebM videos.

---

## ⚙️ How to Personalize Text & Settings (`src/config.js`)

Open [src/config.js](src/config.js). You will find a clear, friendly configuration object.

### Switching Between Surprise Video and Photo:
If your surprise media on Page 3 is a **photo** instead of a video, change this in `src/config.js`:
```javascript
surpriseMedia: {
  type: "image", // Change "video" to "image"
  src: "assets/photos/surprise-photo.jpg",
  title: "The Surprise Waiting For You",
  caption: "Captured especially for this moment.",
}
```

### Editing the Final Message:
In `src/config.js`, customize the `finalMessage` section:
```javascript
finalMessage: {
  heading: "Something I Wanted You to Know...",
  paragraphs: [
    "Hey Mau,",
    "Some people enter our lives and slowly become an important part of our everyday stories.",
    "...",
  ],
  closing: "With lots of love and best wishes,",
  sender: "Your Best Friend.",
}
```

---

## 💻 Local Development & Testing

Make sure you have Node.js installed (v18 or higher recommended).

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Open the displayed URL (usually `http://localhost:5173/`).

3. **Build and preview production build:**
   ```bash
   npm run build
   npm run preview
   ```
   Open `http://localhost:4173/` to see the exact production version.

---

## 🚀 How to Deploy on Render (Free Static Site)

You can deploy this site in under 3 minutes so Mau can open it anywhere via a secure public HTTPS link (`https://mau-bond.onrender.com`):

### Option A: Via GitHub (Recommended)

1. **Create a GitHub repository:**
   - Go to [GitHub](https://github.com) and click **New Repository**.
   - Name it `mau-bond` and set it to **Public** or **Private**.

2. **Push your project to GitHub:**
   In your terminal (inside the project folder):
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Mau website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/mau-bond.git
   git push -u origin main
   ```

3. **Deploy on Render:**
   - Go to [dashboard.render.com](https://dashboard.render.com/) and sign in.
   - Click **New +** -> **Static Site**.
   - Connect your `mau-bond` GitHub repository.
   - Set the settings:
     - **Name:** `mau-for-you` (or any name you like)
     - **Branch:** `main`
     - **Build Command:** `npm run build`
     - **Publish Directory:** `dist`
   - Click **Create Static Site**.
   - Render will build and deploy your site automatically! You will receive a live URL like `https://mau-for-you.onrender.com`.

*(Note: A `render.yaml` blueprint is already included in this project, which auto-fills all build settings on Render!)*

---

## 📱 Mobile & Browser Compatibility Notes

- **Autoplay Handling:** Modern browsers (especially Safari on iPhone and Chrome on Android) require a user tap before playing audio or video with sound. The opening card interaction serves as this official user gesture, allowing video and music to play smoothly.
- **Responsive Layout:** Tested for small mobile screens (iPhone SE, 12, 13, 14, 15, Android phones) up to ultra-wide desktop monitors.
- **Aspect Ratios:** All photos and videos preserve their native proportions without unwanted cropping or stretching.
