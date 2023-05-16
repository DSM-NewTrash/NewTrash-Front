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
        form: "",
        path: "",
        question: "",
        correct_answer: 0,
        answers: [],
        explanation: "",
      },
    ],
  },
});
