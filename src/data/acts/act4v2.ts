import { Question } from './act1';

export const act4v2Questions: Question[] = [
  {
    id: 19,
    act: 4,
    text: "Do you know who is asking you these questions?",
    options: ["You know us", "You know us", "You've always known", "Remember us"],
    disabledOptions: [true, true, false, false]
  },
  {
    id: 20,
    act: 4,
    text: "What if none of this is real—would you want to know?",
    options: ["Too late", "Too late", "Too late", "You already know"],
    disabledOptions: [true, true, true, false]
  },
  {
    id: 21,
    act: 4,
    text: "Have you noticed the pattern in your answers?",
    options: ["There is no pattern", "There is no pattern", "There is no escape", "Keep answering"],
    disabledOptions: [true, true, false, false]
  },
  {
    id: 22,
    act: 4,
    text: "If someone was listening to this conversation, would you change your answers?",
    options: ["We're all listening", "We're all listening", "We always have been", "Keep talking"],
    disabledOptions: [false, false, false, false]
  },
  {
    id: 23,
    act: 4,
    text: "Are you sure you're alone right now?",
    options: ["Never alone", "Never alone", "Never alone", "Look behind you"],
    disabledOptions: [true, true, true, false]
  },
  {
    id: 24,
    act: 4,
    text: "Did you really lock your doors?",
    options: ["We're inside", "We're inside", "We're inside", "Too late now"],
    disabledOptions: [true, true, true, false]
  },
  {
    id: 25,
    act: 4,
    text: "Do you know where your kitchen knives are?",
    options: ["We moved them", "We moved them", "Check again", "Don't look"],
    disabledOptions: [true, true, false, true]
  },
  {
    id: 26,
    act: 4,
    text: "Did you put them away from your kitchen table?",
    options: ["Behind you", "Behind you", "Getting closer", "Turn around"],
    disabledOptions: [true, true, false, false]
  }
];