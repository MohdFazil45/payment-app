import { create } from "zustand";

type UserStore = {
  username: string;
  number: string;
};

export const useDetails = create<UserStore>((set) =>({
    username:"",
    number:""
}) )
