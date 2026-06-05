# Horizon Digital Landing Page

Landing page statis modern untuk **Horizon Digital**, sebuah agensi solusi digital. Halaman ini dibuat dengan vanilla HTML, CSS, dan JavaScript tanpa dependency tambahan.

## Fitur

- Desain dark theme responsif.
- Navbar fixed dengan hamburger menu untuk mobile.
- Hero section dengan call-to-action.
- Canvas particle background.
- Counter animation untuk statistik.
- Scroll reveal animation menggunakan Intersection Observer.
- Section layanan, testimoni, CTA, dan footer.
- Struktur file terpisah agar lebih mudah dirawat.
- Aksesibilitas dasar: semantic HTML, label form, aria label, dan tombol menu dengan `aria-expanded`.

## Struktur Project

```text
.
├── index.html
├── styles.css
├── script.js
├── README.md
└── .gitignore
```

## Cara Menjalankan

Karena ini project statis, Anda bisa langsung membuka `index.html` di browser.

Rekomendasi untuk development lokal:

```bash
# Jika memakai VS Code Live Server, buka index.html lalu klik "Open with Live Server"
```

Atau gunakan server statis sederhana:

```bash
python -m http.server 8000
```

Lalu buka:

```text
http://localhost:8000
```

## Kustomisasi

- Ubah konten halaman di `index.html`.
- Ubah warna, layout, dan animasi di `styles.css`.
- Ubah interaksi seperti particles, counter, dan form handling di `script.js`.

## Catatan

Form CTA saat ini hanya menampilkan feedback sukses di sisi frontend. Untuk produksi, hubungkan form ke backend/API, layanan email marketing, atau form handler seperti Formspree/Netlify Forms.
