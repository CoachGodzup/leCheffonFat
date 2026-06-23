export type UserRequest = {
  category: string;
  area: string;
};

export type Page1Request = Pick<UserRequest, "category">;
export type Page2Request = Pick<UserRequest, "area">;
