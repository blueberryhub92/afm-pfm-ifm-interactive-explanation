import React, { useState } from 'react';
import { getUserId } from '../utils/analytics';

export const ConsentDialog = ({ onConsent, onDecline }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [confirmations, setConfirmations] = useState({
        privacyRead: false,
        dataCollection: false,
        appTracking: false,
        studyId: false,
        voluntary: false,
        rights: false,
        interview: false
    });
    const userId = getUserId();

    const allConfirmed = Object.values(confirmations).every(value => value === true);

    const handleConfirmationChange = (key) => {
        setConfirmations(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleConsent = () => {
        if (!allConfirmed) {
            alert('Please confirm all statements before proceeding.');
            return;
        }
        localStorage.setItem('study_consent_given', 'true');
        localStorage.setItem('consent_timestamp', Date.now().toString());
        onConsent();
    };

    const copyUserIdToClipboard = () => {
        navigator.clipboard.writeText(userId);
        alert('User ID has been copied to clipboard!');
    };

    const downloadUserIdFile = () => {
        const content = `Your anonymous User ID for the study:
${userId}

Date: ${new Date().toLocaleString('en-US')}

Study: Design, Implementation and Evaluation of Human-Centered, Interactive Simulations for Explainable Student Models
Data Controller: Raphael Stedler
Contact: raphael.stedler@stud.uni-due.de

Please save this ID in case you want to participate in an interview later.
This ID allows us to link your app usage with your interview responses.`;

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
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Privacy Notice & Consent
                    </h2>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Research Study</h3>
                        <p className="text-blue-700 font-medium mb-2">
                            "Design, Implementation and Evaluation of Human-Centered, Interactive Simulations for Explainable Student Models"
                        </p>
                        <div className="text-sm text-blue-700">
                            <p><strong>Data Controller:</strong> Raphael Stedler</p>
                            <p><strong>Contact:</strong> raphael.stedler@stud.uni-due.de</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-gray-700">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">What data do we collect?</h3>

                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-semibold text-gray-700">App Interaction Data:</h4>
                                    <ul className="list-disc pl-6 space-y-1 text-sm">
                                        <li>Your clicks and navigation within the app</li>
                                        <li>Time spent on different screens</li>
                                        <li>Usage of app features</li>
                                        <li>Activity timestamps</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700">Survey Data:</h4>
                                    <ul className="list-disc pl-6 space-y-1 text-sm">
                                        <li>Your responses about the app experience</li>
                                        <li>Usability ratings and feedback</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700">Study ID:</h4>
                                    <ul className="list-disc pl-6 space-y-1 text-sm">
                                        <li>A randomly generated ID to link your data</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-semibold text-blue-800 mb-2">
                                Your anonymous Study ID:
                            </p>
                            <div className="flex items-center gap-2">
                                <code className="bg-blue-100 px-3 py-1 rounded text-sm font-mono text-blue-900">
                                    {userId}
                                </code>
                                <button
                                    onClick={copyUserIdToClipboard}
                                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                                >
                                    Copy
                                </button>
                                <button
                                    onClick={downloadUserIdFile}
                                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                                >
                                    Download
                                </button>
                            </div>
                            <p className="text-sm text-blue-700 mt-2">
                                <strong>Important:</strong> Please save this ID in case you want to participate
                                in an interview later. It allows us to link your app usage with your interview responses.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-blue-600 hover:text-blue-800 underline text-sm"
                        >
                            {showDetails ? 'Hide Details' : 'Show Full Privacy Notice'}
                        </button>

                        {showDetails && (
                            <div className="bg-gray-50 p-4 rounded-lg space-y-4 text-sm">
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Purpose & Legal Basis:</h4>
                                    <p>This data is collected for academic research purposes as part of a master's thesis. Processing is based on your informed consent under GDPR Art. 6(1)(a).</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Data Storage & Sharing:</h4>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Data stored securely for 10 years for research analysis</li>
                                        <li>No data shared with third parties</li>
                                        <li>Used exclusively for academic purposes</li>
                                        <li>All data will be deleted after the retention period</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Your Rights:</h4>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Withdraw consent at any time</li>
                                        <li>Request access to your data</li>
                                        <li>Request correction or deletion</li>
                                        <li>File complaints with data protection authorities</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Optional Follow-up:</h4>
                                    <p>You may be invited to participate in an optional interview after using the app. Separate consent will be requested.</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-6">
                            <p className="text-green-800 text-sm">
                                <strong>By using this app, you provide your informed consent</strong> that your collected data is used for the master's thesis "Design, Implementation and Evaluation of Human-Centered, Interactive Simulations for Explainable Student Models".
                            </p>
                        </div>

                        {/* Consent Confirmations */}
                        <div className="mt-6 bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-4">Confirmation:</h4>
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={confirmations.privacyRead}
                                        onChange={() => handleConfirmationChange('privacyRead')}
                                        className="mt-1"
                                    />
                                    <span className="text-sm">I have read and understood the privacy notice for the app study.</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={confirmations.dataCollection}
                                        onChange={() => handleConfirmationChange('dataCollection')}
                                        className="mt-1"
                                    />
                                    <span className="text-sm">I have been informed about the nature, scope, and purpose of data collection.</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={confirmations.appTracking}
                                        onChange={() => handleConfirmationChange('appTracking')}
                                        className="mt-1"
                                    />
                                    <span className="text-sm">I understand that my app usage will be recorded and I will complete a questionnaire about my user experience.</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={confirmations.studyId}
                                        onChange={() => handleConfirmationChange('studyId')}
                                        className="mt-1"
                                    />
                                    <span className="text-sm">I am aware that my data will be processed pseudonymously using a study ID.</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={confirmations.voluntary}
                                        onChange={() => handleConfirmationChange('voluntary')}
                                        className="mt-1"
                                    />
                                    <span className="text-sm">I understand that participation is voluntary and I can withdraw my consent at any time without giving reasons.</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={confirmations.rights}
                                        onChange={() => handleConfirmationChange('rights')}
                                        className="mt-1"
                                    />
                                    <span className="text-sm">I have been informed about my data protection rights.</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={confirmations.interview}
                                        onChange={() => handleConfirmationChange('interview')}
                                        className="mt-1"
                                    />
                                    <span className="text-sm">I have been informed about the possibility of an optional follow-up interview.</span>
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleConsent}
                            disabled={!allConfirmed}
                            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 disabled:hover:scale-100"
                        >
                            I agree and want to participate
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-4">
                        By clicking the button above, you consent to participate in this research study and data collection as described in this privacy notice.
                    </p>
                </div>
            </div>
        </div>
    );
}; 