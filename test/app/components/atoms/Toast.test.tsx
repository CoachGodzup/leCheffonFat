import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ToastAtom from "@/components/atoms/Toast/Toast";
import type { Toast } from "@/types/notifications";

const createToast = (overrides: Partial<Toast> = {}): Toast => ({
  id: "toast-1",
  message: "Test notification",
  type: "error",
  ...overrides,
});

describe("ToastAtom", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    onClose.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the message", () => {
    render(<ToastAtom toast={createToast()} onClose={onClose} />);

    expect(screen.getByText("Test notification")).toBeInTheDocument();
  });

  it("renders with role alert", () => {
    render(<ToastAtom toast={createToast()} onClose={onClose} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("has aria-live assertive", () => {
    render(<ToastAtom toast={createToast()} onClose={onClose} />);

    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
  });

  it("sets data-type attribute to error", () => {
    render(
      <ToastAtom toast={createToast({ type: "error" })} onClose={onClose} />,
    );

    expect(screen.getByRole("alert")).toHaveAttribute("data-type", "error");
  });

  it("sets data-type attribute to warning", () => {
    render(
      <ToastAtom toast={createToast({ type: "warning" })} onClose={onClose} />,
    );

    expect(screen.getByRole("alert")).toHaveAttribute("data-type", "warning");
  });

  it("has a close button with aria-label", () => {
    render(<ToastAtom toast={createToast()} onClose={onClose} />);

    expect(
      screen.getByRole("button", { name: "Close notification" }),
    ).toBeInTheDocument();
  });

  it("calls onClose with toast id when close button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <ToastAtom toast={createToast({ id: "toast-42" })} onClose={onClose} />,
    );

    await user.click(
      screen.getByRole("button", { name: "Close notification" }),
    );

    expect(onClose).toHaveBeenCalledWith("toast-42");
  });

  it("auto-dismisses error toast after 5 seconds", () => {
    render(
      <ToastAtom toast={createToast({ type: "error" })} onClose={onClose} />,
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onClose).toHaveBeenCalledWith("toast-1");
  });

  it("auto-dismisses warning toast after 4 seconds", () => {
    render(
      <ToastAtom toast={createToast({ type: "warning" })} onClose={onClose} />,
    );

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(onClose).toHaveBeenCalledWith("toast-1");
  });

  it("does not auto-dismiss before the dismiss timeout", () => {
    render(
      <ToastAtom toast={createToast({ type: "error" })} onClose={onClose} />,
    );

    act(() => {
      jest.advanceTimersByTime(4999);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("clears the timer on unmount", () => {
    const { unmount } = render(
      <ToastAtom toast={createToast()} onClose={onClose} />,
    );

    unmount();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onClose).not.toHaveBeenCalled();
  });
});
