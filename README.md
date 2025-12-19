# Indosat Ooredoo Hutchison  
## Modern Learning Management System (LMS) Frontend

Modern, enterprise-grade Learning Management System frontend untuk Direct Sales Executive (DSE) Indosat Ooredoo Hutchison. Dirancang dengan arsitektur scalable, UI profesional, dan pengalaman belajar berbasis gamifikasi.

---

## Tech Stack
- React (Functional Components, Hooks)
- TypeScript
- Tailwind CSS v4.0
- Motion React (Framer Motion)
- Recharts
- lucide-react

---

## Getting Started

### Requirements
- Node.js v18+
- npm

### Installation
```bash
npm install

## Run Development Server

```bash
npm run dev

```
System Overview

Aplikasi Learning Management System (LMS) dengan role-based access untuk:

Admin

Trainer

Direct Sales Executive (DSE)

Fokus pada pembelajaran terstruktur, analitik performa, dan peningkatan motivasi pengguna melalui gamifikasi.


### Project Structure
src/app/
├── context/
│   └── AppContext.tsx
├── components/
│   ├── Login.tsx
│   ├── Sidebar.tsx
│   ├── admin/
│   │   └── AdminDashboard.tsx
│   ├── trainer/
│   │   └── TrainerDashboard.tsx
│   ├── dse/
│   │   ├── DSEDashboard.tsx
│   │   ├── Learning.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── Badges.tsx
│   │   └── Certificates.tsx
│   └── shared/
│       └── QuizComponent.tsx
└── App.tsx
