import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ToastContainer from "@/components/molecules/ToastContainer/ToastContainer";
import { useNotificationStore } from "@/store/notification-store";

describe("ToastContainer", () => {
  beforeEach(() => {
    useNotificationStore.setState({ toasts: [] });
  });

  it("returns null when there are no toasts", () => {
    const { container } = render(<ToastContainer />);

    expect(container.firstChild).toBeNull();
  });

  it("renders all active toasts", () => {
    useNotificationStore.getState().addToast("Error 1");
    useNotificationStore.getState().addToast("Error 2");

    render(<ToastContainer />);

    expect(screen.getByText("Error 1")).toBeInTheDocument();
    expect(screen.getByText("Error 2")).toBeInTheDocument();
  });

  it("has aria-label Notifications", () => {
    useNotificationStore.getState().addToast("Test");

    render(<ToastContainer />);

    expect(screen.getByLabelText("Notifications")).toBeInTheDocument();
  });

  it("removes toast when close button is clicked", async () => {
    const user = userEvent.setup();
    useNotificationStore.getState().addToast("To remove");
    useNotificationStore.getState().addToast("To keep");

    render(<ToastContainer />);

    const closeButtons = screen.getAllByRole("button", {
      name: "Close notification",
    });
    await user.click(closeButtons[0]);

    const remaining = useNotificationStore.getState().toasts;
    expect(remaining).toHaveLength(1);
    expect(remaining[0].message).toBe("To keep");
  });
});
