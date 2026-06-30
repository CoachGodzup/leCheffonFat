import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "@/components/atoms/Button/Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button text="Click me" click={jest.fn()} active={false} />);

    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("renders with aria-pressed false when active is false", () => {
    render(<Button text="Filter" click={jest.fn()} active={false} />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("renders with aria-pressed true when active is true", () => {
    render(<Button text="Filter" click={jest.fn()} active={true} />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("applies active CSS class when active is true", () => {
    render(<Button text="Filter" click={jest.fn()} active={true} />);

    expect(screen.getByRole("button")).toHaveClass("buttonActive");
  });

  it("does not apply active CSS class when active is false", () => {
    render(<Button text="Filter" click={jest.fn()} active={false} />);

    expect(screen.getByRole("button")).not.toHaveClass("buttonActive");
  });

  it("calls click handler on click", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button text="Click me" click={handleClick} active={false} />);

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
