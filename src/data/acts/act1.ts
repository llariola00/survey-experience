export interface Question {
  id: number;
  text: string;
  options: string[];
}

export const act1Questions: Question[] = [
  {
    id: 1,
    text: "Do you lock your doors every night before you sleep?",
    options: ["A. Yes, always", "B. Most of the time", "C. Rarely", "D. No, never"]
  },
  {
    id: 2,
    text: "How many friends do you have?",
    options: ["A. None", "B. 1–3 friends", "C. 4–7 friends", "D. More than 7 friends"]
  },
  {
    id: 3,
    text: "When was the last time you felt truly safe at home?",
    options: ["A. Right now", "B. In the past week", "C. A few months ago", "D. I don't remember"]
  },
  {
    id: 4,
    text: "Have you noticed anything unusual about your daily routine lately?",
    options: ["A. Yes, several unusual things", "B. Just one or two small changes", "C. No, everything seems normal", "D. I haven't paid attention"]
  },
  {
    id: 5,
    text: "Do you ever feel like someone is watching you, even when you're alone?",
    options: ["A. Yes, often", "B. Sometimes", "C. Rarely", "D. No, never"]
  },
  {
    id: 6,
    text: "Do you have an animal in your house?",
    options: ["A. Yes, a dog", "B. Yes, a cat", "C. Yes, another type of animal", "D. No, I don't have any pets"]
  }
];