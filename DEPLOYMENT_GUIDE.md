# 🚀 Deployment Guide - AFM Interactive App

## Übersicht
Diese Anleitung zeigt, wie Sie Ihr AFM-Projekt mit Frontend + Backend deployen.

## Option 1: Render.com (Empfohlen)

### Backend Deployment

#### 1. **Render.com Account erstellen**
- Gehen Sie zu [render.com](https://render.com)
- Account mit GitHub verknüpfen

#### 2. **Backend Repository vorbereiten**
```bash
# In Ihrem Projekt-Ordner
git add .
git commit -m "Add backend deployment configuration"
git push origin main
```

#### 3. **Backend Service erstellen**
1. **Render Dashboard** → "New" → "Web Service"
2. **Repository auswählen**: Ihr GitHub Repository
3. **Konfiguration:**
   ```
   Name: afm-analytics-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Root Directory: backend
   ```
4. **Environment Variables hinzufügen:**
   ```
   NODE_ENV=production
   PORT=10000
   ```
5. **Deploy klicken**

#### 4. **Backend URL notieren**
Nach dem Deploy erhalten Sie eine URL wie:
`https://afm-analytics-backend-xxx.onrender.com`

### Frontend Deployment

#### 5. **Frontend-Konfiguration aktualisieren**
Ersetzen Sie in `src/config/api.js`:
```javascript
export const API_CONFIG = {
  BASE_URL: isDevelopment 
    ? 'http://localhost:3001'
    : 'https://IHR-BACKEND-URL.onrender.com', // ← Hier Ihre Backend-URL eintragen
```

#### 6. **CORS-Konfiguration aktualisieren**
In `backend/server.js`:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://IHR-USERNAME.github.io', // ← Ihre GitHub Pages URL
    'https://afm-frontend-xxx.onrender.com', // ← Falls Sie Frontend auch auf Render hosten
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

#### 7. **Frontend deployen**

**Option A: GitHub Pages (wie bisher)**
```bash
npm run build
npm run deploy
```

**Option B: Render.com (Frontend)**
1. **Render Dashboard** → "New" → "Static Site"
2. **Repository auswählen**
3. **Konfiguration:**
   ```
   Name: afm-frontend
   Build Command: npm run build
   Publish Directory: dist
   ```

## Option 2: Vercel + Railway

### Backend auf Railway
1. [railway.app](https://railway.app) → GitHub verknüpfen
2. **New Project** → Repository auswählen
3. **Root Directory**: `backend`
4. **Start Command**: `npm start`
5. **Domain** generiert: `xxx.up.railway.app`

### Frontend auf Vercel
1. [vercel.com](https://vercel.com) → GitHub verknüpfen
2. **Import Project** → Repository auswählen
3. **Build Settings:**
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

## 🔧 Nach dem Deployment

### 1. **URLs aktualisieren**
- Backend-URL in `src/config/api.js` eintragen
- Frontend-URL in `backend/server.js` CORS hinzufügen

### 2. **Testen**
```bash
# Backend testen
curl https://IHR-BACKEND-URL.onrender.com/api/analytics/stats

# Frontend besuchen
https://IHR-USERNAME.github.io/afm-pfm-ifm-interactive-explanation
```

### 3. **Daten einsehen**
- **Analytics Dashboard**: Frontend → Navigation → "📊 Analytics Dashboard"
- **Server Logs**: Render Dashboard → Ihr Service → "Logs"
- **Datenzugriff**: Backend Dashboard (erstellen Sie sich eine Admin-Route)

## 🌐 Zugriff für andere User

### Was andere User sehen:
1. **Frontend-URL teilen**: `https://ihr-username.github.io/...`
2. **Consent-Dialog**: Erscheint beim ersten Besuch
3. **User-ID**: Wird automatisch generiert und angezeigt
4. **Datenerfassung**: Läuft automatisch im Hintergrund

### Was Sie als Forscher sehen:
1. **Analytics Dashboard**: Live-Daten aller User
2. **Backend-Daten**: JSON-Dateien auf Server
3. **User-Matching**: `researcher-tools.html` für Interview-Verknüpfung

## 📊 Daten-Management

### Daten exportieren
```bash
# Über API
curl https://IHR-BACKEND-URL.onrender.com/api/analytics/export > data.csv

# Über Dashboard
Frontend → Analytics Dashboard → "Export All Data (CSV)"
```

### Daten-Backup
- **Automatisch**: Render erstellt tägliche Backups
- **Manuell**: Regelmäßig über API exportieren

## 🚨 Wichtige Einstellungen

### 1. **Umgebungsvariablen**
```bash
# Backend (Render)
NODE_ENV=production
PORT=10000

# Optional: Database URL falls Sie später auf echte DB umsteigen
# DATABASE_URL=postgresql://...
```

### 2. **CORS richtig konfigurieren**
```javascript
// backend/server.js - ALLE Frontend-URLs hinzufügen
const corsOptions = {
  origin: [
    'http://localhost:5173',           // Development
    'https://ihr-username.github.io', // GitHub Pages
    'https://custom-domain.com',       // Custom Domain
  ],
};
```

### 3. **Rate Limiting (Optional)**
```javascript
// Für Production empfohlen
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

## 🔍 Troubleshooting

### Häufige Probleme:

**1. CORS Errors**
- Frontend-URL in `backend/server.js` hinzufügen
- `credentials: true` korrekt gesetzt

**2. Backend nicht erreichbar**
- URL in `src/config/api.js` prüfen
- Render Service läuft (kann bei kostenlosen Accounts "schlafen")

**3. Keine Daten**
- Browser Network Tab prüfen
- Backend Logs auf Render anschauen
- Console Errors im Frontend prüfen

**4. Build Errors**
```bash
# Lokal testen
npm run build
npm run preview
```

### Debug-Modus aktivieren:
```javascript
// In src/config/api.js
console.log('API Configuration:', {
  baseUrl: API_CONFIG.BASE_URL,
  environment: isDevelopment ? 'development' : 'production'
});
```

## 📝 Checkliste

- [ ] Backend auf Render deployed
- [ ] Backend-URL in Frontend-Config eingetragen
- [ ] Frontend-URL in Backend-CORS hinzugefügt
- [ ] Frontend deployed (GitHub Pages oder Render)
- [ ] Test: Consent-Dialog erscheint
- [ ] Test: Interaktionen werden getrackt
- [ ] Test: Analytics Dashboard funktioniert
- [ ] Researcher-Tools zugänglich
- [ ] URLs an Teilnehmer verteilt

## 🎯 Production-Optimierungen

### Security
```javascript
// helmet für Security Headers
npm install helmet
app.use(helmet());

// Environment-based logging
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}; // Disable console.log in production
}
```

### Performance
```javascript
// Compression
npm install compression
app.use(compression());

// Static file caching
app.use(express.static('public', { maxAge: '1d' }));
```

---

**Letzte Aktualisierung**: Dezember 2024  
**Support**: Bei Problemen → GitHub Issues oder [Ihre Kontakt-Info] 