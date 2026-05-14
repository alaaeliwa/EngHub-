# 🎓 EngHub - Engineering Student Platform

**EngHub** is a premium, high-fidelity engineering education ecosystem. It serves as a centralized hub for engineering students to share resources, participate in workshops, and engage in peer-to-peer teaching. Designed with a modern "Soft-UI" aesthetic, it provides a professional environment for academic excellence.

---

## 🚀 Key Modules & Features

### 1. 🏠 Core Dashboard
- **Intelligent Navigation**: A collapsible premium sidebar that persists across all modules.
- **Dynamic Stats**: Real-time overview of user engagement, course progress, and upcoming events.
- **Global Search Integration**: Dedicated search page to find any resource across the platform instantly.

### 2. 📚 Courses & Materials
- **Structured Repository**: Categorized by academic year and semester for easy access.
- **Smart Filtering**: Real-time searching and content-type filtering (PDF, Video, Summaries).
- **Interactive Course View**: 
  - Tabbed content organization.
  - Social features (Likes/Dislikes) for quality control.
  - Discussion boards for collaborative learning.

### 3. 🧩 Peer-to-Peer Teaching
- **Marketplace**: A student-driven economy where students can publish their own courses.
- **Course Creation Wizard**: A professional 3-step form with validation, lesson management, and pricing options.
- **Premium Success Feedback**: Custom animated overlays and non-blocking notifications.

### 4. 👤 Advanced Profile Management
- **Personal Portfolio**: Showcase your role, biography, and academic stats.
- **Inline Editing**: Live editing of profile information (Name, Role, About) with a single click.
- **Visual Customization**: Instant avatar and cover photo uploads with real-time previews.

### 5. 📅 Workshops & Events
- **Events Portal**: Discover and register for programming, engineering, and soft-skills sessions.
- **Organizer Tools**: Robust form for creating workshops with dynamic location settings (Online/Offline).

---

## 🎨 Design & UI System

- **Aesthetics**: Modern "Premium Soft-UI" featuring glassmorphism, soft gradients, and refined shadows.
- **Notification System**: Replaced browser `alerts` with a custom **Global Toast System** (Success, Error, Info).
- **Micro-Animations**: Smooth entry animations (`animate-in`), slide transitions, and interactive hover states.
- **Typography**: Optimized for readability using the `Inter` and `Outfit` font families.

---

## 🛠️ Technology Stack

- **Frontend**: Pure HTML5, Vanilla CSS3 (Custom Design Tokens), Vanilla JavaScript (ES6+).
- **Icons**: Font Awesome 6.4 (Solid & Brand sets).
- **State Management**: Client-side simulated state for seamless UX demonstration.

---

## 📂 Project Architecture

```bash
EngHub/
├── pages/
│   ├── dashboard.html        # Main Overview & Stats
│   ├── profile.html          # User Portfolio & Settings
│   ├── courses.html          # Materials Repository
│   ├── course-details.html   # Deep-dive Content View
│   ├── search.html           # Platform-wide Global Search
│   ├── workshops.html        # Events Hub
│   ├── peer-teaching.html    # Student Marketplace
│   ├── create-course.html    # Course Publishing Wizard
│   ├── upload-materials.html # Resource Contribution
│   └── login/register.html   # Authentication Flow
├── style/
│   ├── global.css            # Design Tokens & Toast System
│   ├── dashboard.css         # Shared Layout Shell
│   ├── profile.css           # Portfolio Styling
│   └── ...                   # Modular CSS for each page
├── js/
│   ├── main.js               # Core Logic & Global Utilities (Toasts)
│   ├── profile.js            # Live Editing & Upload Logic
│   ├── create-course.js      # Multi-step Wizard Logic
│   └── ...                   # Feature-specific JavaScript
├── images/                   # Branding & Assets
└── README.md                 # Project Documentation
```


---

## 🎓 About the Project

**EngHub** is developed as a graduation project for Software Engineering. Its goal is to revolutionize how engineering students collaborate and learn outside the traditional classroom.

**Tagline**: _Engineering the Future, Together._

---

_Last Updated: May 12, 2026_
