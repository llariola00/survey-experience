import { useState, useEffect } from "react";
import { Question } from "./components/Question";
import { ProgressBar } from "./components/ProgressBar";
import { Introduction } from "./components/Introduction";
import { Ending } from "./components/Ending";
import { PersonalInfo } from "./components/PersonalInfo";
import { questions, questionsV2 } from "./data/questions";

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [phase, setPhase] = useState<"Introduction" | "PersonalInfo" | "Survey" | "Ending">("Introduction");
    const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
    const [audio] = useState(new Audio('/ambient.mp3'));

    const currentQuestions = hasCompletedOnce ? questionsV2 : questions;

    // FOR TESTING
    // const handleSkipToEnd = () => {
    //     setCurrentQuestion(questions.length);
    //     setPhase("Ending");
    // };

    useEffect(() => {
        // Time access check effect
        const checkTimeAccess = () => {
            const now = new Date();
            const hour = now.getHours();
            const isAllowedTime = hour >= 19 || hour < 5; // 7 PM - 5 AM
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

        const canAccess = checkTimeAccess();
        if (!canAccess) return;

        const timeCheckInterval = setInterval(checkTimeAccess, 60000);

        // Random timing effect for container
        let randomTimingInterval: ReturnType<typeof setInterval>;
        if (hasCompletedOnce) {
            const container = document.getElementById('container');
            if (container) {
                const updateRandomTiming = () => {
                    const delay = Math.random() * 15;
                    const duration = 5 + Math.random() * 10;
                    container.style.setProperty('--random-delay', `-${delay}s`);
                    container.style.setProperty('--random-duration', `${duration}s`);
                };

                updateRandomTiming();
                randomTimingInterval = setInterval(updateRandomTiming, 5000);
            }
        }

        // Option glitch timing effect
        let optionTimingInterval: ReturnType<typeof setInterval>;
        if (hasCompletedOnce) {
            const updateOptionTiming = () => {
                const options = document.querySelectorAll('.option-glitch');
                options.forEach(option => {
                    const delay = Math.random() * 4;
                    const duration = 0.2 + Math.random() * 0.3;
                    (option as HTMLElement).style.setProperty('--option-delay', `${delay}s`);
                    (option as HTMLElement).style.setProperty('--option-duration', `${duration}s`);
                });
            };

            optionTimingInterval = setInterval(updateOptionTiming, 1000);
        }

        // Audio setup effect
        audio.loop = true;
        audio.volume = 0.8;

        const playAudio = () => {
            audio.play().catch(error => {
                console.log("Autoplay prevented:", error);
            });
            document.removeEventListener('click', playAudio);
        };

        document.addEventListener('click', playAudio);

        // Cleanup
        return () => {
            clearInterval(timeCheckInterval);
            if (randomTimingInterval) clearInterval(randomTimingInterval);
            if (optionTimingInterval) clearInterval(optionTimingInterval);
            audio.pause();
            audio.currentTime = 0;
            document.removeEventListener('click', playAudio);
        };
    }, [hasCompletedOnce, audio]);

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
    } ${hasCompletedOnce ? "glitch-active" : 
       (phase === "Survey" && questions[currentQuestion]?.act === 4) ? "glitch-active" : ""}`;

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
                {phase === "Survey" && currentQuestion < currentQuestions.length && (
                    <Question
                        question={currentQuestions[currentQuestion]}
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
            {/* <button
                className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleSkipToEnd}
            >
                Skip to End
            </button> */}

            {(phase === "Survey" || phase === "PersonalInfo") && <ProgressBar progress={progress} />}
        </div>
    );
}

export default App;
