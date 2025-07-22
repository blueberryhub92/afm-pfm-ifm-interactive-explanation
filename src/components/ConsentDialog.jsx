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
        alert('User ID has been copied to clipboard!');
    };

    const downloadUserIdFile = () => {
        const content = `Your anonymous User ID for the study:
${userId}

Date: ${new Date().toLocaleString('en-US')}

Study: Design, Implementation and Evaluation of Human-Centered, Interactive Simulations for Explainable Student Models

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
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Consent Declaration for Study Participation
                    </h2>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Master's Thesis Study</h3>
                        <p className="text-blue-700 font-medium">
                            Design, Implementation and Evaluation of Human-Centered, Interactive Simulations for Explainable Student Models
                        </p>
                    </div>

                    <div className="space-y-4 text-gray-700">
                        <p>
                            <strong>Welcome to our study on adaptive learning models!</strong>
                        </p>

                        <p>
                            By using this interactive application, you agree to participate in a scientific study. We collect:
                        </p>

                        <ul className="list-disc pl-6 space-y-1">
                            <li>Your interactions with the application (clicks, answers, dwell time)</li>
                            <li>Anonymous technical data (browser, screen resolution)</li>
                            <li>Your answers to quiz questions and assessments</li>
                        </ul>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-semibold text-blue-800 mb-2">
                                Your anonymous User ID:
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
                            {showDetails ? 'Fewer Details' : 'More Details about Data Collection'}
                        </button>

                        {showDetails && (
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
                                <h3 className="font-semibold">Detailed Privacy Information:</h3>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li><strong>Anonymity:</strong> Your identity is not recorded</li>
                                    <li><strong>Local Storage:</strong> Data is initially stored in your browser</li>
                                    <li><strong>Voluntary:</strong> You can quit at any time</li>
                                    <li><strong>Data Usage:</strong> Only for scientific purposes</li>
                                    <li><strong>Deletion:</strong> You can have your data deleted at any time</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleConsent}
                            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            I agree and want to participate
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-4">
                        By clicking the button above, you consent to participate in this research study and data collection.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConsentDialog; 