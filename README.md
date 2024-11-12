# WhatsApp Bot

WhatsApp Bot adalah bot yang dibangun menggunakan `whatsapp-web.js` untuk berinteraksi dengan pengguna melalui WhatsApp. Bot ini memiliki berbagai fitur yang dapat disesuaikan dan diperluas sesuai kebutuhan.

## Fitur

- **Autentikasi Lokal**: Menggunakan `LocalAuth` untuk menyimpan sesi pengguna secara lokal.
- **QR Code**: Menghasilkan QR code untuk memudahkan autentikasi pengguna.
- **Event Handling**: Mengelola berbagai event seperti pesan masuk dan status bot.
- **Command Handling**: Menangani perintah yang dikirim oleh pengguna.
- **Headless Mode**: Dapat dijalankan dalam mode headless untuk penggunaan di server.

## Prerequisites

Sebelum menjalankan bot ini, pastikan Anda telah menginstal Node.js dan npm di sistem Anda.

## Instalasi

1. Clone repositori ini:

   ```bash
   git clone https://github.com/KbDevs12/bot-Wa.git
   cd bot-Wa
   ```

2. Install dependencies:

```bash
npm install
```

**Menjalankan Bot**
Untuk menjalankan bot, Anda dapat menggunakan salah satu dari perintah berikut:

- Untuk mode pengembangan (dengan nodemon):
  `bash npm run dev`
- Untuk menjalankan bot secara langsung:
  `bash npm start`
- Untuk build:
  `bash npm run build`

## Cara Kerja

Setelah Anda menjalankan bot, QR code akan dihasilkan di terminal. Scan QR code tersebut menggunakan aplikasi WhatsApp Anda untuk mengautentikasi bot. Setelah berhasil, bot akan siap digunakan dan dapat menerima pesan.

## Struktur Proyek

```bash
src/
├── bot.ts # File utama untuk menjalankan bot
|
├── commands/
|   └── # File Command
|
├── types/
|   └── # folder untuk menaruh interface dll.
|
├── events/
|   └── # event yang digunakan
|
├── commands/
|   └── # isi dari command
|
└── handlers/
    ├── commandHandlers.ts # Menangani perintah yang diterima dari pengguna
    └── EventHandler.ts # Menangani event-event yang terjadi pada bot
```
