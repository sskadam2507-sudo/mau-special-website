/**
 * =========================================================================
 * MAU – A Little World of Our Bond
 * EASY PERSONALIZATION CONFIGURATION
 * =========================================================================
 * 
 * Edit this file to easily customize all messages, photos, videos, and music!
 * You do NOT need to touch any complex code or component logic.
 * 
 * Just replace the files in `public/assets/` or change the paths and texts below.
 */

export const siteConfig = {
  // Friend Information
  recipient: {
    fullName: "Mayuri",
    nickname: "Mau",
  },

  // -----------------------------------------------------------------------
  // PAGE 1: THE MYSTERY CARD
  // -----------------------------------------------------------------------
  page1: {
    badge: "A Special Delivery For You",
    greeting: "Hey Mau...",
    invitationLine1: "Someone has created a little something for you.",
    invitationLine2: "Not everything needs an explanation. Some things are meant to be experienced.",
    openCardButtonText: "Open Your Little Surprise",
    cardHint: "Click anywhere on the envelope to open",

    // Opening Video played right after opening the card
    openingVideo: {
      src: "assets/videos/opening-video.mp4",
      title: "A Little Something For You",
      subtitle: "Watch till the end to unlock what's next...",
      errorMessage: "Could not load video. You can retry or proceed directly to the memories.",
      retryButtonText: "Retry Video",
      skipButtonText: "Continue to Memories →",
    },
  },

  // -----------------------------------------------------------------------
  // PAGE 2: OUR MEMORIES GALLERY
  // -----------------------------------------------------------------------
  page2: {
    badge: "Chapter 01 • The Journey",
    heading: "Our Little World",
    subtitle: "Some moments become memories. Some people become a special part of our story.",
    
    // Uploaded Photographs Gallery (Supports any number of photos)
    gallery: [
      {
        id: 1,
        src: "assets/photos/memory-01.jpg",
        caption: "A moment worth keeping.",
        tag: "Golden Days",
      },
      {
        id: 2,
        src: "assets/photos/memory-02.jpg",
        caption: "One of those memories that makes you smile instantly.",
        tag: "Pure Joy",
      },
      {
        id: 3,
        src: "assets/photos/memory-03.jpg",
        caption: "Little moments, endless memories.",
        tag: "Unfiltered Us",
      },
      {
        id: 4,
        src: "assets/photos/memory-04.jpg",
        caption: "Laughter, conversations, and everything in between.",
        tag: "Timeless",
      },
      {
        id: 5,
        src: "assets/photos/memory-05.jpg",
        caption: "Some memories never get old.",
        tag: "Chasing Sunsets",
      },
      {
        id: 6,
        src: "assets/photos/memory-06.jpg",
        caption: "Grateful for having you by my side.",
        tag: "Unconditional",
      },
      {
        id: 7,
        src: "assets/photos/memory-07.jpg",
        caption: "A timeless memory.",
        tag: "Special",
      },
    ],

    // Surprise callout at the bottom of Page 2
    surpriseSection: {
      eyebrow: "WAIT... THERE'S SOMETHING MORE!",
      headline: "One Last Thing, Just For You.",
      description: "You've walked through our memories, but there's still a secret waiting ahead.",
      buttonText: "Reveal Your Surprise ✨",
    },
  },

  // -----------------------------------------------------------------------
  // PAGE 3: THE UNEXPECTED SURPRISE & FINAL MESSAGE
  // -----------------------------------------------------------------------
  page3: {
    badge: "Chapter 02 • From The Heart",
    surpriseHeading: "An Unexpected Surprise",
    surpriseSubtitle: "Some surprises don't need a special date, just a special person.",

    /**
     * SURPRISE MEDIA SETTINGS:
     * Set `type` to "video" OR "image".
     * Provide the corresponding `src` relative to `public/`.
     */
    surpriseMedia: {
      type: "video", // "video" | "image"
      src: "assets/videos/surprise-video.mp4",
      // If using an image: "assets/photos/surprise-photo.jpg",
      title: "The Surprise Waiting For You",
      caption: "Captured especially for this moment.",
    },

    // Final Heartfelt Letter Section
    finalMessage: {
      heading: "Something I Wanted You to Know...",
      paragraphs: [
        "Hey Mau,",
        "Some people walk into our lives quietly, but end up leaving the deepest and most beautiful marks on our hearts.",
        "Through every shared laugh, quiet conversation, and unsaid understanding, our bond has become something I truly cherish.",
        "You have this effortless way of bringing warmth and light wherever you go, and I hope you never forget how truly special you are.",
        "Thank you for being my constant, for every memory we've made so far, and for simply being the wonderful person you are.",
        "Whatever the future brings, keep smiling, keep shining, and know that you will always have me cheering for you.",
        "Always here for you, no matter what.",
      ],
      closing: "With all my love and best wishes,",
      sender: "Cookie ♡",
    },

    // Final Uploaded Photograph Section
    finalPhoto: {
      src: "assets/photos/final-photo.jpg",
      caption: "Some bonds are simply special.",
      footerNote: "Made with care, just for Mau. ♡",
    },
  },

  // -----------------------------------------------------------------------
  // PAGE 4: THE CINEMATIC "MAU" FINALE
  // -----------------------------------------------------------------------
  page4: {
    badge: "Forever & Always",
    title: "MAU",
    quote: "Some bonds don't need everyday explanations—they just live in the quiet trust that we will always have each other.",
    subtitle: "To the laughter, the memories, and the special human you are.",
    footerLine: "Mayuri, always remember: you are deeply appreciated, endlessly valued, and genuinely cherished.",
  },

  // -----------------------------------------------------------------------
  // BACKGROUND MUSIC SETTINGS
  // -----------------------------------------------------------------------
  music: {
    enabled: true,
    src: "assets/music/background-music.mp3",
    title: "Acoustic Melody for Mau",
    defaultVolume: 0.3,
  },
};
