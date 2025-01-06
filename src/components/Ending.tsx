import React, { useEffect, useState } from "react";

interface EndingProps {
    onRestart: () => void;
    hasCompletedOnce: boolean;
}

export const Ending: React.FC<EndingProps> = ({ onRestart, hasCompletedOnce }) => {
    const [phase, setPhase] = useState<'blank' | 'flash' | 'message' | 'final'>('blank');
    const [message, setMessage] = useState('');
    const [spinCount, setSpinCount] = useState(7);
    
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    useEffect(() => {
        if (!hasCompletedOnce) {
            // Original phase sequence for first completion
            const blankTimer = setTimeout(() => {
                setPhase('flash');
            }, 2000);

            const flashTimer = setTimeout(() => {
                setPhase('message');
                setMessage("You're not supposed to be here!");
            }, 4000);

            const messageTimer = setTimeout(() => {
                setPhase('message');
                setMessage(". . . . . .");
            }, 7000);

            const message2Timer = setTimeout(() => {
                setMessage("WAKE UP, WAKE UP, REMEMBER WHO YOU ARE!");
            }, 9000);

            const message3Timer = setTimeout(() => {
                setMessage("REMEMBER SPIN 7 TIMES, 7 TIMES!");
            }, 11000);

            const message4Timer = setTimeout(() => {
                setMessage("REMEMBER WELL YOUR ANSWERS. . .");
            }, 13000);

            const finalTimer = setTimeout(() => {
                onRestart();
            }, 15000);

            return () => {
                clearTimeout(blankTimer);
                clearTimeout(flashTimer);
                clearTimeout(messageTimer);
                clearTimeout(message2Timer);
                clearTimeout(message3Timer);
                clearTimeout(message4Timer);
                clearTimeout(finalTimer);
            };
        } else {
            // Immediately show spin message for subsequent completions
            setPhase('message');
            if (spinCount > 0) {
                setMessage(`REMEMBER SPIN ${spinCount} TIMES, ${spinCount} TIMES!`);
            } else {
                setMessage(`It's ${getCurrentTime()} where you are. You should really get some sleep... If you can.`);
                const closeTimer = setTimeout(() => {
                    localStorage.setItem('surveyCompleted', 'true');
                    window.close();
                    // Fallback in case window.close() is blocked
                    if (!window.closed) {
                        document.body.innerHTML = '';
                        window.location.href = 'about:blank';
                    }
                }, 4000);

                return () => clearTimeout(closeTimer);
            }
        }
    }, [onRestart, hasCompletedOnce, spinCount]);

    const handleClick = () => {
        if (hasCompletedOnce && spinCount > 0) {
            const newCount = spinCount - 1;
            setSpinCount(newCount);
        }
    };

    return (
        <div 
            className="text-center cursor-pointer" 
            onClick={handleClick}
        >
            {(phase === 'message' || hasCompletedOnce) && (
                <h1 className="text-3xl mb-4 font-bold typing-question glitch-text text-red-500 italic">
                    {message}
                </h1>
            )}
        </div>
    );
};
