import { useEffect, useRef, useState } from "react";
import { Question as QuestionType } from "../data/questions";
import { useClickSound } from '../hooks/useClickSound';

interface QuestionProps {
    question: QuestionType;
    onAnswer: (answer: string) => void;
    hasCompletedOnce: boolean;
}

export function Question({ question, onAnswer, hasCompletedOnce }: QuestionProps) {
    const [show, setShow] = useState(false);
    const [disabledOptions, setDisabledOptions] = useState<boolean[]>([]);
    const questionRef = useRef<HTMLHeadingElement>(null);
    const playClick = useClickSound();

    useEffect(() => {
        setShow(false);
        const timer = setTimeout(() => setShow(true), 50);

        // Generate random disabled states for options when hasCompletedOnce
        if (hasCompletedOnce) {
            const numOptions = question.options.length;
            const randomDisabled = question.options.map((_, index) => {
                // Ensure at least one option is always enabled
                if (index === Math.floor(Math.random() * numOptions)) return false;
                return Math.random() > 0.5;
            });
            setDisabledOptions(randomDisabled);
        } else {
            setDisabledOptions([]);
        }

        if (questionRef.current) {
            questionRef.current.classList.remove("typing-question");
            void questionRef.current.offsetWidth;
            questionRef.current.classList.add("typing-question");
        }

        return () => clearTimeout(timer);
    }, [question.id, hasCompletedOnce]);

    const handleOptionClick = (option: string, disabled: boolean) => {
        if (!disabled) {
            playClick();
            onAnswer(option);
        }
    };

    const getGlitchClass = (isDisabled: boolean) => {
        if (isDisabled) return '';
        if (hasCompletedOnce) return 'option-glitch';
        if (question.act === 4) return 'option-glitch-mild';
        return '';
    };

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
                        onClick={() => handleOptionClick(option, disabledOptions[index])}
                        className={`p-3 text-left bg-gray-800 text-gray-300 
                            rounded transition-all duration-300
                            border border-gray-700
                            ${!disabledOptions[index] ? 'hover:bg-gray-700 hover:translate-x-1 hover:border-gray-500' : ''}
                            ${getGlitchClass(disabledOptions[index])}
                            ${disabledOptions[index] ? 'opacity-50 cursor-not-allowed' : ''}`}
                        data-text={option}
                        disabled={disabledOptions[index]}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
