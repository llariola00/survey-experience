import React from "react";

interface ProgressBarProps {
    progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-700 h-2">
            <div
                className="bg-blue-500 h-full transition-width duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};
