# Buyr Scanner Web Component

En AI-driven self-service scanner som analyserar webbplatser och identifierar möjligheter för self-service-verktyg.

## Snabbstart

### 1. Inkludera scriptet

```html
<!-- ES Module (rekommenderat) -->
<script type="module" src="https://your-cdn.com/buyr-scanner.es.js"></script>

<!-- Eller UMD för äldre browsers -->
<script src="https://your-cdn.com/buyr-scanner.umd.js"></script>
```

### 2. Använd komponenten

```html
<buyr-scanner></buyr-scanner>
```

Det är allt! Scannern renderas automatiskt.

## Fullständigt exempel

```html
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Min sida med Buyr Scanner</title>
</head>
<body>
  <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
    <h1>Analysera din webbplats</h1>
    <buyr-scanner></buyr-scanner>
  </div>

  <script type="module" src="https://your-cdn.com/buyr-scanner.es.js"></script>
</body>
</html>
```

## Attribut

| Attribut | Beskrivning | Exempel |
|----------|-------------|---------|
| `css-url` | URL till extern CSS för ytterligare styling | `css-url="https://example.com/custom.css"` |

### Exempel med attribut

```html
<buyr-scanner css-url="https://example.com/my-styles.css"></buyr-scanner>
```

## Styling

Komponenten använder Shadow DOM för isolation. För att anpassa utseendet kan du:

### 1. Omgivande container

```html
<div style="background: #1a1a1a; padding: 40px; border-radius: 16px;">
  <buyr-scanner></buyr-scanner>
</div>
```

### 2. Extern CSS via attribut

Skapa en CSS-fil med anpassningar och länka via `css-url`:

```css
/* custom-scanner.css */
#buyr-scanner-root {
  --primary: 200 80% 60%;
  --background: 220 20% 10%;
}
```

```html
<buyr-scanner css-url="/css/custom-scanner.css"></buyr-scanner>
```

## Tillgängliga CSS-variabler

```css
--background: 0 0% 5%;
--foreground: 0 0% 100%;
--card: 0 0% 10%;
--card-foreground: 0 0% 100%;
--primary: 145 89% 71%;
--primary-foreground: 0 0% 5%;
--secondary: 0 0% 15%;
--secondary-foreground: 0 0% 100%;
--muted: 0 0% 15%;
--muted-foreground: 0 0% 65%;
--accent: 145 89% 71%;
--accent-foreground: 0 0% 5%;
--destructive: 0 84% 60%;
--destructive-foreground: 0 0% 100%;
--border: 0 0% 18%;
--input: 0 0% 18%;
--ring: 145 89% 71%;
--radius: 0.75rem;
```

## Bygga web componenten

För att bygga en distribuerbar version:

```bash
# Installera dependencies
npm install

# Bygg web component
npx vite build --config vite.config.webcomponent.ts
```

Output hamnar i `dist/webcomponent/`:
- `buyr-scanner.es.js` - ES Module format
- `buyr-scanner.umd.js` - UMD format för bredare kompatibilitet

## Krav

- Modern webbläsare med stöd för Custom Elements v1
- JavaScript aktiverat

### Webbläsarstöd

| Webbläsare | Version |
|------------|---------|
| Chrome | 67+ |
| Firefox | 63+ |
| Safari | 10.1+ |
| Edge | 79+ |

## Felsökning

### Komponenten visas inte

1. Kontrollera att scriptet laddas korrekt (kolla nätverksfliken i dev tools)
2. Verifiera att JavaScript är aktiverat
3. Kontrollera konsolen för eventuella fel

### Styling fungerar inte

1. Shadow DOM isolerar komponenten - använd `css-url` attributet
2. CSS-variabler måste definieras inuti `#buyr-scanner-root`

---

## Lokal utveckling

```bash
# Klona repot
git clone <YOUR_GIT_URL>

# Installera dependencies
npm install

# Starta dev server
npm run dev
```

## Teknologier

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
