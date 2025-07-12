import React, { useState } from 'react';
import { getUserId } from '../utils/analytics';

const ConsentDialog = ({ onConsent, onDecline }) => {
    const [showDetails, setShowDetails] = useState(false);
    const userId = getUserId();

    const handleConsent = () => {
        localStorage.setItem('study_consent_given', 'true');
        localStorage.setItem('consent_timestamp', Date.now().toString());
        onConsent();
    };

    const copyUserIdToClipboard = () => {
        navigator.clipboard.writeText(userId);
        alert('User-ID wurde in die Zwischenablage kopiert!');
    };

    const downloadUserIdFile = () => {
        const content = `Ihre anonyme User-ID für die Studie:
${userId}

Datum: ${new Date().toLocaleString('de-DE')}

Bitte bewahren Sie diese ID auf, falls Sie später an einem Interview teilnehmen möchten.
Die ID ermöglicht es uns, Ihre App-Nutzung mit Ihren Interview-Antworten zu verknüpfen.`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `user-id-${userId.slice(-8)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Einverständniserklärung zur Studienteilnahme
                    </h2>

                    <div className="space-y-4 text-gray-700">
                        <p>
                            <strong>Willkommen zu unserer Studie über adaptive Lernmodelle!</strong>
                        </p>

                        <p>
                            Durch die Nutzung dieser interaktiven Anwendung erklären Sie sich bereit,
                            an einer wissenschaftlichen Studie teilzunehmen. Wir erfassen dabei:
                        </p>

                        <ul className="list-disc pl-6 space-y-1">
                            <li>Ihre Interaktionen mit der Anwendung (Klicks, Antworten, Verweildauer)</li>
                            <li>Anonyme technische Daten (Browser, Bildschirmauflösung)</li>
                            <li>Ihre Antworten auf Quizfragen und Bewertungen</li>
                        </ul>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-semibold text-blue-800 mb-2">
                                Ihre anonyme User-ID:
                            </p>
                            <div className="flex items-center gap-2">
                                <code className="bg-blue-100 px-3 py-1 rounded text-sm font-mono text-blue-900">
                                    {userId}
                                </code>
                                <button
                                    onClick={copyUserIdToClipboard}
                                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                                >
                                    Kopieren
                                </button>
                                <button
                                    onClick={downloadUserIdFile}
                                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                                >
                                    Herunterladen
                                </button>
                            </div>
                            <p className="text-sm text-blue-700 mt-2">
                                <strong>Wichtig:</strong> Bitte bewahren Sie diese ID auf, falls Sie später
                                an einem Interview teilnehmen möchten. Sie ermöglicht es uns, Ihre App-Nutzung
                                mit Ihren Interview-Antworten zu verknüpfen.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-blue-600 hover:text-blue-800 underline text-sm"
                        >
                            {showDetails ? 'Weniger Details' : 'Mehr Details über die Datenerfassung'}
                        </button>

                        {showDetails && (
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
                                <h3 className="font-semibold">Detaillierte Datenschutzinformationen:</h3>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li><strong>Anonymität:</strong> Ihre Identität wird nicht erfasst</li>
                                    <li><strong>Lokale Speicherung:</strong> Daten werden zunächst in Ihrem Browser gespeichert</li>
                                    <li><strong>Freiwilligkeit:</strong> Sie können jederzeit abbrechen</li>
                                    <li><strong>Datennutzung:</strong> Nur für wissenschaftliche Zwecke</li>
                                    <li><strong>Löschung:</strong> Sie können Ihre Daten jederzeit löschen lassen</li>
                                    <li><strong>Kontakt:</strong> [Ihre E-Mail-Adresse für Fragen]</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleConsent}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex-1"
                        >
                            Ich stimme zu und möchte teilnehmen
                        </button>
                        <button
                            onClick={onDecline}
                            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 flex-1"
                        >
                            Ablehnen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsentDialog; 