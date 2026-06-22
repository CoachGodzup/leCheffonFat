export type UserRequest = {
  category: string;
  area: string;
};

export type page1Request = Pick<UserRequest, "category">;
export type page2Request = Pick<UserRequest, "area">;
