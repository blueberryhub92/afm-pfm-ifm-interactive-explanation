# Consent & User-ID Matching System

## Überblick

Das System ermöglicht es, anonyme App-Nutzer später mit Interview-Teilnehmern zu verknüpfen, während die Anonymität bis zu diesem Punkt gewahrt bleibt. Dies geschieht durch ein **Informed Consent** System und ein **User-ID Matching** Tool.

## 🔄 Workflow

### 1. **Teilnehmer nutzt die App**
- Beim ersten Besuch erscheint ein Consent-Dialog
- Teilnehmer stimmt der Studienteilnahme zu
- **User-ID wird angezeigt** (z.B. `user_1640995200000_abc123`)
- Teilnehmer kann diese ID kopieren oder als Datei herunterladen
- App-Nutzung wird mit dieser ID getrackt

### 2. **Interview-Termin**
- Forscher fragt nach der User-ID
- Teilnehmer gibt die ID an (aus Zwischenablage oder Datei)
- Interview wird durchgeführt

### 3. **Nachbearbeitung**
- Forscher nutzt das **UserIdMatcher**-Tool
- Verknüpfung: User-ID ↔ Interview-Daten
- Datenanalyse möglich

## 🛠️ Technische Implementierung

### Consent-Dialog (`ConsentDialog.jsx`)

```javascript
// Wird beim ersten App-Besuch angezeigt
// Speichert Consent-Status in localStorage
// Zeigt User-ID prominent an
// Bietet Copy- und Download-Funktionen
```

**Features:**
- ✅ GDPR-konform (expliziter Consent)
- ✅ User-ID wird hervorgehoben angezeigt
- ✅ Copy-to-Clipboard Funktion
- ✅ Download als .txt Datei
- ✅ Detaillierte Datenschutzinformationen
- ✅ Ablehnung führt zu Warnung

### App-Integration (`App.jsx`)

```javascript
// Prüft Consent-Status beim Start
// Aktiviert/deaktiviert Tracking basierend auf Consent
// Zeigt Dialog nur bei fehlendem Consent
```

**Tracking-Konditionierung:**
- Alle `trackButtonClick()` Calls sind an `consentGiven` gekoppelt
- Keyboard-, Mouse- und Button-Navigation wird nur bei Consent getrackt
- Slide-Changes werden nur bei Consent erfasst

### UserIdMatcher-Tool

#### Als React Component (`UserIdMatcher.jsx`)
```javascript
// Für Integration in bestehende React-Apps
import UserIdMatcher from './components/UserIdMatcher';
```

#### Als Standalone-Seite (`researcher-tools.html`)
```html
<!-- Öffne diese Datei direkt im Browser -->
<!-- Kein Build-Prozess erforderlich -->
<!-- Nutzt CDN für React und Tailwind -->
```

**Features:**
- ✅ Lokale Speicherung der Mappings
- ✅ Suchfunktion (User-ID, Name, Notizen)
- ✅ Export/Import als JSON
- ✅ Inline-Bearbeitung
- ✅ Statistiken-Übersicht
- ✅ Timestamp-Tracking

## 📋 Verwendung

### Für Teilnehmer

1. **App öffnen** → Consent-Dialog erscheint
2. **User-ID notieren:**
   - Kopieren: "Kopieren" Button
   - Speichern: "Herunterladen" Button
   - Manuell abschreiben
3. **App nutzen** → normale Interaktion
4. **Interview:** User-ID bereithalten

### Für Forscher

#### Setup
1. **Haupt-App:** Normal starten für Teilnehmer
2. **Forscher-Tools:** `researcher-tools.html` im Browser öffnen

#### Während der Studie
1. **Vor Interview:** Nach User-ID fragen
2. **Nach Interview:** 
   - Forscher-Tools öffnen
   - User-ID + Teilnehmerdaten eingeben
   - Speichern

#### Datenanalyse
1. **Analytics-Daten:** Aus Backend exportieren
2. **Mapping-Daten:** Aus UserIdMatcher exportieren
3. **Verknüpfung:** User-IDs matchen

## 🔒 Datenschutz & Compliance

### GDPR-Konformität
- ✅ **Expliziter Consent** vor Datenerfassung
- ✅ **Anonyme IDs** (keine Personenbezug)
- ✅ **Lokale Speicherung** (Nutzer-Kontrolle)
- ✅ **Freiwilligkeit** (Ablehnung möglich)
- ✅ **Transparenz** (detaillierte Informationen)
- ✅ **Datenportabilität** (Export-Funktionen)

### Datenschutz-Prinzipien
1. **Datenminimierung:** Nur notwendige Daten
2. **Zweckbindung:** Nur für Forschungszwecke
3. **Anonymisierung:** Keine direkten Personenbezug
4. **Nutzer-Kontrolle:** Lokale Speicherung
5. **Transparenz:** Klare Kommunikation

## 🗂️ Datenstrukturen

### User-ID Format
```
user_[timestamp]_[random]
Beispiel: user_1640995200000_abc123
```

### Mapping-Datenstruktur
```json
{
  "id": "1640995200000",
  "userId": "user_1640995200000_abc123",
  "participantName": "P01",
  "interviewDate": "2024-01-15",
  "notes": "Informatik Student, Interview via Zoom",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

### Analytics-Event mit User-ID
```json
{
  "userId": "user_1640995200000_abc123",
  "sessionId": "session_1640995200000_def456",
  "eventName": "slide_change",
  "eventData": {
    "slideNumber": 5,
    "slideName": "Quiz"
  },
  "timestamp": 1640995200000
}
```

## 🔧 Konfiguration

### Consent-Text anpassen
```javascript
// ConsentDialog.jsx, Zeile ~50
<p>
  Durch die Nutzung dieser interaktiven Anwendung...
</p>
```

### Forscher-Kontakt hinzufügen
```javascript
// ConsentDialog.jsx, Zeile ~95
<li><strong>Kontakt:</strong> [Ihre E-Mail-Adresse für Fragen]</li>
```

### Backend-Endpoint konfigurieren
```javascript
// analytics.js, Zeile ~78
const response = await fetch('/api/analytics/events', {
  // Backend-URL anpassen
});
```

## 🚀 Deployment

### Für Teilnehmer
1. **Normale App:** `npm run build` und deployen
2. **Consent-Dialog:** Automatisch integriert

### Für Forscher
1. **Forscher-Tools:** `researcher-tools.html` bereitstellen
2. **Zugang:** Direkter Link zur HTML-Datei
3. **Keine Installation:** Läuft im Browser

## 📊 Datenverarbeitung

### Schritt 1: Datensammlung
```bash
# Analytics-Daten vom Backend
curl http://localhost:3001/api/analytics/events > analytics.json

# Mapping-Daten vom Forscher-Tool
# → Export-Button im UserIdMatcher verwenden
```

### Schritt 2: Datenverknüpfung
```python
import json
import pandas as pd

# Lade Daten
analytics = pd.read_json('analytics.json')
mappings = pd.read_json('user-id-mappings.json')

# Verknüpfe über User-ID
combined = analytics.merge(mappings, on='userId', how='left')

# Analyse möglich
combined.groupby('participantName').agg({
    'eventName': 'count',
    'timeFromStart': 'mean'
})
```

## 🛡️ Sicherheit

### Lokale Speicherung
- **Vorteil:** Nutzer-Kontrolle, keine Server-Abhängigkeit
- **Nachteil:** Daten können verloren gehen (Browser-Reset)
- **Lösung:** Export-Funktionen für Backup

### User-ID Sicherheit
- **Pseudo-anonyme IDs:** Nicht direkt personenbezogen
- **Zeitstempel:** Für Eindeutigkeit, aber nicht rückverfolgbar
- **Zufall:** Verhindert Vorhersagbarkeit

## 📋 Checkliste für die Studie

### Vor der Studie
- [ ] Consent-Text anpassen
- [ ] Forscher-Kontakt eintragen
- [ ] Backend-Endpoint konfigurieren
- [ ] Forscher-Tools testen
- [ ] Datenschutz-Genehmigung einholen

### Während der Studie
- [ ] Teilnehmer über User-ID informieren
- [ ] User-ID vor Interview erfragen
- [ ] Mapping zeitnah eingeben
- [ ] Regelmäßige Datensicherung

### Nach der Studie
- [ ] Alle Mappings exportieren
- [ ] Analytics-Daten exportieren
- [ ] Datenverknüpfung durchführen
- [ ] Lokale Daten löschen (optional)

## 🔄 Troubleshooting

### Häufige Probleme

**User-ID nicht angezeigt:**
- Browser-Cache leeren
- localStorage prüfen: `localStorage.getItem('anonymous_user_id')`

**Consent-Dialog erscheint nicht:**
- localStorage prüfen: `localStorage.getItem('study_consent_given')`
- Wert löschen: `localStorage.removeItem('study_consent_given')`

**Mapping-Daten verloren:**
- Regelmäßige Exports durchführen
- Browser-Einstellungen prüfen (localStorage-Berechtigung)

**Tracking funktioniert nicht:**
- Consent-Status prüfen
- Browser-Konsole auf Fehler prüfen
- Backend-Verbindung testen

## 🎯 Best Practices

1. **Teilnehmer-Kommunikation:**
   - User-ID-Wichtigkeit betonen
   - Mehrere Backup-Optionen anbieten
   - Erinnerung vor Interview senden

2. **Datenmanagement:**
   - Regelmäßige Exports
   - Konsistente Namenskonventionen
   - Backup-Strategien

3. **Qualitätskontrolle:**
   - User-ID-Format validieren
   - Doppelte Eingaben prüfen
   - Vollständigkeit kontrollieren

## 📞 Support

Bei Problemen oder Fragen:
- Dokumentation konsultieren
- Browser-Konsole prüfen
- Lokale Speicher-Inhalte inspizieren
- Code-Kommentare lesen

---

**Letzte Aktualisierung:** Dezember 2024
**Version:** 1.0 