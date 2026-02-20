# Las Pecadoras — Menú Digital

Menú digital estático para el restaurante-bar **Las Pecadoras**.  
Construido con HTML5, CSS3 y JavaScript Puro (sin frameworks ni dependencias externas).

---

## 🗂️ Estructura

```
LAS-PECADORAS-WEB/
├── index.html              # SPA principal (SEO friendly)
├── css/
│   ├── main.css            # Paleta, layout base, hero, footer
│   ├── animations.css      # Keyframes: preloader, scroll reveal, price pop
│   └── components.css      # Tarjetas, badges, precios, botones
├── js/
│   ├── loader.js           # Preloader blob orgánico + transición de salida
│   └── scroll-reveal.js    # Intersection Observer (once: true)
├── assets/
│   ├── img/
│   │   ├── logo/           → logo.png  (reemplazar con logo real)
│   │   ├── platillos/      → la-pecadora.jpg, pancita.jpg, etc.
│   │   ├── bebidas/        → fotos de tarros y cocteles
│   │   └── ui/             → texturas o íconos auxiliares
│   └── fonts/              → tipografías locales opcionales
└── README.md
```

---

## 🎨 Paleta

| Variable CSS        | Hex       | Uso                        |
|---------------------|-----------|----------------------------|
| `--hueso`           | #F5EEDC   | Fondo principal            |
| `--rojo`            | #8B0000   | Precios, títulos destacados |
| `--naranja`         | #D35400   | Acentos, íconos            |
| `--dorado`          | #C9920A   | Badges dorados             |
| `--cafe-cuero`      | #3E2723   | Bordes, header, footer     |
| `--verde-olivo`     | #4A5E2A   | Sección cocteles           |

---

## 🖼️ Imágenes recomendadas

Coloca las fotos en `assets/img/platillos/` con estos nombres:
- `la-pecadora.jpg` — La Pecadora (foto hero)
- `pancita.jpg` — Pancita de la Casa
- Si no existe la imagen, el `<img>` se oculta automáticamente (`.no-img`)

---

## 📱 Compatibilidad

- ✅ Chrome/Safari móvil (iOS y Android)
- ✅ Chrome/Firefox desktop
- ✅ Sin dependencias externas (solo Google Fonts CDN)

---

## ✏️ Personalización rápida

1. **Logo**: reemplaza `assets/img/logo/logo.png`
2. **WhatsApp**: busca `521XXXXXXXXXX` en `index.html` y cambia por el número real
3. **Google Maps**: cambia `href="https://maps.google.com"` por el enlace real
4. **Redes sociales**: actualiza los `href="#"` de los `.social-link` en el footer
5. **Precios**: edita directamente en `index.html`

---

## 🚀 Deploy

Es un sitio 100% estático. Súbelo a:
- **GitHub Pages** — gratis
- **Netlify** — arrastra la carpeta al dashboard
- **Hosting tradicional** — copia la carpeta al servidor via FTP
