import axios, {AxiosError} from "axios";
import { IUser } from "../models/user";
import { authServiceUrl } from "./config/url";

interface AuthService {
  signin(userName: string, password: string): Promise<IUser | undefined>;
  signup(
    userName: string,
    password: string,
    repassword: string
  ): Promise<boolean>;
}

export const authService: AuthService = {
  async signin(userName: string, password: string): Promise<IUser> {
    try {
      const response = await axios.post(`${authServiceUrl}/signin`, {
        userName,
        password,
      });
      if (response.status === 200) {
        return response.data as IUser;
      }
      return (undefined as unknown) as IUser;
    } catch (err) {
      console.log(err);
      console.log((err as AxiosError));
      return (undefined as unknown) as IUser;
    }
  },

  async signup(
    userName: string,
    password: string,
    repassword: string
  ) {
    try {
      const response = await axios.post(`${authServiceUrl}/signup`, {
        userName,
        password,
        repassword
      });
      return response.status === 201;

    } catch (err) {
      console.log(err);
      console.log((err as AxiosError)?.response?.data);
      return false;
    }
  },
};
