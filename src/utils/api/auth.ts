import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { useApiError } from "../../hooks/useApiError";

interface ILoginRequest {
  id: string;
  password: string;
}

interface ILogin {
  access_token: string;
}

interface ISignUpRequest {
  nickname: string;
  id: string;
  password: string;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useLogin = () => {
  const navigate = useNavigate();
  const { handleError } = useApiError();

  return useMutation(
    async (params: ILoginRequest) =>
      axios.post<ILogin>(`${BASE_URL}/users/login`, { ...params }),
    {
      onError: handleError,
      onSuccess: ({ data }) => {
        navigate("/main");
        localStorage.setItem("access_token", data.access_token);
      },
    }
  );
};

export const useSignUp = () => {
  const navigate = useNavigate();
  const { handleError } = useApiError();

  return useMutation(
    async (params: ISignUpRequest) =>
      axios.post(`${BASE_URL}/users`, { ...params }),
    { onError: handleError, onSuccess: () => navigate("/login") }
  );
};
