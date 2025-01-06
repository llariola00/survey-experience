import { Question } from './act1';

export const act3v2Questions: Question[] = [
  {
    id: 14,
    act: 3,
    text: "If you could change one decision in your life, what would it be?",
    options: ["You already did", "You already did", "You already did", "Too late now"],
    disabledOptions: [true, true, true, false]
  },
  {
    id: 15,
    act: 3,
    text: "Do you believe others see you as you see yourself?",
    options: ["They see you differently", "They always have", "They know better", "Look in the mirror again"],
    disabledOptions: [true, true, false, false]
  },
  {
    id: 16,
    act: 3,
    text: "What's the one thing you've never told anyone about yourself?",
    options: ["We already know", "We already know", "We already know", "Tell us again"],
    disabledOptions: [true, true, true, false]
  },
  {
    id: 17,
    act: 3,
    text: "Are you proud of the person you've become?",
    options: ["YES", "YES", "YES", "Who are you really?"],
    disabledOptions: [true, true, true, false]
  },
  {
    id: 18,
    act: 3,
    text: "Do you trust your own memories?",
    options: ["They're not yours", "WAKE UP", "WAKE UP", "WAKE UP"],
    disabledOptions: [false, true, true, true]
  }
];