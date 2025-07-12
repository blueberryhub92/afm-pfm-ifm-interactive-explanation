import React, { useState, useEffect } from 'react';

const UserIdMatcher = () => {
    const [userIdMappings, setUserIdMappings] = useState([]);
    const [newUserId, setNewUserId] = useState('');
    const [newParticipantName, setNewParticipantName] = useState('');
    const [newInterviewDate, setNewInterviewDate] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Load existing mappings from localStorage
    useEffect(() => {
        const savedMappings = localStorage.getItem('user_id_mappings');
        if (savedMappings) {
            setUserIdMappings(JSON.parse(savedMappings));
        }
    }, []);

    // Save mappings to localStorage
    const saveMappings = (mappings) => {
        localStorage.setItem('user_id_mappings', JSON.stringify(mappings));
        setUserIdMappings(mappings);
    };

    // Add new mapping
    const addMapping = () => {
        if (!newUserId || !newParticipantName) {
            alert('Bitte User-ID und Teilnehmername eingeben');
            return;
        }

        const newMapping = {
            id: Date.now().toString(),
            userId: newUserId,
            participantName: newParticipantName,
            interviewDate: newInterviewDate,
            notes: newNotes,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        const updatedMappings = [...userIdMappings, newMapping];
        saveMappings(updatedMappings);

        // Clear form
        setNewUserId('');
        setNewParticipantName('');
        setNewInterviewDate('');
        setNewNotes('');
    };

    // Update mapping
    const updateMapping = (id, field, value) => {
        const updatedMappings = userIdMappings.map(mapping => {
            if (mapping.id === id) {
                return {
                    ...mapping,
                    [field]: value,
                    lastUpdated: new Date().toISOString()
                };
            }
            return mapping;
        });
        saveMappings(updatedMappings);
    };

    // Delete mapping
    const deleteMapping = (id) => {
        if (confirm('Möchten Sie diese Zuordnung wirklich löschen?')) {
            const updatedMappings = userIdMappings.filter(mapping => mapping.id !== id);
            saveMappings(updatedMappings);
        }
    };

    // Export mappings
    const exportMappings = () => {
        const dataStr = JSON.stringify(userIdMappings, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `user-id-mappings-${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // Import mappings
    const importMappings = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedMappings = JSON.parse(e.target.result);
                    if (Array.isArray(importedMappings)) {
                        saveMappings(importedMappings);
                        alert('Mappings erfolgreich importiert!');
                    } else {
                        alert('Ungültiges Dateiformat');
                    }
                } catch (error) {
                    alert('Fehler beim Importieren der Datei');
                }
            };
            reader.readAsText(file);
        }
    };

    // Filter mappings based on search term
    const filteredMappings = userIdMappings.filter(mapping =>
        mapping.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mapping.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mapping.notes.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                User-ID ↔ Interview-Teilnehmer Mapping
            </h2>

            {/* Add new mapping form */}
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">
                    Neue Zuordnung hinzufügen
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            User-ID (anonyme ID aus der App)
                        </label>
                        <input
                            type="text"
                            value={newUserId}
                            onChange={(e) => setNewUserId(e.target.value)}
                            placeholder="z.B. user_1640995200000_abc123"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teilnehmername/Pseudonym
                        </label>
                        <input
                            type="text"
                            value={newParticipantName}
                            onChange={(e) => setNewParticipantName(e.target.value)}
                            placeholder="z.B. P01, Maria S., etc."
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Interview-Datum
                        </label>
                        <input
                            type="date"
                            value={newInterviewDate}
                            onChange={(e) => setNewInterviewDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notizen
                        </label>
                        <input
                            type="text"
                            value={newNotes}
                            onChange={(e) => setNewNotes(e.target.value)}
                            placeholder="z.B. Informatik Student, Interview via Zoom"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <button
                    onClick={addMapping}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Zuordnung hinzufügen
                </button>
            </div>

            {/* Search and export/import */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Suche nach User-ID, Name oder Notizen..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={exportMappings}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Exportieren
                    </button>
                    <label className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors cursor-pointer">
                        Importieren
                        <input
                            type="file"
                            accept=".json"
                            onChange={importMappings}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {/* Mappings table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-3 text-left">User-ID</th>
                            <th className="border border-gray-300 p-3 text-left">Teilnehmername</th>
                            <th className="border border-gray-300 p-3 text-left">Interview-Datum</th>
                            <th className="border border-gray-300 p-3 text-left">Notizen</th>
                            <th className="border border-gray-300 p-3 text-left">Erstellt</th>
                            <th className="border border-gray-300 p-3 text-left">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMappings.map((mapping) => (
                            <tr key={mapping.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-3">
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        {mapping.userId}
                                    </code>
                                </td>
                                <td className="border border-gray-300 p-3">
                                    <input
                                        type="text"
                                        value={mapping.participantName}
                                        onChange={(e) => updateMapping(mapping.id, 'participantName', e.target.value)}
                                        className="w-full p-1 border border-gray-300 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 p-3">
                                    <input
                                        type="date"
                                        value={mapping.interviewDate}
                                        onChange={(e) => updateMapping(mapping.id, 'interviewDate', e.target.value)}
                                        className="w-full p-1 border border-gray-300 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 p-3">
                                    <input
                                        type="text"
                                        value={mapping.notes}
                                        onChange={(e) => updateMapping(mapping.id, 'notes', e.target.value)}
                                        className="w-full p-1 border border-gray-300 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 p-3 text-sm text-gray-600">
                                    {new Date(mapping.createdAt).toLocaleDateString('de-DE')}
                                </td>
                                <td className="border border-gray-300 p-3">
                                    <button
                                        onClick={() => deleteMapping(mapping.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                    >
                                        Löschen
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredMappings.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    {searchTerm ? 'Keine Zuordnungen gefunden' : 'Noch keine Zuordnungen vorhanden'}
                </div>
            )}

            {/* Statistics */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Statistiken</h3>
                <p className="text-gray-600">
                    Insgesamt: {userIdMappings.length} Zuordnungen
                </p>
                <p className="text-gray-600">
                    Mit Interview-Datum: {userIdMappings.filter(m => m.interviewDate).length}
                </p>
            </div>
        </div>
    );
};

export default UserIdMatcher; 