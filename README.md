# 🎓 EngHub - Engineering Student Platform

**EngHub** is a comprehensive, centralized learning platform designed specifically for engineering students. It bridges the gap between formal university curriculum and practical skills by providing organized course materials, workshops, and peer-to-peer learning opportunities.

---

## 🚀 Key Modules & Features

### 1. 🏠 Core Dashboard
- **Compact Sidebar**: Permanent navigation for seamless switching between modules.
- **Top Navbar**: Integrated search and user profile management.
- **Overview Stat Cards**: Quick glance at total materials, upcoming workshops, and registered events.

### 2. 📚 Courses & Materials
- **Academic Structure**: Materials organized by Year (1st - 4th) and Semester.
- **Smart Filtering**: Real-time search by course name or code, and filtering by content type (PDF, Summary, Video).
- **Course Details**:
  - **Tabbed Interface**: Seamless switching between Summaries, PDFs, Videos, and Exam Banks.
  - **Material Voting**: Upvote/Downvote system for quality control.
  - **Interactive Discussions**: Integrated comment section for peer collaboration.

### 3. 🧩 Workshops & Events
- **Events Portal**: Discover upcoming educational sessions, bootcamps, and soft skills workshops.
- **Featured Workshop**: High-impact banner for the most important upcoming event.
- **Add Workshop Form**: A professional, card-based interface for students to organize their own workshops, featuring:
  - Dynamic location toggling (Online vs. Physical Location).
  - Seat management and instructor bio integration.
  - Dynamic list management for topics and requirements.
- **Workshop Details**: Deep-dive into session objectives, instructor profiles, and quick registration system.

### 4. 🔐 Authentication & Access
- **Modern Login/Register**: Clean, focused interface for user entry.
- **Role Awareness**: Distinctions between Student and Organizer profiles.

---

## 🎨 Design System

- **Aesthetics**: Modern "Soft-UI" with glassmorphism touches and subtle shadows.
- **Color Palette**: 
  - **Primary**: Deep Teal (`#066f6c`) - Representing focus and stability.
  - **Secondary**: Vibrant Orange (`#f1822d`) - Representing energy and events.
- **Typography**: `Inter` Google Font for maximum readability.
- **Responsiveness**: Mobile-first architecture using CSS Grid and Flexbox.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom properties/Variables), Vanilla JavaScript (ES6+).
- **Icons**: Font Awesome 6.4.
- **Animations**: CSS transitions and keyframe animations for a "live" feel.

---

## 📂 Project Structure

```bash
EngHub/
├── pages/
│   ├── dashboard.html        # Main Overview
│   ├── courses.html          # Course Explorer
│   ├── course-details.html   # Detailed Content View
│   ├── workshops.html        # Events Portal
│   ├── workshop-details.html # Session Deep-dive
│   ├── create-workshop.html  # Workshop Creation Form
│   ├── login.html            # Authentication
│   └── register.html         # User Registration
├── style/
│   ├── global.css            # Design System & Variables
│   ├── dashboard.css         # Shared Layout Styles
│   ├── courses.css           # Materials Module UI
│   ├── workshops.css         # Events Module UI
│   └── ...                   # Page-specific styling
├── js/
│   ├── main.js               # Global UI Logic
│   ├── courses.js            # Filtering & Search Logic
│   └── create-workshop.js    # Form Logic & Toggles
├── images/                   # Local assets & logos
└── README.md                 # Project Documentation
```

---

## 🏁 Future Roadmap

- [ ] **Backend Integration**: Connecting to Node.js/Express for real data persistence.
- [ ] **Notification System**: Real-time alerts for new materials or upcoming workshops.
- [ ] **PDF Previewer**: Direct in-browser viewing of summary documents.
- [ ] **Peer Teaching**: Real-time scheduling for 1-on-1 student sessions.

---

## 🎓 About the Project

**EngHub** is developed as part of a Software Engineering graduation project. Its mission is to make engineering education more accessible, collaborative, and organized for the next generation of engineers.

**Tagline**: _Empowering Engineers, One Resource at a Time._

---

_Last Updated: May 12, 2026_
