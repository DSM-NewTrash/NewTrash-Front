import axios from "axios";
import { useMutation } from "react-query";
import { useApiError } from "../../hooks/useApiError";

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface ProblemUserCount {
  count: number;
}

interface CertificateUser {
  certificate: string;
}

interface MyPageInfo {
  id: string;
  nickname: string;
  profile: string;
  introduce: string;
  level: number;
  badge: string;
  exp: number;
  point: number;
  badge_image: string;
  certificate: string;
  is_certificate: boolean;
}

interface MyExpLevelInfo {
  nickname: string;
  level: number;
  badge_image: string;
  exp: number;
  max_exp: number;
  point: number;
}

interface MyPagePatch {
  profile: string;
  nickname: string;
  introduce: string;
}

export const getMyExpLevel = () => {
  const MyExpLevel = axios.get<MyExpLevelInfo>(`${BASE_URL}/users/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  return MyExpLevel;
};

export const getMyProblemCount = () => {
  const MyProblemCount = axios.get<ProblemUserCount>(
    `${BASE_URL}/users/quizs`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  return MyProblemCount;
};

export const getMyPageInfo = () => {
  const MyPageInfo = axios.get<MyPageInfo>(`${BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  return MyPageInfo;
};

export const useMyPagePatch = () => {
  const { handleError } = useApiError();

  return useMutation(
    async (params: MyPagePatch) =>
      axios.patch(
        `${BASE_URL}/users/profile`,
        { ...params },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      ),
    { onError: handleError }
  );
};

export const useCertificateUserApi = () => {
  const { handleError } = useApiError();

  return useMutation(
    async (params: CertificateUser) =>
      axios.post(
        `${BASE_URL}/users/profile`,
        {
          ...params,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      ),
    { onError: handleError }
  );
};
