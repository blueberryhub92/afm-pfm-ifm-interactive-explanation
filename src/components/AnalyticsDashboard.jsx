import { useState, useEffect } from 'react';
import { exportUserData, getUserId } from '../utils/analytics';
import { API_CONFIG } from '../config/api';

export const AnalyticsDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch analytics statistics
    const fetchStats = async () => {
        try {
            const response = await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.STATS));
            const data = await response.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    // Fetch users list
    const fetchUsers = async () => {
        try {
            const response = await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.USERS));
            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    // Fetch events for specific user
    const fetchUserEvents = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.USER_EVENTS(userId)));
            const data = await response.json();
            if (data.success) {
                setUserEvents(data.events);
                setSelectedUser(userId);
            }
        } catch (error) {
            console.error('Failed to fetch user events:', error);
        } finally {
            setLoading(false);
        }
    };

    // Export current user's data
    const handleExportUserData = () => {
        const userData = exportUserData();
        const blob = new Blob([JSON.stringify(userData, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `user_${getUserId()}_data.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Export all data as CSV
    const handleExportCSV = async () => {
        try {
            const response = await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.EXPORT));
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'analytics_export.csv';
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to export CSV:', error);
        }
    };

    useEffect(() => {
        fetchStats();
        fetchUsers();
    }, []);

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    const formatDuration = (ms) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

            {/* Current User Info */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Current Session</h2>
                <p><strong>Anonymous User ID:</strong> {getUserId()}</p>
                <button
                    onClick={handleExportUserData}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Export My Data
                </button>
            </div>

            {/* Overall Statistics */}
            {stats && (
                <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-600">Total Events</h3>
                        <p className="text-2xl font-bold">{stats.totalEvents}</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-600">Unique Users</h3>
                        <p className="text-2xl font-bold">{stats.uniqueUsers}</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-600">Sessions</h3>
                        <p className="text-2xl font-bold">{stats.uniqueSessions}</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-600">Event Types</h3>
                        <p className="text-2xl font-bold">{Object.keys(stats.eventTypes).length}</p>
                    </div>
                </div>
            )}

            {/* Event Types Breakdown */}
            {stats && stats.eventTypes && (
                <div className="mb-8 p-4 bg-white border border-gray-200 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Event Types</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.entries(stats.eventTypes).map(([eventType, count]) => (
                            <div key={eventType} className="p-2 bg-gray-50 rounded">
                                <div className="font-medium">{eventType}</div>
                                <div className="text-sm text-gray-600">{count} events</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Users List */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Users</h2>
                    <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Export All Data (CSV)
                    </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left">User ID</th>
                                <th className="px-4 py-2 text-left">Events</th>
                                <th className="px-4 py-2 text-left">Sessions</th>
                                <th className="px-4 py-2 text-left">First Visit</th>
                                <th className="px-4 py-2 text-left">Last Visit</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.userId} className="border-t">
                                    <td className="px-4 py-2 font-mono text-sm">{user.userId}</td>
                                    <td className="px-4 py-2">{user.eventCount}</td>
                                    <td className="px-4 py-2">{user.sessions}</td>
                                    <td className="px-4 py-2">{formatDate(user.firstEvent)}</td>
                                    <td className="px-4 py-2">{formatDate(user.lastEvent)}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => fetchUserEvents(user.userId)}
                                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                        >
                                            View Events
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Events Detail */}
            {selectedUser && (
                <div className="bg-white border border-gray-200 rounded-lg shadow">
                    <div className="px-4 py-3 bg-gray-50 border-b">
                        <h3 className="text-lg font-semibold">
                            Events for User: {selectedUser}
                        </h3>
                    </div>

                    {loading ? (
                        <div className="p-4 text-center">Loading...</div>
                    ) : (
                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Timestamp</th>
                                        <th className="px-4 py-2 text-left">Event</th>
                                        <th className="px-4 py-2 text-left">Data</th>
                                        <th className="px-4 py-2 text-left">Time from Start</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userEvents.map((event, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="px-4 py-2 text-sm">{formatDate(event.timestamp)}</td>
                                            <td className="px-4 py-2 font-medium">{event.eventName}</td>
                                            <td className="px-4 py-2 text-sm">
                                                <details>
                                                    <summary className="cursor-pointer text-blue-600">
                                                        View Data
                                                    </summary>
                                                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                                                        {JSON.stringify(event.eventData, null, 2)}
                                                    </pre>
                                                </details>
                                            </td>
                                            <td className="px-4 py-2 text-sm">{formatDuration(event.timeFromStart)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}; 