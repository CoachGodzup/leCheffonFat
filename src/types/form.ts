export type UserRequest = {
  category: string;
  area: string;
  ingredients: string[];
};

export type page1Request = Pick<UserRequest, "category" | "area">;
export type page2Request = Pick<UserRequest, "ingredients">;
