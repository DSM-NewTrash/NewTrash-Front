import { useMutation } from "react-query";
import { useApiError } from "../../hooks/useApiError";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_JAVA_BASE_URL;

export interface CreateProblem {
  title: string;
  introduction: string;
  path: string;
  category: string;
  problems: {
    form: string;
    question: string;
    correct_answer: number | null;
    explanation: string;
    path: string;
    answers: {
      answer: string | null;
    }[];
  }[];
}

export const useMakeProblem = () => {
  const { handleError } = useApiError();

  return useMutation(
    async (Param: CreateProblem) =>
      axios.post(
        `${BASE_URL}/quizs`,
        { ...Param },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      ),
    { onError: handleError }
  );
};
