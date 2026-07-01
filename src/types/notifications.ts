export type ToastType = "error" | "warning";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};
