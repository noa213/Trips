import {IUser} from "@/app/types/user";

export interface ICreateUserProps {
    onCreate: (newUsers: IUser[]) => void;

  }
  