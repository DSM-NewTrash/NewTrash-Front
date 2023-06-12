import { useMutation } from "react-query";
import { useApiError } from "../../hooks/useApiError";
import axios from "axios";

const JAVA_BASE_URL = process.env.REACT_APP_JAVA_BASE_URL;

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

export interface ProblemList {
  totalQuiz: number;
  quizResponses: [
    {
      id: number;
      image: string;
      title: string;
      introduction: string;
      category: string;
      starRating: number;
      writer: string;
      isCertificate: boolean;
      totalProblem: number;
    }
  ];
}

export interface GetProblem {
  totalProblem: 30;
  problemResponses: [
    {
      id: number;
      form: string;
      question: string;
      correctAnswer: number;
      image: string;
      answers: [{ id: number | any; answer: string | any }];
    }
  ];
}

export const useMakeProblem = () => {
  const { handleError } = useApiError();

  return useMutation(
    async (Param: CreateProblem) =>
      axios.post(
        `${JAVA_BASE_URL}/quizs`,
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

interface ProblemListRequest {
  option: string;
  category?: string;
  auth: boolean;
}

export const getProblemList = (request: ProblemListRequest) => {
  let url = `${JAVA_BASE_URL}/quizs?option=${request.option}&auth=${request.auth}`;

  if (request.category) {
    url += `&category=${request.category}`;
  } else {
    url += "&category=";
  }

  const ProblemList = axios.get<ProblemList>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  return ProblemList;
};

export const getProblemSolution = (request: string) => {
  const getSolutionProblem = axios.get<GetProblem>(
    `${JAVA_BASE_URL}/quizs/${request}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  return getSolutionProblem;
};