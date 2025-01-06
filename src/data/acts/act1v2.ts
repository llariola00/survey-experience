export interface Question {
  id: number;
  text: string;
  options: string[];
  act: number;
}

export const act1v2Questions: Question[] = [
  {
    id: 1,
    text: "Do you lock your doors every night before you sleep?",
    options: ["Most of the time", "Most of the time", "No, never", "No, never"],
    act: 1
  },
  {
    id: 2,
    text: "How many friends do you have?",
    options: ["None", "None", "None", "None"],
    act: 1
  },
  {
    id: 3,
    text: "When was the last time you felt truly safe at home?",
    options: ["Right now", "Right now", "Right now", "Never"],
    act: 1
  },
  {
    id: 4,
    text: "Have you noticed anything unusual about your daily routine lately?",
    options: ["I haven't paid attention", "I haven't paid attention", "I haven't paid attention", "Have I?"],
    act: 1
  },
  {
    id: 5,
    text: "Do you ever feel like someone is watching you, even when you're alone?",
    options: ["Yes, often", "Sometimes", "Sometimes", "Sometimes"],
    act: 1
  },
  {
    id: 6,
    text: "Do you have an animal in your house?",
    options: ["Yes. . .", "Yes. . .", "Yes. . .", "Yes. . ."],
    act: 1
  }
];