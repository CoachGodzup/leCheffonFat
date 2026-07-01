import { useNotificationStore } from "@/store/notification-store";

describe("notification-store", () => {
  beforeEach(() => {
    useNotificationStore.setState({ toasts: [] });
  });

  it("starts with empty toasts", () => {
    expect(useNotificationStore.getState().toasts).toEqual([]);
  });

  it("addToast creates a toast with error type by default", () => {
    useNotificationStore.getState().addToast("Something went wrong");

    const toasts = useNotificationStore.getState().toasts;
    expect(toasts).toHaveLength(1);
    expect(toasts[0].message).toBe("Something went wrong");
    expect(toasts[0].type).toBe("error");
    expect(toasts[0].id).toBeDefined();
  });

  it("addToast accepts a custom type", () => {
    useNotificationStore.getState().addToast("Only one result", "warning");

    const toasts = useNotificationStore.getState().toasts;
    expect(toasts).toHaveLength(1);
    expect(toasts[0].type).toBe("warning");
  });

  it("addToast appends multiple toasts", () => {
    useNotificationStore.getState().addToast("Error 1");
    useNotificationStore.getState().addToast("Error 2");

    expect(useNotificationStore.getState().toasts).toHaveLength(2);
  });

  it("removeToast removes a toast by id", () => {
    useNotificationStore.getState().addToast("To remove");
    const id = useNotificationStore.getState().toasts[0].id;

    useNotificationStore.getState().removeToast(id);

    expect(useNotificationStore.getState().toasts).toHaveLength(0);
  });

  it("removeToast only removes the matching toast", () => {
    useNotificationStore.getState().addToast("First");
    const id1 = useNotificationStore.getState().toasts[0].id;
    useNotificationStore.getState().addToast("Second");

    useNotificationStore.getState().removeToast(id1);

    const remaining = useNotificationStore.getState().toasts;
    expect(remaining).toHaveLength(1);
    expect(remaining[0].message).toBe("Second");
  });
});
