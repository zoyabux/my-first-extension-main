# My First Extension

A small browser extension with a popup UI. This repository contains the extension source used for local development and packaging for Chromium-based browsers (Chrome, Edge, Brave).

**Features**
- Simple popup UI powered by HTML/CSS/JavaScript
- Manifest-based extension ready for `Load unpacked` installation

**Prerequisites**
- A Chromium-based browser (Chrome, Edge, Brave)
- Basic familiarity with browser extensions

**Installation (Development)**
1. Open your browser and navigate to the extensions page:
   - Chrome: `chrome://extensions`
2. Enable "Developer mode" (top-right).
3. Click "Load unpacked" and select this repository folder.
4. The extension will load; click the extension icon to open the popup.

**Usage**
- Click the extension toolbar icon to open the popup UI (popup.html).
- Modify `popup.js` and `popup.css` to change behavior and styles.

**File Structure**
- [manifest.json](manifest.json) — Extension manifest and metadata
- [popup.html](popup.html) — Popup UI markup
- [popup.css](popup.css) — Popup styles
- [popup.js](popup.js) — Popup behavior and scripts

**Development**
- Edit files and reload the extension on the browser extensions page.
- Optionally use a local webserver or build pipeline if you add tooling.

**Contributing**
- Pull requests and issues are welcome. Please describe changes and testing steps.

**License**
- This project is released under the MIT License. See `LICENSE` if provided.

**Contact / Support**
- Open an issue in this repository for bugs or feature requests.
