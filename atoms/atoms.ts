import { atom } from "recoil";

export const user = atom({
  key: "user", 
  default: '',
});

export const page = atom({
  key: "page",
  default: '',
})