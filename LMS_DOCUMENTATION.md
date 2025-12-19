# Indosat Ooredoo Hutchison - Learning Management System (LMS)

## 🎯 Gambaran Umum
Learning Management System modern dan berstandar enterprise yang dirancang khusus untuk Direct Sales Executive (DSE) di Indosat Ooredoo Hutchison. Aplikasi ini dibangun menggunakan React, TypeScript, dan Tailwind CSS, serta menerapkan sistem akses berbasis peran untuk Admin, Trainer, dan DSE.

---

## 🎨 Fitur Desain
- **Warna Brand**: Indosat Merah (#DC1F2E), Kuning (#FFC600), Oranye (#FF6B00)
- **Mobile-First Design**: Responsif di seluruh perangkat
- **Animasi Halus**: Menggunakan Motion/React
- **UI Modern**: Tampilan korporat profesional dengan navigasi intuitif

---

## 👥 Peran Pengguna

### 1. Admin
**Akses**: admin@indosat.com  
**Fitur**:
- Dashboard global dengan analitik
- Manajemen pengguna
- Monitoring dan pengelolaan course
- Analitik performa berbasis grafik
- Visualisasi tren enrollment
- Pelacakan aktivitas secara real-time

### 2. Trainer
**Akses**: ahmad@indosat.com  
**Fitur**:
- Dashboard pribadi untuk pengelolaan course
- Pembuatan dan pengeditan course
- Monitoring progres peserta
- Pembuatan quiz dan assessment
- Analitik performa per course
- Pelacakan aktivitas peserta

### 3. DSE (Direct Sales Executive)
**Akses**: budi@indosat.com  
**Fitur**:
- Dashboard pembelajaran personal
- Katalog course dengan fitur filter
- Modul pembelajaran berbasis video
- Quiz interaktif dengan feedback instan
- Pelacakan progres dan penyelesaian
- Gamifikasi:
  - Sistem poin
  - Level dan badge
  - Leaderboard
- Pembuatan sertifikat
- Analitik dan target pembelajaran

---

## 📚 Fitur Utama

### Learning Path
- **Katalog Course**: Menampilkan seluruh course pelatihan
- **Progress Tracking**: Progress bar dan status penyelesaian
- **Sistem Modul**: Pembelajaran terstruktur dan berurutan
- **Video Training**: Video terintegrasi di setiap modul
- **Assessment**: Quiz setelah penyelesaian modul

### Gamifikasi
- **Sistem Poin**: Diperoleh dari course dan quiz
- **Level**: Peningkatan level berdasarkan pengalaman
- **Badge**: Achievement (Common, Rare, Epic, Legendary)
- **Leaderboard**: Peringkat antar DSE
- **Sertifikat**: Sertifikat digital yang dapat diunduh

### Sistem Quiz
- **Quiz Berwaktu** (opsional)
- **Pilihan Ganda**
- **Feedback Instan**
- **Penilaian Otomatis**
- **Status Lulus atau Tidak**
- **Review Jawaban dan Penjelasan**

---

## 🗂️ Struktur Proyek
/src/app/
├── context/
│ └── AppContext.tsx
├── components/
│ ├── Login.tsx
│ ├── Sidebar.tsx
│ ├── admin/
│ │ └── AdminDashboard.tsx
│ ├── trainer/
│ │ └── TrainerDashboard.tsx
│ ├── dse/
│ │ ├── DSEDashboard.tsx
│ │ ├── Learning.tsx
│ │ ├── Leaderboard.tsx
│ │ ├── Badges.tsx
│ │ └── Certificates.tsx
│ └── shared/
│ └── QuizComponent.tsx
└── App.tsx


---

## 💾 Struktur Mock Data

### Users
- 5 pengguna contoh (1 Admin, 1 Trainer, 3 DSE)
- Data profil, poin, level, dan badge

### Courses
- 6 course pelatihan:
  - Product Knowledge
  - Sales Techniques
  - Digital Services
  - Customer Service
  - Technical Training
  - Competitive Analysis

### Modules
- 6 modul per course
- Konten video
- Pelacakan progres

### Quizzes
- Soal pilihan ganda
- Penjelasan jawaban
- Passing score dapat dikonfigurasi

### Badges
- 5 jenis achievement
- Tingkatan rarity
- Kriteria unlock

---

## 🚀 Quick Start

### Kredensial Demo

**Admin**
- Email: admin@indosat.com
- Role: Admin

**Trainer**
- Email: ahmad@indosat.com
- Role: Trainer

**DSE**
- Email: budi@indosat.com
- Role: DSE
- Poin: 2850
- Level: 8

Gunakan tombol **Quick Demo Login** pada halaman login untuk masuk otomatis sesuai peran.

---

## 🎮 Alur Pengguna (DSE)
1. Login
2. Melihat dashboard personal
3. Memilih course
4. Menonton video modul
5. Mengerjakan quiz
6. Mendapatkan poin dan badge
7. Mengunduh sertifikat

---

## 📊 Analitik & Monitoring

### Admin
- Jumlah pengguna dan enrollment
- Tingkat penyelesaian course
- Tren enrollment
- Distribusi kategori
- Aktivitas pengguna
- Feed aktivitas real-time

### Trainer
- Jumlah peserta course
- Tingkat penyelesaian
- Rata-rata performa
- Aktivitas peserta terbaru

### DSE
- Progres pembelajaran
- Statistik aktivitas
- Target pembelajaran
- Peringkat
- Poin dan badge

---

## 🔧 Implementasi Teknis

### State Management
- React Context API
- Mock data simulasi backend
- Local state untuk interaksi UI

### Routing
- Render berdasarkan peran pengguna
- Proteksi halaman sesuai role

### Animasi
- Motion/React
- Animasi halaman dan modal
- Efek hover interaktif

### Chart
- Recharts
- Bar, Line, dan Pie Chart
- Responsif

---

## 🎯 Pengembangan Selanjutnya
- Integrasi backend (JWT atau OAuth)
- REST API
- Database produksi
- Leaderboard real-time
- Push notification
- Upload video untuk trainer

---

## 🎨 Kustomisasi
- Warna tema: `/src/styles/theme.css`
- Mock data: `/src/app/context/AppContext.tsx`

---

## 📱 Responsivitas
- Menu hamburger untuk mobile
- Layout grid responsif
- Interaksi ramah sentuhan
- Optimal untuk layar 320px ke atas

---

## ⚡ Performa
- Lazy loading aset
- Animasi optimal
- Update state efisien
- Minim re-render

---

## 🔐 Keamanan (Produksi)
- Autentikasi dan otorisasi
- Role-Based Access Control (RBAC)
- Validasi input
- Proteksi XSS dan CSRF
- Enkripsi data

---

**Dibangun untuk**: Indosat Ooredoo Hutchison  
**Target Pengguna**: Direct Sales Executive (DSE)  
**Tech Stack**: React, TypeScript, Tailwind CSS, Motion, Recharts  
**Desain**: Mobile-first, Enterprise-grade, Profesional


