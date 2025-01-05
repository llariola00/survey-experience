import { useState, useEffect } from "react";
import { Question } from "./components/Question";
import { ProgressBar } from "./components/ProgressBar";
import { Introduction } from "./components/Introduction";
import { Ending } from "./components/Ending";
import { PersonalInfo } from "./components/PersonalInfo";
import { questions } from "./data/questions";

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [phase, setPhase] = useState<"Introduction" | "PersonalInfo" | "Survey" | "Ending">("Introduction");
    const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

    useEffect(() => {
        const checkTimeAccess = () => {
            const now = new Date();
            const hour = now.getHours();
            
            // Allow access between 7 PM (19) and 5 AM (5)
            const isAllowedTime = hour >= 19 || hour < 5;
            
            // Check if user has completed the survey
            const hasCompleted = localStorage.getItem('surveyCompleted');
            
            if (hasCompleted === 'true' && !isAllowedTime) {
                document.body.innerHTML = `
                    <div style="
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: black;
                        color: red;
                        font-family: monospace;
                        font-size: 20px;
                        text-align: center;
                    ">
                        <h1>Return after dark...<br>
                        (7 PM - 5 AM)</h1>
                    </div>
                `;
                return false;
            }
            return true;
        };

        // Check immediately on load
        const canAccess = checkTimeAccess();
        if (!canAccess) {
            return;
        }

        // Check every minute for time changes
        const interval = setInterval(checkTimeAccess, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const container = document.getElementById('container');
        if (container && hasCompletedOnce) {
            const updateRandomTiming = () => {
                const delay = Math.random() * 15; // Random delay between 0-15 seconds
                const duration = 5 + Math.random() * 10; // Random duration between 5-15 seconds
                container.style.setProperty('--random-delay', `-${delay}s`);
                container.style.setProperty('--random-duration', `${duration}s`);
            };

            updateRandomTiming();
            const interval = setInterval(updateRandomTiming, 5000); // Update timing every 5 seconds

            return () => clearInterval(interval);
        }
    }, [hasCompletedOnce]);

    useEffect(() => {
        if (hasCompletedOnce) {
            const updateOptionTiming = () => {
                const options = document.querySelectorAll('.option-glitch');
                options.forEach(option => {
                    const delay = Math.random() * 4; // Random delay between 0-4s
                    const duration = 0.2 + Math.random() * 0.3; // Random duration between 0.2-0.5s
                    (option as HTMLElement).style.setProperty('--option-delay', `${delay}s`);
                    (option as HTMLElement).style.setProperty('--option-duration', `${duration}s`);
                });
            };

            const interval = setInterval(updateOptionTiming, 1000); // Update timing every second
            return () => clearInterval(interval);
        }
    }, [hasCompletedOnce]);

    const handleAnswer = (answer: string) => {
        setAnswers([...answers, answer]);
        setCurrentQuestion((prev) => prev + 1);
        if (currentQuestion + 1 >= questions.length) {
            setPhase("Ending");
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setPhase("Survey");
        setHasCompletedOnce(true);
        localStorage.setItem('surveyCompleted', 'true');
    };

    const handleStart = () => {
        setPhase("PersonalInfo");
    };

    const handlePersonalInfoComplete = () => {
        setPhase("Survey");
    };

    const progress = (currentQuestion / questions.length) * 100;

    const containerClass = `min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center ${
        phase === "Ending" ? "ending-phase" : ""
    } ${hasCompletedOnce ? "glitch-active" : ""}`;

    return (
        <div
            id="container"
            className={containerClass}
        >
            <div className="max-w-lg w-full mx-auto p-6">
                {phase === "Introduction" && (
                    <Introduction onStart={handleStart} />
                )}
                {phase === "PersonalInfo" && (
                    <PersonalInfo 
                        onComplete={handlePersonalInfoComplete}
                        hasCompletedOnce={hasCompletedOnce}
                    />
                )}
                {phase === "Survey" && currentQuestion < questions.length && (
                    <Question
                        question={questions[currentQuestion]}
                        onAnswer={handleAnswer}
                        hasCompletedOnce={hasCompletedOnce}
                    />
                )}
                {phase === "Ending" && (
                    <Ending 
                        onRestart={handleRestart} 
                        hasCompletedOnce={hasCompletedOnce}
                    />
                )}
            </div>
            {(phase === "Survey" || phase === "PersonalInfo") && <ProgressBar progress={progress} />}
        </div>
    );
}

export default App;
