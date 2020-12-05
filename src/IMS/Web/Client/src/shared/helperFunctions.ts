import {AxiosError} from "axios";
import {store} from "../store/store";
import {setError} from "../store/errorStore";

export const handleGlobalError = (err?: AxiosError) => {
  console.log(err?.response?.data);
  const res = err?.response?.data as {status: number, traceId: string};
  store.dispatch(setError({status: res.status, message: res.traceId}));
}

export const getGlobalError = (): string | null => store.getState().errorReducer.message;
export const getGlobalErrorStatus = (): number | null => store.getState().errorReducer.statusCode;