# React Bottom Sheet Assignment 🚀

A minimal, responsive **React Bottom Sheet** built **without** third-party animation libraries (no _framer-motion_, no _react-spring-bottom-sheet_).  
It supports drag-and-release, spring-like snap animations, and three snap points (closed ▸ half ▸ full).

| Live demo | GitHub |
|-----------|--------|
| **👉 <https://react-bottom-sheet-sandhya.netlify.app>** | <https://github.com/Bhukyasandhya/react-bottom-sheet> |

---

## ✨ Features

* Three snap points: **0 % / 50 % / 100 %** of height  
* Drag with mouse / touch and **spring** to nearest point  
* Toggle button & snap-level indicator  
* **Keyboard access** ( ↑ = open, ↓ = close, Esc = close )  
* Fully responsive (mobile ↔ desktop)

<details>
<summary>Screenshots 📸 (click to expand)</summary>

| Closed  | Half  | Full  |
|---------|-------|-------|
| ![closed](docs/screens/closed.png) | ![half](docs/screens/half.png) | ![full](docs/screens/full.png) |

</details>

---

## 🛠 Run locally

```bash
# clone
git clone https://github.com/Bhukyasandhya/react-bottom-sheet.git
cd react-bottom-sheet

# install deps
npm install

# start dev server
npm start
