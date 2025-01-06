export interface Question {
  id: number;
  text: string;
  options: string[];
  disabledOptions: boolean[];
  act: number;
}

export const act1Questions: Question[] = [
  {
    id: 1,
    text: "Do you lock your doors every night before you sleep?",
    options: ["Yes, always", "Most of the time", "Rarely", "No, never"],
    disabledOptions: [false, false, false, false],
    act: 1
  },
  {
    id: 2,
    text: "How many friends do you have?",
    options: ["None", "1–3 friends", "4–7 friends", "More than 7 friends"],
    disabledOptions: [false, false, false, false],
    act: 1
  },
  {
    id: 3,
    text: "When was the last time you felt truly safe at home?",
    options: ["Right now", "In the past week", "A few months ago", "I don't remember"],
    disabledOptions: [false, false, false, false],
    act: 1
  },
  {
    id: 4,
    text: "Have you noticed anything unusual about your daily routine lately?",
    options: ["Yes, several unusual things", "Just one or two small changes", "No, everything seems normal", "I haven't paid attention"],
    disabledOptions: [false, false, false, false],
    act: 1
  },
  {
    id: 5,
    text: "Do you ever feel like someone is watching you, even when you're alone?",
    options: ["Yes, often", "Sometimes", "Rarely", "No, never"],
    disabledOptions: [false, false, false, false],
    act: 1
  },
  {
    id: 6,
    text: "Do you have an animal in your house?",
    options: ["Yes, a dog", "Yes, a cat", "Yes, another type of animal", "No, I don't have any pets"],
    disabledOptions: [false, false, false, false],
    act: 1
  }
];