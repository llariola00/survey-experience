import { useState } from 'react';

export const useClickSound = () => {
    const [audio] = useState(new Audio('/click.mp3'));

    const playClick = () => {
        audio.currentTime = 0; // Reset audio to start
        audio.volume = 0.5;
        audio.play().catch(error => {
            console.log("Click sound failed:", error);
        });
    };

    return playClick;
}; 