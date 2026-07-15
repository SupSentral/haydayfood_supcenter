# Hay Day Foods Collection — SUPCENTER

Website katalog food Hay Day: cari, filter per mesin, urutkan, pilih jumlah,
lihat total harga, dan salin list pesanan.

## Cara Pakai (Lokal)

Karena `js/app.js` pakai ES Module (`type="module"`), file `index.html`
**tidak bisa dibuka langsung dengan double-click** (protokol `file://` akan
diblokir browser). Jalankan lewat local server, contoh:

```bash
# Python
python3 -m http.server 8000

# lalu buka di browser:
http://localhost:8000
```

Atau pakai extension "Live Server" di VS Code.

## Ganti Banner & Logo

Placeholder yang sudah dibuat ada di folder `foods/`:

| File               | Ukuran ideal | Keterangan                          |
|---------------------|--------------|--------------------------------------|
| `foods/banner.png`  | 1400 x 320px | Banner di paling atas halaman        |
| `foods/logo.png`    | 300 x 300px  | Logo bulat, tampil di tengah banner  |
| `foods/default.png` | 200 x 200px  | Icon fallback kalau gambar food tidak ada |

Tinggal **timpa (replace) file dengan nama yang sama**, tidak perlu ubah kode.

## Tambah Gambar Food

Nama file gambar food mengikuti nama Inggris-nya, spasi diganti underscore,
tanpa tanda petik. Taruh di folder `foods/`. Contoh:

| Nama Food (`data.js`) | Nama file yang dicari         |
|-------------------------|-------------------------------|
| `Bread`                  | `foods/Bread.png`             |
| `Corn Bread`             | `foods/Corn_Bread.png`        |
| `Frutti di Mare Pizza`   | `foods/Frutti_di_Mare_Pizza.png` |

Kalau file gambar food tertentu belum ada, otomatis fallback ke
`foods/default.png` (sudah diatur di `js/render.js` lewat `onerror`).

## Update Data Food

Edit langsung `js/data.js`. Format satu baris:

```js
{ en: "Nama Food", lvl: 10, fn: "Nama Mesin" },
```

- `en` = nama food (juga dipakai untuk cari file gambar)
- `lvl` = level dibutuhkan
- `fn`  = nama mesin/machine (otomatis muncul di dropdown filter)

## Struktur Project

```
index.html
css/
  style.css        -> semua styling (termasuk responsive)
  responsive.css    -> disediakan kosong, cadangan kalau mau pisah rule responsive
js/
  app.js            -> entry point, inisialisasi semua modul
  data.js           -> data food (edit di sini)
  render.js         -> render kartu food ke grid
  search.js         -> search, filter mesin, sort, reset
  selected.js       -> logic tambah/kurang qty, render list pilihan
  statistics.js     -> hitung total food/mesin/level/dipilih
  storage.js        -> simpan pilihan ke localStorage
  clipboard.js       -> tombol salin list ke clipboard
foods/
  banner.png, logo.png, default.png -> placeholder (ganti sesuai kebutuhan)
```

## Deploy ke Netlify (gratis, seperti web referensi)

1. Buat akun di https://netlify.com
2. Drag & drop folder project ini ke halaman "Deploy" Netlify, atau
3. Push ke GitHub lalu connect repo-nya ke Netlify (auto-deploy tiap push)
