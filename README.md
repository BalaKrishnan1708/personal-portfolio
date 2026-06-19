# Balakrishnan R — Personal Brand Platform

A luxury-navy and gold themed interactive personal portfolio and professional brand platform built for **Balakrishnan R** (AI Developer, Researcher, Tech Lead, and Speaker). 

Designed to exhibit technical skills, startup leadership, academic credentials, and communication projects in a highly aesthetic, fluid, and responsive single-page experience.

---

## ✨ Features & Interactive Systems

### 1. Particle Starfield Background
- Dynamic, lightweight HTML5 <canvas> particle engine that renders slow-drifting, glowing stars colored in sandal (#E8D9B5) with random twinkle frequencies.
- Automatically handles viewport resizing and scales performance across mobile, tablet, and desktop screens.

### 2. Experience Universe Timeline
- A filterable, interactive chronological timeline showcasing **8 professional internships and leadership roles**.
- Offers dynamic filtering by **Development**, **Leadership**, and **Research** categories.
- Features expandable cards with click-to-open detailed achievements.
- Integrates verified LinkedIn post links for internships (CodSoft, Ikipendence & Sthaniya, SpearStreamZ) with left/right contextual hover translations.
- Adapts to a single-sided left-aligned timeline on screens under 900px for mobile responsiveness.

### 3. Interactive Skills Matrix (SVG Radar Chart)
- A custom, responsive SVG radar chart built within a 500x400 coordinate system.
- Scaled to a max-grid radius of 120px to guarantee 100% boundary safety and prevent label clipping.
- Uses responsive text-anchors (start / end / middle) to position labels completely outside the outer ring.
- Clickable nodes and labels dynamically update the side details panel (MERN, Python, Computer Vision, Entrepreneurship) with a fade translation transition.

### 4. Direct Credentials Grid
- Hosts **10 professional certificates** from Santa Clara University (SCU), HP LIFE Program, Google, and Alison.
- Links directly to verified PDFs hosted in the repository.
- Layout adapts dynamically from a 4-column desktop grid to 2-column on tablets, and 1-column on mobile phones.

### 5. Media & Beyond Coding Section
- Displays content creation channels and media presence, including the **SVCE Science Hour** podcast and the **Talk with RJ Bala** Spotify/Instagram channel.

---

## 🛠 Tech Stack
- **Structure**: Semantic HTML5 (SEO and meta tags configured).
- **Styling**: Vanilla CSS3 (Custom properties, grid systems, flexbox, CSS clamp fluid typography, keyframe animations, glassmorphism blur filters).
- **Logic**: Vanilla ES6+ Javascript (Intersection Observers, Canvas context, Event Listeners).
- **Icons**: FontAwesome CDN.

---

## 🚀 Local Deployment

To run the project locally, serve it from a web server to allow PDF assets and stylesheets to load correctly.

### Option 1: Python HTTP Server (Recommended)
If you have Python installed, navigate to the project directory in your terminal and run:
`ash
python -m http.server 8000
`
Open your browser and navigate to **http://localhost:8000**.

### Option 2: Node.js (http-server)
Install the static server globally:
`ash
npm install -g http-server
`
Run the server from your directory:
`ash
http-server -p 8000
`
Navigate to **http://localhost:8000** in your browser.

---

## 📂 Repository Structure
`
├── assets/
│   └── leetcode.png       # Theme-recolored LeetCode logo (transparent background)
├── public/
│   ├── BALAKRISHNAN.pdf   # Resume PDF
│   └── *.pdf              # 10 credential certificates (SCU, HP LIFE, Google, Alison)
├── index.html             # Main document
├── style.css              # Styling rules & media queries
├── app.js                 # Starfield canvas & interface interactions
└── README.md              # Project documentation
`

---

## 👤 Developer Profile
- **Full Name**: Balakrishnan R
- **B.Tech**: Artificial Intelligence & Data Science, SVCE Chennai
- **GitHub**: [BalaKrishnan1708](https://github.com/BalaKrishnan1708)
- **LinkedIn**: [balakrishnan-r-5a1006278](https://linkedin.com/in/balakrishnan-r-5a1006278/)
- **LeetCode**: [Balakrishnan1708](https://leetcode.com/u/Balakrishnan1708/)
- **Contact**: bala.ramyaram@gmail.com | +91 94445 43801
