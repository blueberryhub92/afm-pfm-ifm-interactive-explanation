# Anonymous User Analytics System

Ein vollständiges Analytics-System für React-Apps ohne Cookies oder Login-Funktionalität.

## Features

- 🔒 **Anonyme Benutzer-IDs** - Keine Cookies oder Login erforderlich
- 💾 **Lokale Persistierung** - Daten werden lokal gespeichert und mit Backend synchronisiert
- 📊 **Umfassende Tracking** - Slide-Navigation, Interaktionen, Zeit-Tracking
- 📈 **Dashboard** - Einfache Datenvisualisierung und Export
- 🔄 **Retry-Mechanismus** - Automatische Synchronisation bei Netzwerkproblemen
- 📱 **Responsive** - Funktioniert auf Desktop und Mobile

## Installation

### Frontend Setup

```bash
# Analytics ist bereits in src/utils/analytics.js integriert
# Importieren Sie die benötigten Funktionen:
import { trackSlideChange, trackButtonClick, trackQuizAnswer } from './utils/analytics';
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

Der Backend-Server läuft standardmäßig auf Port 3001.

## Verwendung

### Basis-Tracking

```javascript
import { 
  trackSlideChange, 
  trackButtonClick, 
  trackQuizAnswer,
  trackSliderInteraction,
  trackTimeSpent
} from '../utils/analytics';

// Slide-Wechsel tracken
trackSlideChange(slideNumber, slideName);

// Button-Klicks tracken
trackButtonClick('next_button', {
  slideNumber: 5,
  context: 'navigation'
});

// Quiz-Antworten tracken
trackQuizAnswer('quiz_1', 'answer_b', true, 15000);

// Slider-Interaktionen tracken
trackSliderInteraction('confidence_slider', 75, {
  previousValue: 50
});

// Zeit auf Komponente tracken
useEffect(() => {
  const startTime = Date.now();
  return () => {
    trackTimeSpent('ComponentName', Date.now() - startTime);
  };
}, []);
```

### Erweiterte Verwendung

```javascript
// Benutzerdefinierte Events
trackCustomEvent('video_watched', {
  videoId: 'intro_video',
  duration: 120,
  completed: true
});

// Fehler tracken
trackError('api_error', 'Failed to load data', {
  endpoint: '/api/data',
  statusCode: 500
});

// Szenario-Completion tracken
trackScenarioComplete('binary_skills', 100, 85);
```

## API Endpoints

### Events speichern
```http
POST /api/analytics/events
Content-Type: application/json

{
  "userId": "user_abc123",
  "eventName": "button_click",
  "eventData": { "buttonName": "next" }
}
```

### Bulk Events speichern
```http
POST /api/analytics/events/bulk
Content-Type: application/json

[
  { "userId": "user_abc123", "eventName": "slide_change" },
  { "userId": "user_abc123", "eventName": "button_click" }
]
```

### Statistiken abrufen
```http
GET /api/analytics/stats
```

### Benutzer auflisten
```http
GET /api/analytics/users
```

### Events für bestimmten Benutzer
```http
GET /api/analytics/users/:userId
```

### Daten als CSV exportieren
```http
GET /api/analytics/export
```

## Datenstruktur

### Event-Format
```javascript
{
  userId: "user_1640995200000_abc123",
  sessionId: "session_1640995200000_def456", 
  eventName: "slide_change",
  eventData: {
    slideNumber: 5,
    slideName: "AFM Introduction"
  },
  timestamp: 1640995200000,
  serverTimestamp: 1640995201000,
  url: "http://localhost:3000",
  userAgent: "Mozilla/5.0...",
  screenResolution: "1920x1080",
  viewportSize: "1200x800",
  timeFromStart: 30000
}
```

### User-Identifikation
- **Anonymous User ID**: Persistiert in localStorage, z.B. `user_1640995200000_abc123`
- **Session ID**: Neu bei jedem Browser-Neustart, z.B. `session_1640995200000_def456`

## Dashboard

Zugriff auf das Analytics Dashboard:

```javascript
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

// In Ihrer App verwenden
<AnalyticsDashboard />
```

Das Dashboard zeigt:
- Gesamtstatistiken (Events, Benutzer, Sessions)
- Event-Typ-Breakdown
- Benutzer-Liste mit Details
- Detaillierte Event-Ansicht pro Benutzer
- Datenexport-Funktionen

## Datenschutz und DSGVO

### Anonyme Tracking
- Keine personenbezogenen Daten
- Zufällige Benutzer-IDs
- Keine IP-Adressen gespeichert
- User Agent für technische Kompatibilität

### Datenportabilität
```javascript
// Benutzerdaten exportieren
import { exportUserData, getUserId } from './utils/analytics';

const userData = exportUserData();
console.log('User ID:', getUserId());
```

### Daten löschen
```javascript
// Lokale Daten löschen
localStorage.removeItem('anonymous_user_id');
localStorage.removeItem('user_events');
sessionStorage.removeItem('session_id');
```

## Backend-Alternativen

### 1. Firebase/Firestore
```javascript
// In analytics.js sendToBackend() ersetzen
async sendToBackend(event) {
  try {
    await db.collection('events').add(event);
  } catch (error) {
    console.warn('Failed to send to Firebase:', error);
  }
}
```

### 2. Supabase
```javascript
// In analytics.js sendToBackend() ersetzen
async sendToBackend(event) {
  try {
    await supabase.from('events').insert([event]);
  } catch (error) {
    console.warn('Failed to send to Supabase:', error);
  }
}
```

### 3. Google Analytics 4 (anonymisiert)
```javascript
// gtag-Konfiguration für anonyme Tracking
gtag('config', 'GA_MEASUREMENT_ID', {
  anonymize_ip: true,
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});
```

## Erweiterte Konfiguration

### Analytics-Klasse erweitern
```javascript
class ExtendedAnalytics extends Analytics {
  constructor() {
    super();
    this.setupCustomTracking();
  }
  
  setupCustomTracking() {
    // Scroll-Tracking
    window.addEventListener('scroll', this.throttle(() => {
      this.track('scroll', {
        scrollY: window.scrollY,
        scrollPercent: (window.scrollY / document.body.scrollHeight) * 100
      });
    }, 1000));
    
    // Page Visibility
    document.addEventListener('visibilitychange', () => {
      this.track('visibility_change', {
        hidden: document.hidden
      });
    });
  }
  
  throttle(func, limit) {
    let inThrottle;
    return function() {
      if (!inThrottle) {
        func.apply(this, arguments);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}
```

## Deployment

### Produktion
1. Backend auf Server/Cloud deployen
2. Frontend Build mit korrekter Backend-URL
3. CORS-Konfiguration für Frontend-Domain
4. Rate Limiting für API-Endpoints

### Environment Variables
```bash
# Backend
PORT=3001
DATA_DIR=/var/analytics/data
CORS_ORIGIN=https://your-frontend-domain.com

# Frontend
REACT_APP_ANALYTICS_API=https://your-backend-domain.com/api
```

## Troubleshooting

### Häufige Probleme

1. **Events kommen nicht an**
   - Backend läuft? (`localhost:3001`)
   - CORS-Konfiguration korrekt?
   - Netzwerk-Tab in Browser-DevTools prüfen

2. **localStorage voll**
   - Automatische Bereinigung alle 1000 Events
   - Manuell: `localStorage.removeItem('user_events')`

3. **Duplikate vermeiden**
   - Debouncing für häufige Events
   - Event-IDs für Deduplication

## Best Practices

### Performance
- Verwenden Sie Throttling/Debouncing für häufige Events
- Batch-Requests für bessere Performance
- Lazy Loading für Analytics Dashboard

### Datenqualität
- Validierung von Event-Daten
- Einheitliche Naming-Conventions
- Structured Logging

### Monitoring
- Backend-Status überwachen
- Event-Failure-Rate tracken
- Datenintegrität prüfen

## Beispiel-Analyse

### Typische Fragen beantworten:

1. **Wo steigen Benutzer aus?**
   ```sql
   SELECT eventData->>'slideName', COUNT(*) 
   FROM events 
   WHERE eventName = 'slide_change' 
   GROUP BY eventData->>'slideName'
   ```

2. **Welche Features werden am meisten genutzt?**
   ```sql
   SELECT eventName, COUNT(*) 
   FROM events 
   GROUP BY eventName 
   ORDER BY COUNT(*) DESC
   ```

3. **Wie lange verbringen Benutzer in der App?**
   ```sql
   SELECT userId, MAX(timeFromStart) as session_duration
   FROM events 
   GROUP BY userId, sessionId
   ```

## Support

Bei Fragen oder Problemen:
1. Prüfen Sie die Browser-Konsole auf Fehler
2. Validieren Sie Backend-Logs
3. Testen Sie API-Endpoints manuell
4. Erstellen Sie ein GitHub Issue mit Details

---

**Wichtig**: Dieses System sammelt nur anonyme Nutzungsdaten. Für personalisierte Funktionen müssen Sie zusätzliche Identifikationsmechanismen implementieren. 