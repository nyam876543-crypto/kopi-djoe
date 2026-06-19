const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const RESERVATION_FILE = path.join(DATA_DIR, "reservations.json");

const siteData = {
  brand: {
    name: "Kopi Djoe",
    tagline: "More Than Coffee, More Than Hangout.",
    locationShort: "Jl. Margonda No.488, Depok",
    address: "Jl. Margonda No.488, Pondok Cina, Beji, Depok, Jawa Barat 16424",
    hoursShort: "Buka setiap hari 11.00–22.00, Sabtu sampai 23.00",
    phone: "0819-1818-1814",
    whatsapp: "https://wa.me/6281918181814",
    instagram: "https://instagram.com/kopidjoe",
    maps: "https://maps.google.com/?q=Jl.+Margonda+No.488,+Depok",
    rating: "4.9",
    reviewCount: "1.058+"
  },
  hero: {
    headline: "Tempat Ngopi Favorit di Margonda",
    subheadline:
      "Nikmati kopi berkualitas, makanan lezat, dan suasana nyaman untuk bekerja, meeting, maupun nongkrong bersama teman.",
    badges: [
      "Premium coffee dengan karakter hangat dan modern",
      "Comfort food, dessert, dan area cozy untuk kerja atau kumpul",
      "WiFi gratis, reservasi mudah, dan suasana instagramable"
    ]
  },
  highlights: [
    { icon: "☕", title: "Premium Coffee", text: "Espresso, latte, dan signature coffee yang diracik dengan karakter khas." },
    { icon: "🍛", title: "Comfort Food", text: "Rice bowl, hotplate, dan menu gurih untuk makan santai atau rapat." },
    { icon: "🍰", title: "Dessert Corner", text: "Pancake, affogato, dan dessert manis untuk penutup yang menyenangkan." },
    { icon: "📶", title: "Free WiFi", text: "Cocok untuk WFC, belajar, meeting kecil, atau tugas kuliah." }
  ],
  about: {
    title: "Cerita Kopi Djoe",
    body:
      "Berada di pusat kawasan Margonda, Kopi Djoe hadir sebagai tempat berkumpul yang nyaman dengan perpaduan kopi berkualitas, makanan yang menggugah selera, serta suasana yang mendukung produktivitas maupun relaksasi. Mulai dari mahasiswa Universitas Indonesia, pekerja kantoran, hingga keluarga, Kopi Djoe menjadi destinasi favorit untuk menikmati waktu bersama."
  },
  menuSections: [
    {
      title: "Signature Drinks",
      items: [
        { name: "Djoe's Carbana", price: "Rp38.000", featured: true, description: "Signature coffee dengan karakter creamy dan manis yang menjadi favorit pelanggan." },
        { name: "Caramello Macchiato", price: "Rp37.000", featured: true, description: "Perpaduan espresso dan karamel yang lembut." },
        { name: "Brown Sugar Shakerato", price: "Rp37.000", description: "Espresso dingin dengan sentuhan brown sugar." },
        { name: "Black Velvet Latte", price: "Rp37.000", featured: true, description: "Kopi creamy dengan cita rasa premium." },
        { name: "Djoe's Exotic ParTea", price: "Rp36.000", description: "Minuman teh signature khas Kopi Djoe." },
        { name: "Mermelaid Butterfly Tea", price: "Rp37.000", featured: true, description: "Butterfly tea segar dengan tampilan yang instagramable." }
      ]
    },
    {
      title: "Coffee Series",
      items: [
        { name: "Espresso", price: "Rp18.000" },
        { name: "Americano", price: "Rp23.000" },
        { name: "Cappuccino", price: "Rp23.000" },
        { name: "Caffe Latte", price: "Rp26.000" },
        { name: "Dolce Vanilla Latte", price: "Rp28.000" },
        { name: "Brown Sugar Latte", price: "Rp28.000", featured: true },
        { name: "Caffe Mocha", price: "Rp32.000", featured: true }
      ]
    },
    {
      title: "Non-Coffee Series",
      items: [
        { name: "French Choco", price: "Rp34.000", featured: true },
        { name: "Kumai Matcha Latte", price: "Rp35.000" },
        { name: "Red Velvet Latte", price: "Rp35.000", featured: true },
        { name: "Ube Taro Latte", price: "Rp35.000" },
        { name: "Lychee Tea", price: "Rp33.000" },
        { name: "Strawberry Tea", price: "Rp33.000" },
        { name: "Tropical Kiwi Fizz", price: "Rp34.000" },
        { name: "Lychee Fizz", price: "Rp34.000" },
        { name: "Strawberry Yoghurt Lush", price: "Rp35.000" }
      ]
    },
    {
      title: "Snacks",
      items: [
        { name: "Loaded Fries", price: "Rp39.000", featured: true, description: "Kentang goreng premium dengan topping melimpah." },
        { name: "Mix Bites", price: "Rp47.000", featured: true, description: "Kombinasi snack favorit untuk sharing." },
        { name: "Beef Quesadilla", price: "Rp45.000" },
        { name: "Chicken Tenders", price: "Rp32.000" },
        { name: "Onion Rings", price: "Rp26.000" },
        { name: "Tempe Mendoan", price: "Rp24.000" }
      ]
    },
    {
      title: "Rice Bowl Collection",
      items: [
        { name: "Crispy Chicken Fillet Madu", price: "Rp35.000", featured: true, description: "Ayam crispy dengan saus madu khas." },
        { name: "Crispy Chicken Fillet Matah", price: "Rp35.000" },
        { name: "Iga Sambal Penyet", price: "Rp42.000", featured: true, description: "Menu favorit pelanggan." },
        { name: "Iga Sambal Kecombrang", price: "Rp42.000" },
        { name: "Gepuk Rempah", price: "Rp40.000", featured: true },
        { name: "Gepuk Kremes", price: "Rp40.000" },
        { name: "Cumi Bumbu Eyang", price: "Rp37.000" },
        { name: "Fish Fillet Lada Hitam", price: "Rp35.000" }
      ]
    },
    {
      title: "Western Favorites",
      items: [
        { name: "Iga Hotplate", price: "Rp59.000", featured: true, description: "Pilihan saus: Black Pepper, BBQ, Honey." },
        { name: "Crispy Chicken Hotplate", price: "Rp45.000" },
        { name: "Fish and Chips", price: "Rp45.000", featured: true, description: "Pilihan saus: Asian Chilli, Black Pepper, Honey." },
        { name: "El Supreme Beef Taco", price: "Rp47.000", featured: true, description: "Double Beef Taco dengan cita rasa khas." },
        { name: "El Classico Fish Taco", price: "Rp41.000", featured: true }
      ]
    }
  ],
  bestSellers: [
    "Djoe's Carbana",
    "Iga Hotplate",
    "Loaded Fries",
    "Crispy Chicken Fillet Madu",
    "Fish and Chips",
    "El Supreme Beef Taco"
  ],
  gallery: [
    { category: "Interior Cafe", title: "Sudut interior hangat dengan pencahayaan amber" },
    { category: "Area Nongkrong", title: "Meja komunal untuk kerja, belajar, dan ngobrol" },
    { category: "Coffee Bar", title: "Bar area modern dengan nuansa industrial warm" },
    { category: "Signature Drinks", title: "Minuman favorit dengan plating premium" },
    { category: "Food Menu", title: "Comfort food dengan presentasi yang menggugah" },
    { category: "Dessert", title: "Dessert corner untuk pengalaman manis dan cozy" },
    { category: "Event Community", title: "Ruang yang pas untuk gathering, workshop, dan nobar" }
  ],
  events: [
    "Gathering komunitas",
    "Meeting kantor",
    "Birthday celebration",
    "Mini workshop",
    "Buka bersama",
    "Nonton bareng"
  ],
  testimonials: [
    { name: "Raka", quote: "Tempat nyaman, kopi enak, cocok buat kerja dan nongkrong." },
    { name: "Dinda", quote: "Makanan lengkap, harga masih masuk akal, suasana cozy." },
    { name: "Fahmi", quote: "Salah satu coffee shop terbaik di Margonda." }
  ],
  hours: [
    { day: "Senin", time: "11.00 – 22.00" },
    { day: "Selasa", time: "11.00 – 22.00" },
    { day: "Rabu", time: "11.00 – 22.00" },
    { day: "Kamis", time: "11.00 – 22.00" },
    { day: "Jumat", time: "11.00 – 22.00" },
    { day: "Sabtu", time: "11.00 – 23.00" },
    { day: "Minggu", time: "11.00 – 22.00" }
  ]
};

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function ensureReservationFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(RESERVATION_FILE)) {
    fs.writeFileSync(RESERVATION_FILE, "[]", "utf8");
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(payload));
}

function getReservations() {
  ensureReservationFile();
  try {
    const raw = fs.readFileSync(RESERVATION_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveReservations(items) {
  fs.writeFileSync(RESERVATION_FILE, JSON.stringify(items, null, 2), "utf8");
}

function collectRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        reject(new Error("Payload terlalu besar."));
        req.destroy();
      }
    });
    req.on("end", () => {
      resolve(body);
    });
    req.on("error", reject);
  });
}

function validateReservation(payload) {
  const requiredFields = ["name", "phone", "date", "time", "guests", "eventType"];
  const missing = requiredFields.filter((field) => !payload[field] || String(payload[field]).trim() === "");

  if (missing.length > 0) {
    return `Field wajib belum lengkap: ${missing.join(", ")}`;
  }

  const guestCount = Number(payload.guests);
  if (!Number.isFinite(guestCount) || guestCount < 1 || guestCount > 50) {
    return "Jumlah tamu harus antara 1 sampai 50.";
  }

  return null;
}

function serveStaticFile(req, res, pathname) {
  const cleanPath = pathname === "/" ? "/index.html" : pathname;
  const requestedPath = path.normalize(path.join(PUBLIC_DIR, cleanPath));

  if (!requestedPath.startsWith(PUBLIC_DIR)) {
    sendJson(res, 403, { message: "Akses ditolak." });
    return;
  }

  fs.readFile(requestedPath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Halaman tidak ditemukan.");
        return;
      }

      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Terjadi kesalahan pada server.");
      return;
    }

    const ext = path.extname(requestedPath);
    res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = requestUrl;

  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (pathname === "/api/site" && req.method === "GET") {
    const reservations = getReservations();
    sendJson(res, 200, {
      ...siteData,
      reservationStats: {
        count: reservations.length,
        latest: reservations[0] || null
      }
    });
    return;
  }

  if (pathname === "/api/reservations" && req.method === "GET") {
    const reservations = getReservations();
    sendJson(res, 200, reservations.slice(0, 10));
    return;
  }

  if (pathname === "/api/reservations" && req.method === "POST") {
    try {
      const rawBody = await collectRequestBody(req);
      const payload = rawBody ? JSON.parse(rawBody) : {};
      const errorMessage = validateReservation(payload);

      if (errorMessage) {
        sendJson(res, 400, { message: errorMessage });
        return;
      }

      const reservations = getReservations();
      const entry = {
        id: `RSV-${Date.now()}`,
        name: String(payload.name).trim(),
        phone: String(payload.phone).trim(),
        date: String(payload.date).trim(),
        time: String(payload.time).trim(),
        guests: Number(payload.guests),
        eventType: String(payload.eventType).trim(),
        notes: payload.notes ? String(payload.notes).trim() : "",
        createdAt: new Date().toISOString()
      };

      reservations.unshift(entry);
      saveReservations(reservations);

      sendJson(res, 201, {
        message: "Reservasi berhasil dikirim. Tim Kopi Djoe akan segera menghubungi Anda.",
        reservation: entry
      });
    } catch (error) {
      sendJson(res, 500, { message: "Data reservasi tidak dapat diproses." });
    }
    return;
  }

  serveStaticFile(req, res, pathname);
});

ensureReservationFile();

server.listen(PORT, HOST, () => {
  console.log(`Kopi Djoe app berjalan di http://${HOST}:${PORT}`);
});
