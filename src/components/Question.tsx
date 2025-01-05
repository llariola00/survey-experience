import { useEffect, useRef, useState } from "react";
import { Question as QuestionType } from "../data/questions";

interface QuestionProps {
    question: QuestionType;
    onAnswer: (answer: string) => void;
    hasCompletedOnce: boolean;
}

export function Question({ question, onAnswer, hasCompletedOnce }: QuestionProps) {
    const [show, setShow] = useState(false);
    const questionRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        setShow(false);
        const timer = setTimeout(() => setShow(true), 50);

        if (questionRef.current) {
            questionRef.current.classList.remove("typing-question");
            void questionRef.current.offsetWidth; // Trigger reflow
            questionRef.current.classList.add("typing-question");
        }

        return () => clearTimeout(timer);
    }, [question.id]);

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
            <div className="grid grid-cols-1 gap-3">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(option)}
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
        </div>
    );
}
