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
