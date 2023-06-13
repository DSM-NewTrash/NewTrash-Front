import { atom } from "recoil";

export const createQuestion = atom({
  key: "create",
  default: {
    title: "",
    introduction: "",
    category: "",
    path: "",
    problems: [
      {
        id: "",
        form: "",
        path: "",
        question: "",
        correct_answer: 0,
        answers: [
          { answer: "" },
          { answer: "" },
          { answer: "" },
          { answer: "" },
        ],
        explanation: "",
      },
    ],
  },
});

export const pointCount = atom({
  key: "point",
  default: {
    coin: 0,
  },
});

export const solveResult = atom({
  key: "result",
  default: {
    problemCount: 0,
    exp: 0,
    point: 0,
    correctAnswerCount: 0,
  },
});
