# Screen Share Test App

A browser-based diagnostic tool that verifies whether screen sharing works correctly on a user's device and browser.

The app checks permission handling, stream lifecycle behavior, and capture metadata using native Web APIs only (no third-party screen sharing libraries).

---

## Live Demo

Deployed URL: https://screen-share-test-app.netlify.app/

---

## Features

* Detect browser screen-sharing capability
* Request screen-share permission
* Handle all permission states:

  * Permission granted
  * Permission denied
  * User cancelled picker
  * Unsupported browser
  * Unknown error
* Live screen preview (local only — no recording)
* Capture metadata:

  * Display type (tab/window/screen)
  * Actual resolution
* Detect manual stop from browser UI
* Safe retry flow (fresh stream, no leaks)

---

## Tech Stack

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Native Browser Media APIs

No UI libraries or media libraries were used.

---

## Setup Instructions

### 1. Clone repository

```bash
git clone https://github.com/amantalukdar24/Screen-Share-Test-App.git
cd screen-share-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

### 4. Build production

```bash
npm run build
npm start
```

---

## Screen-Sharing Flow Explanation

### 1. Capability Check

Before navigating to the test page, the app verifies browser support using:

```
navigator.mediaDevices.getDisplayMedia
```

If unsupported, the user is prevented from starting the test.

---

### 2. Permission Request

When the user clicks **Start Screen Test**, the browser opens a native screen picker.

Possible outcomes handled individually:

| Outcome                | UI State             |
| ---------------------- | -------------------- |
| User selects a screen  | Stream starts        |
| User presses Cancel    | Cancel message shown |
| User blocks permission | Permission denied    |
| Unsupported browser    | Unsupported message  |
| Unexpected failure     | Error state          |

---

### 3. Stream Start

After permission is granted:

* A MediaStream is returned
* The stream is attached to a `<video>` element for live preview
* Metadata is read using:

```
track.getSettings()
```

Displayed data:

* Resolution (width × height)
* Display surface type

---

### 4. Lifecycle Detection

The app listens for manual stop events using:

```
track.onended
```

This detects when the user presses **Stop sharing** in the browser UI.

When triggered:

* All tracks are stopped
* Video preview cleared
* UI updated immediately

---

### 5. Retry Behavior

Retrying the test:

* Stops all existing tracks
* Clears previous stream
* Requests a completely new stream
* Prevents media resource leaks

---

## Known Limitations & Browser Quirks

* Screen sharing only works on secure contexts (HTTPS or localhost)
* Mobile browsers generally do not support screen capture
* Some browsers do not provide `displaySurface` metadata
* Resolution may change dynamically depending on OS scaling
* Safari has limited support for screen capture APIs

---

## Screenshots

(Add screenshots here)
<img width="1895" height="886" alt="image" src="https://github.com/user-attachments/assets/1cb8b862-cc8e-48ee-98ff-0f792cb28e67" />
<img width="1894" height="897" alt="image" src="https://github.com/user-attachments/assets/01a2b1d1-8eae-4e5a-8979-9d975682921e" />
<img width="1890" height="899" alt="image" src="https://github.com/user-attachments/assets/2fd0e97e-6287-4b1a-bfc3-8a9460704edb" />

---

## Author

Aman Talukdar
