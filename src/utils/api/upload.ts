import axios from "axios";
import { useApiError } from "../../hooks/useApiError";
import { useMutation } from "react-query";

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface UploadType {
  url: string;
}
export const useUploadImg = () => {
  const { handleError } = useApiError();

  return useMutation(
    async (formData: FormData) => {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };

      return axios.post<UploadType>(`${BASE_URL}/image/`, formData, config);
    },
    { onError: handleError }
  );
};
