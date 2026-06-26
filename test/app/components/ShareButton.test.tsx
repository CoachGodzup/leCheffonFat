import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShareButton from "@/components/atoms/ShareButton/ShareButton";

beforeAll(() => {
  Object.defineProperty(global.navigator, "clipboard", {
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
    writable: true,
    configurable: true,
  });
});

describe("ShareButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the button with 'Share' text", () => {
    render(<ShareButton />);

    expect(
      screen.getByRole("button", { name: /share link/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
  });

  it("shows 'Copied!' on click", async () => {
    const user = userEvent.setup();
    render(<ShareButton />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });
});
