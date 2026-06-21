import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page1 from "@/app/page1/page";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    register: (name: string) => ({ name }),
    handleSubmit:
      (fn: (data: unknown) => void) => (e: { preventDefault: () => void }) => {
        e.preventDefault();
        fn({ category: "Italian", area: "Italian" });
      },
  }),
}));

describe("Page1", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders without crashing", () => {
    render(<Page1 />);
  });

  it("renders the heading", () => {
    render(<Page1 />);
    expect(
      screen.getByRole("heading", { name: /what's on your mind's menu/i }),
    ).toBeInTheDocument();
  });

  it("renders form inputs", () => {
    render(<Page1 />);
    expect(screen.getByPlaceholderText("category")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("area")).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    render(<Page1 />);
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("navigates to page2 on submit", async () => {
    const user = userEvent.setup();
    render(<Page1 />);

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(mockPush).toHaveBeenCalledWith("/page2");
  });
});
