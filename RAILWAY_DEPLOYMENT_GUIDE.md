# Railway Deployment Guide

## Schritt 1: Railway Account erstellen

1. Gehen Sie zu [railway.app](https://railway.app)
2. Klicken Sie auf "Login" → "GitHub" 
3. Autorisieren Sie Railway für Ihr GitHub-Konto

## Schritt 2: Backend deployen

### Option A: Über Railway Dashboard (Empfohlen)

1. **Neues Projekt erstellen:**
   - Klicken Sie auf "New Project"
   - Wählen Sie "Deploy from GitHub repo"
   - Wählen Sie Ihr Repository (`afm-pfm-ifm-interactive-explanation`)

2. **Backend-Service konfigurieren:**
   - Railway wird automatisch erkennen, dass es ein Node.js-Projekt ist
   - Wichtig: Setzen Sie das **Root Directory** auf `backend`
   - Gehen Sie zu "Settings" → "Service Settings" → "Root Directory" → `backend`

3. **Umgebungsvariablen (falls nötig):**
   - Railway setzt automatisch `PORT` (normalerweise 3001)
   - Weitere Variablen können unter "Variables" hinzugefügt werden

4. **Deployment starten:**
   - Klicken Sie auf "Deploy"
   - Railway wird automatisch `npm install` und `npm start` ausführen

### Option B: Über Railway CLI

```bash
# Railway CLI installieren
npm install -g @railway/cli

# Anmelden
railway login

# In backend-Ordner wechseln
cd backend

# Projekt erstellen und deployen
railway init
railway up
```

## Schritt 3: Backend-URL erhalten

1. Nach erfolgreichem Deployment finden Sie die URL unter:
   - Dashboard → Ihr Service → "Settings" → "Domains"
   - Die URL sieht etwa so aus: `https://your-service-name.up.railway.app`

2. **Wichtig:** Notieren Sie sich diese URL - Sie brauchen sie für den nächsten Schritt!

## Schritt 4: Frontend konfigurieren

1. **API-Konfiguration aktualisieren:**
   - Öffnen Sie `src/config/api.js`
   - Ersetzen Sie die Platzhalter-URL in Zeile 12 mit Ihrer echten Railway-URL:

```javascript
// Ersetzen Sie diese Zeile:
: 'https://afm-analytics-backend-production.up.railway.app',

// Mit Ihrer echten Railway-URL:
: 'https://ihre-echte-railway-url.up.railway.app',
```

2. **CORS im Backend aktualisieren:**
   - Railway wird automatisch die neue URL in den CORS-Einstellungen aktualisieren
   - Falls nicht, können Sie sie manuell in `backend/server.js` hinzufügen

## Schritt 5: Frontend neu deployen

Da Sie GitHub Pages verwenden:

```bash
# Änderungen committen
git add .
git commit -m "Update API config for Railway deployment"
git push origin main

# GitHub Pages wird automatisch aktualisiert
```

## Schritt 6: Testen

1. **Öffnen Sie Ihr Frontend:** `https://blueberryhub92.github.io/afm-pfm-ifm-interactive-explanation/`
2. **Testen Sie die Analytics:**
   - Öffnen Sie die Browser-Konsole (F12)
   - Navigieren Sie zu Slide 20 (AFM Simulator)
   - Interagieren Sie mit den Schiebereglern
   - Prüfen Sie, ob Events erfolgreich gesendet werden

3. **Analytics Dashboard testen:**
   - Drücken Sie 'A' um das Analytics Dashboard zu öffnen
   - Prüfen Sie, ob Daten angezeigt werden

## Troubleshooting

### Häufige Probleme:

1. **"Network Error" beim Senden von Events:**
   - Prüfen Sie, ob die Railway-URL in `src/config/api.js` korrekt ist
   - Öffnen Sie die Browser-Konsole und prüfen Sie auf CORS-Fehler

2. **Backend startet nicht:**
   - Prüfen Sie die Logs in Railway Dashboard → "Deployments" → "View Logs"
   - Stellen Sie sicher, dass `ROOT_DIRECTORY` auf `backend` gesetzt ist

3. **404 Fehler:**
   - Prüfen Sie, ob die API-Endpunkte korrekt sind
   - Testen Sie die Backend-URL direkt: `https://ihre-url.up.railway.app/api/analytics/stats`

### Logs einsehen:

```bash
# Mit Railway CLI
railway logs

# Oder im Dashboard: Deployments → View Logs
```

## Kosten & Limits

- **Kostenlos:** 500 Stunden/Monat (ca. 21 Tage)
- **Automatisches Schlafen:** Nach 30 Minuten Inaktivität
- **Aufwachen:** Automatisch bei der nächsten Anfrage (kann 1-2 Sekunden dauern)

## Erweiterte Konfiguration

### Umgebungsvariablen hinzufügen:

```bash
# Mit CLI
railway variables set NODE_ENV=production

# Oder im Dashboard: Variables → Add Variable
```

### Custom Domain (falls gewünscht):

1. Railway Dashboard → Settings → Domains
2. "Custom Domain" hinzufügen
3. DNS-Einstellungen bei Ihrem Domain-Provider anpassen

## Nächste Schritte

Nach erfolgreichem Deployment können Sie:
- Daten über das Analytics Dashboard einsehen
- User-IDs für Interviews sammeln
- Erweiterte Analytics implementieren

Bei Problemen prüfen Sie die Railway-Logs und die Browser-Konsole für Fehlermeldungen. 