import { useState, useEffect } from 'react';

export const useAudio = (url: string) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        if (playing) {
            audio.volume = 0.5; // 30% volume
            audio.loop = true;
            audio.play().catch(error => {
                console.log("Audio playback failed:", error);
            });
        } else {
            audio.pause();
        }
        
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [playing, audio]);

    return [playing, toggle] as const;
}; 