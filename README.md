# Praveen Samuvel A — Developer Portfolio

A fully responsive, animated personal portfolio built to showcase my work as a Full Stack Developer — featuring a particle background, scroll-reveal animations, an interactive resume preview, and a working contact form.

**🔗 Live Site:** [clouds-3.github.io/Portfolio-Sam](https://clouds-3.github.io/Portfolio-Sam/)

---

## 📖 About

This repository hosts the source code for my personal portfolio website — a single-page, no-framework site built with vanilla HTML, CSS, and JavaScript. It's designed to give recruiters and collaborators a fast, visual snapshot of my skills, work experience, and projects, along with a downloadable and inline-previewable resume.

## ✨ Features

- **Animated hero section** — particle canvas background, orbiting photo frame, and a typewriter-style role display
- **Scroll-reveal animations** — sections fade/slide into view as you scroll
- **Skills dashboard** — categorized skill cards with animated proficiency bars
- **Experience timeline** — internship history with role, company, dates, and impact bullets
- **Project showcase** — cards with metrics, tech stack chips, and links to live GitHub repositories
- **HR Perspective section** — candid hiring-manager-style notes on the profile's strengths and growth areas
- **Inline resume preview** — Google Drive–embedded PDF viewer, no download required to read it
- **Working contact form** — submits directly via [Formspree](https://formspree.io), no backend needed
- **Scroll progress indicator** — thin gradient bar tracking scroll position
- **Fully responsive** — dedicated mobile navigation menu and adaptive layouts
- **SEO & social-ready** — Open Graph and Twitter Card meta tags for clean link previews

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Markup       | HTML5                                |
| Styling      | CSS3 (custom properties / variables) |
| Interactivity| Vanilla JavaScript (Canvas API)      |
| Fonts        | Google Fonts — Space Grotesk, Fira Code |
| Forms        | Formspree                            |
| Resume Embed | Google Drive `/preview` iframe       |
| Hosting      | GitHub Pages                         |

## 📁 Project Structure

```
Portfolio-Sam/
├── index.html              # Main page — all sections
├── css/
│   └── style.css           # Global styles, theming, animations
├── js/
│   └── main.js             # Particle canvas, reveal-on-scroll, typewriter, counters
├── assets/
│   ├── Praveen_Samuvel_CV.pdf
│   ├── photo_data.js       # Embedded base64 profile photo
│   └── og-preview.png      # Social share preview image
└── README.md
```

## 🚀 Getting Started

Clone the repo and open it locally — no build step or dependencies required.

```bash
git clone https://github.com/Clouds-3/Portfolio-Sam.git
cd Portfolio-Sam
```

Then simply open `index.html` in your browser, or serve it locally:

```bash
# Using Python
python -m http.server 8000

# Using Node (http-server)
npx http-server .
```

Visit `http://localhost:8000` to view it.

## ⚙️ Configuration

A few values need to be set for the live deployment to work fully:

| What | Where | Notes |
|---|---|---|
| Resume preview & download link | `index.html` (resume section, nav, mobile menu) | Currently points to a Google Drive file — set sharing to "Anyone with the link can view" |
| Contact form endpoint | `index.html` → `<form action="...">` | Replace `YOUR_FORM_ID` with your [Formspree](https://formspree.io) form ID |
| Social preview image | `assets/og-preview.png` | 1200×630px recommended for OG/Twitter cards |

## 🌐 Deployment

This site is deployed via **GitHub Pages** directly from the `main` branch. Any push to `main` updates the live site automatically.

To deploy your own fork:
1. Go to **Settings → Pages**
2. Set source to `main` branch, `/ (root)`
3. Save — your site will be live at `https://<username>.github.io/<repo-name>/`

## 📬 Contact

**Praveen Samuvel A**
Full Stack Developer · Chennai, Tamil Nadu, India

- 📧 [samuvel9123@gmail.com](mailto:samuvel9123@gmail.com)
- 📞 +91 6369 283 239
- 🔗 [LinkedIn](https://linkedin.com/in/samuvel-86667b208)
- 💻 [GitHub](https://github.com/Clouds-3)

## 📄 License

This project is open for reference and learning purposes. If you'd like to reuse the design or structure for your own portfolio, please don't copy the content verbatim — fork it, then make it your own.

---

<p align="center">Built with precision & passion by Praveen Samuvel A</p>
