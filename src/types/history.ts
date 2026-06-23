import { UserRequest } from "@/types/form";

export type Call = {
  recipeId: string;
  title: string;
  imageUrl: string /* todo btop? */;
  timestamp: number;
  like: boolean | null;
  inputs: UserRequest;
};

export type History = {
  calls: Call[];
};
