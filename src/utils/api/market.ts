import { useMutation } from "react-query";
import { useApiError } from "../../hooks/useApiError";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useMarketExChange = () => {
  const { handleError } = useApiError();

  return useMutation(
    async (point: number) => {
      axios.post(
        `${BASE_URL}/markets/point`,
        { point },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    },
    { onError: handleError }
  );
};
