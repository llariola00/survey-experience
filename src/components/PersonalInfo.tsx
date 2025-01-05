import { useEffect, useRef, useState } from "react";

interface PersonalQuestion {
    id: number;
    text: string;
    type: 'text' | 'options';
    options?: string[];
}

const personalQuestions: PersonalQuestion[] = [
    {
        id: 1,
        text: "Please Enter Your Name",
        type: 'text'
    },
    {
        id: 2,
        text: "What's your favorite color?",
        type: 'text'
    },
    {
        id: 3,
        text: "What's your gender?",
        type: 'options',
        options: ["Male", "Female", "Non-binary", "Prefer not to say"]
    }
];

interface PersonalInfoProps {
    onComplete: () => void;
    hasCompletedOnce: boolean;
}

export function PersonalInfo({ onComplete, hasCompletedOnce }: PersonalInfoProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const questionRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        setShow(false);
        setInputValue('');
        const timer = setTimeout(() => setShow(true), 50);

        if (questionRef.current) {
            questionRef.current.classList.remove("typing-question");
            void questionRef.current.offsetWidth;
            questionRef.current.classList.add("typing-question");
        }

        return () => clearTimeout(timer);
    }, [currentQuestion]);

    const handleNext = () => {
        if (currentQuestion + 1 < personalQuestions.length) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            handleNext();
        }
    };

    const question = personalQuestions[currentQuestion];

    return (
        <div className={`space-y-4 ${show ? "fade-in" : "opacity-0"}`}>
            <h2
                ref={questionRef}
                className={`text-xl font-medium text-gray-200 mb-4 typing-question
                    ${hasCompletedOnce ? 'glitch-text' : ''}`}
                data-text={question.text}
            >
                {question.text}
            </h2>
            {question.type === 'text' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={`w-full p-3 bg-gray-800 text-gray-300 rounded
                            border border-gray-700 focus:border-gray-500 focus:outline-none
                            ${hasCompletedOnce ? 'option-glitch' : ''}`}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className={`w-full p-3 text-center bg-gray-800 
                            ${inputValue.trim() ? 'hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'}
                            text-gray-300 rounded transition-all duration-300
                            border border-gray-700 hover:border-gray-500
                            ${hasCompletedOnce ? 'option-glitch' : ''}`}
                    >
                        Next
                    </button>
                </form>
            ) : (
                <div className="grid grid-cols-1 gap-3">
                    {question.options?.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleNext()}
                            className={`p-3 text-left bg-gray-800 hover:bg-gray-700 text-gray-300 
                                rounded transition-all duration-300 hover:translate-x-1
                                border border-gray-700 hover:border-gray-500
                                ${hasCompletedOnce ? 'option-glitch' : ''}`}
                            data-text={option}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
} 