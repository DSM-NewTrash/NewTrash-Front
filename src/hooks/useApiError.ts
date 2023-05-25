import { error } from "console";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

type HandlersType = {
  [status: number | string]: any;
};

export const useApiError = (handlers?: HandlersType) => {
  const navigate = useNavigate();

  const handle400 = () => {
    swal("error", "잘못된 요청입니다.", "error");
  };
  const handle401 = () => {
    swal("error", "다시 로그인해주세요.", "error");
    navigate("/main");
  };

  const handle403 = () => {
    swal("error", "권한이 없습니다.", "error");
  };

  const handle404 = () => {
    swal("error", "정보가 없습니다.", "error");
  };

  const handle500 = () => {
    swal("error", "서버 관리자 및 동아리에 문의해주세요.", "error");
  };

  const handleDefault = () => {
    swal("error", "네트워크를 상태를 확인해주세요.", "error");
  };

  // 기본적으로 처리될 수 있는 에러 핸들러
  const defaultHandlers: HandlersType = {
    400: {
      default: handle400,
    },
    401: {
      default: handle401,
    },
    403: {
      default: handle403,
    },
    404: {
      default: handle404,
    },
    500: {
      default: handle500,
    },
    default: handleDefault,
  };

  const handleError = useCallback(
    (error: any) => {
      const httpStatus = error.response.status;
      const errorMessage = error.data?.errorMessage;
      switch (true) {
        case handlers && !!handlers[httpStatus]?.[errorMessage]:
          handlers![httpStatus][errorMessage]();
          break;

        case handlers && !!handlers[httpStatus]:
          handlers![httpStatus](error);
          break;

        case handlers && !!handlers[httpStatus]:
          handlers![httpStatus].default(error);
          break;

        case !!defaultHandlers[httpStatus]:
          defaultHandlers[httpStatus].default();
          break;

        case !!defaultHandlers[httpStatus]:
          defaultHandlers[httpStatus].default();
          break;

        default:
          defaultHandlers.default();
      }
    },
    [handlers]
  );

  return { handleError };
};
