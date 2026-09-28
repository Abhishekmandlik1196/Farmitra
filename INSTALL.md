# 🚀 How to Run Farmitra Locally

You have **two easy options** — pick whichever fits you.

---

## ✅ Option 1: Run the production build (fastest — needs only Node.js)

This serves the already-built app. No extra npm installs required for the runtime (just Node.js).

### Windows:
Double-click `serve-dist.bat` **or** open Command Prompt in this folder and run:
```cmd
node serve-dist.cjs
```

### macOS / Linux:
```bash
bash serve-dist.sh
```

Then open **http://localhost:8080** in your browser.

> If `dist/` folder is missing, the script automatically runs `npm install && npm run build` for you.

---

## 🧑‍💻 Option 2: Run in development mode (hot reload, for tweaking code)

### Prerequisite: Install Node.js v18+ (https://nodejs.org)

### Windows:
Double-click `start.bat`

### macOS / Linux:
```bash
bash start.sh
```

### Manual method (any OS):
```bash
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser. Press `Ctrl+C` to stop.

---

## 📱 How to test on your phone
1. Make sure your phone and computer are on the **same Wi-Fi network**.
2. After starting the dev server (Option 2), look in the terminal for a line like:
   ```
   ➜  Network: http://192.168.x.x:5173/
   ```
3. Open that URL in your phone's browser.
4. Tap the browser menu → **"Add to Home screen"** to install Farmitra as an app (PWA).

---

## 🎯 Demo Guide
1. **Select your language** on first screen (English / हिन्दी).
2. **Login**: Enter any 10-digit phone number → Send OTP → Enter any 6-digit OTP → Verify.
3. Explore all features via the bottom navigation bar:
   - 🏠 **Home** – Weather snapshot, quick actions, alerts, mandi prices
   - ☁️ **Weather** – 7-day forecast, farming advisories, sowing/spraying windows
   - 📈 **Mandi** – Live prices, price trends, India heatmap, best mandi recommendation
   - 💬 **Kisan Mitra** – Chat with the AI farming assistant
   - 🌱 **Disease** – Upload a leaf photo for AI diagnosis, disease library, outbreak map
4. Tap the profile icon to view profile or logout.

---

## 🛠️ Build for production
```bash
npm run build
```
Output goes to `dist/` folder — deployable to any static host (Vercel, Netlify, Firebase Hosting, GitHub Pages, Nginx, S3).

---

## ❓ Troubleshooting
- **Port in use**: Edit the port in `serve-dist.cjs` (default 8080) or run `PORT=9000 node serve-dist.cjs`.
- **npm install fails**: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again.
- **Map tiles not loading**: Maps use free OpenStreetMap tiles — they need an internet connection.
