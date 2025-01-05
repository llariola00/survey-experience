import React from "react";

interface IntroductionProps {
    onStart: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onStart }) => {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Weclome to Honest Relfections</h1>
            <p className="mb-4">Please answer truthfully. Your honesty shapes what comes next.</p>
            <button
                className="mt-8 px-6 py-3 bg-gray-800 text-gray-300 rounded
                 hover:bg-gray-700 transition-all duration-300"
                onClick={onStart}
            >
                Start Survey
            </button>
        </div>
    );
};
